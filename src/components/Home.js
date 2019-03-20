import React, { Component } from 'react';
import Busqueda from './Busqueda';
import Principal from './Principal';

class Home extends Component {
    state = {
        busqueda: ''
    }
    obtenerBusqueda = (busqueda) => {
        this.props.obtenerBusqueda(busqueda)
    }
    obtenerEstados = (estados) => {
        console.log(estados)
    }
    obtenerLineas = (lineas) => {
        console.log(lineas)
    }
    render() {
        const { respuesta } = this.props.resultados
        return (
            <React.Fragment>
                {
                    (respuesta === true | this.props.respuesta === false) 
                        ?   <Busqueda 
                                resultados={this.props.resultados}  
                                respuesta={this.props.respuesta}  
                            />
                        :   <Principal 
                                obtenerBusqueda={this.obtenerBusqueda}
                            />
                }
            </React.Fragment>
        );
    }
}

export default Home;
