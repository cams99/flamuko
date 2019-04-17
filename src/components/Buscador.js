import React, { Component } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

class Buscador extends Component {
    productoRef = React.createRef();

    handleSubmit = (e) => {
        e.preventDefault()
        let producto = this.productoRef.current.value;
        if(producto.length >= 3){
            this.props.busqueda(producto);
            window.history.replaceState(null, "", "/")
        } else {
            Swal.fire(
                'La busqueda debe contener al menos 3 caracteres',
                '',
                'warning'
            )        
        }
        e.currentTarget.reset();
    }

    render() { 
        return (  
            <React.Fragment>
                <form id="form-search" className="form-inline" onSubmit={this.handleSubmit}>
                    <input type='text' ref={this.productoRef} className="form-control valid" placeholder="Buscar por producto o color" />
                    {                    
                        (document.location.pathname === "/")
                            ?   <button type="submit" className="btn btn-primary"><i className="fa fa-search"> BUSCAR</i></button>
                            :   <button type="submit" className="btn btn-primary"><i className="fa fa-search"> BUSCAR</i></button>
                    }
                </form>
            </React.Fragment>
        );
    }
}
 
export default Buscador;