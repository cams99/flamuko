import React, { Component } from 'react';
import Buscador from './Buscador';
import flamuko from '../img/flamuko-logo.png';

class Header extends Component {
    obtenerBusqueda = busqueda => {
        this.props.obtenerBusqueda(busqueda)
    }
    render() { 
        return (  
            <div className='row'>   
                <div className="col-12 col-sm-12 col-md-3">
                    <img className='logo' src={flamuko} alt="La Tienda del Pintor" title="La Tienda del Pintor" />
                </div>
                <div className="col-12 col-sm-12 col-md-9 form1 d-flex align-items-center">
                    {
                        (this.props.busqueda) 
                        ?   <Buscador 
                                busqueda={this.obtenerBusqueda}
                            />
                        :   ""
                    }
                </div>
            </div>
        );
    }
}
 
export default Header;