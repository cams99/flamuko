import React from 'react';

const SingleTienda = (props) => {
    const {valor} = props.tienda
    const {nombre, direccion, telefono, telefono1} = props.tienda.tienda[0]
    // switch (true) {
    //     case valor > EXISTENCIA_NIVEL_MEDIO:
    //         valor = 'high';
    //         break;
    //     case valor < EXISTENCIA_NIVEL_BAJO:
    //         valor = 'low';
    //         break;
        
    //     default:
    //         valor = 'medium';
    //         break;
    // }
    
    if (telefono) {
        var codigo = telefono.substr(0, 4)
        var is_cellphone = false

        switch (codigo) {
            case '0412': 
                is_cellphone = true; 
                break;
            case '0414': 
                is_cellphone = true; 
                break;
            case '0424': 
                is_cellphone = true; 
                break;
            case '0416': 
                is_cellphone = true; 
                break;
            case '0426': 
                is_cellphone = true; 
                break;
        }

    }
    const mensaje = `https://api.whatsapp.com/send?phone=${telefono}&text=Hola,%20quisiera%20saber%20disponibilidad%20de%20este%20producto:%20${props.producto.nombre}`
    const llamar = `tel:${telefono}`
    return (  
        <div className="col-lg-12 ">
            <h6><div className={`availability ${valor}`}></div> {nombre} {valor}</h6>
            <small>
                <i className="fa fa-map-marker-alt"></i> {direccion}
                <br/><br/>
            </small>
            <div className="text-right">
            {
                (is_cellphone)
                    ?   <a href={mensaje} target="_blank" rel="noopener noreferrer" className="call-button"><i className="fa fa-whatsapp"></i> Enviar Mensaje</a>
                    :   <a href={llamar} className="call-button"><i className="fa fa-phone-volume"></i> <span> Llamar </span> </a> 
            }
            <br/>
            </div>
            <hr/>
       </div>
    );
}
 
export default SingleTienda;