import React, { Component } from 'react'
import Buscador from './Buscador';


class Principal extends Component {
    obtenerBusqueda = busqueda => {
        this.props.obtenerBusqueda(busqueda)
    }
    render() { 
        return (  
            <div className="col-12 principal slide">
                <h2>Busca tu producto o color</h2>
                <Buscador 
                    busqueda={this.obtenerBusqueda}
                />
            </div>
        );
    }
}
 
export default Principal;