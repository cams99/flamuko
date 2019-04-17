import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { isObject, isNull } from 'util';
import axios from 'axios';

import Home from './Home';
import SingleProducto from './SingleProducto';
import Header from './Header';
import Footer from './Footer';
import Cargando from './Cargando';

class Router extends Component {
    state = {
        busqueda: "",
        productos: [],
        lineas: [],
        estados: [],
        respuesta: Boolean,
        resultados: {
            productos: [],
            lineas: [],
            estados: [],
            busqueda: "",
            respuesta: Boolean
        },
        cargando: false
    }

    obtenerBusqueda = (busqueda) => {
        this.setState({
            busqueda: busqueda.toLowerCase()
        }, () => {
            this.obtenerResultados()
        })
    }

    obtenerResultados = () => {
        if (this.state.resultados.busqueda === this.state.busqueda) return null
        this.setState({
            cargando: true
          })
        let producto = this.state.busqueda
        let url = `http://lab.besign.com.ve/flamuko/html/api/search/all/${producto}`
        axios.get(url)
            .then(res => {
                if(isObject(res.data)){
                    this.setState({
                        productos: res.data.productos,
                        respuesta: true
                    }, () => {
                        this.obtenerLineas()
                    })
                } else if (isNull(res.data)) {
                    this.setState({
                        resultados: {
                            busqueda: this.state.busqueda
                        },
                        respuesta: false,
                        cargando: false
                    })
                }
            })
    }
  
    obtenerLineas = () => {
        let url = `http://lab.besign.com.ve/flamuko/html/api/show/lineas`
        axios.get(url)
            .then(res => {
                this.setState({
                    lineas: res.data
                }, () => {
                    this.obtenerEstados()
                })
            })
    }

    obtenerEstados = () => {
        let url = `http://lab.besign.com.ve/flamuko/html/api/show/estados`
        axios.get(url)
            .then(res => {
                this.setState({
                    estados: res.data
                })
            })
            .then(() => {
                this.setState({
                    resultados: {
                        productos: this.state.productos,
                        lineas: this.state.lineas,
                        estados: this.state.estados,
                        busqueda: this.state.busqueda,
                        respuesta: this.state.respuesta
                    },
                    cargando: false
                })
            })
    }
    render() { 
        return (  
            <BrowserRouter>
                <React.Fragment>
                    <div id="header">
                        <Header 
                            obtenerBusqueda={this.obtenerBusqueda}
                            busqueda={this.state.busqueda}
                        />
                    </div>
                    <Switch>
                        <Route exact path="/reacttest/build/" render={() => {
                            return (
                                <React.Fragment>
                                    {
                                        (this.state.cargando)
                                            ?   <Cargando />
                                            :   <Home 
                                                    resultados={this.state.resultados}   
                                                    respuesta={this.state.respuesta}
                                                    obtenerBusqueda={this.obtenerBusqueda}                           
                                                />
                                    }
                                </React.Fragment>
                            )
                        }} />
                        <Route exact path="/reacttest/build/detail/:idProducto" render={(props) => {
                            const idProducto = props.location.pathname.replace('/reacttest/build/detail/', '')
                            return (
                                <SingleProducto 
                                    idProducto={idProducto}
                                    lineas={this.state.lineas}
                                    estados={this.state.estados}
                                />
                            )
                        }} />
                    </Switch>
                    <Footer />
                </React.Fragment>
            </BrowserRouter>
        );
    }
}
 
export default Router;