import React, { Component } from 'react'

class Login extends Component {
    state = {  }
    constructor(props) {
        super(props);
        this.nombreRef = React.createRef();
        this.emailRef = React.createRef();
        this.telefonoRef = React.createRef();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const usuario = {
            nombre: this.nombreRef.current.value,
            email: this.emailRef.current.value,
            telefono: this.telefonoRef.current.value, 
            busqueda: this.props.producto
        }
        console.log(usuario)
        var login = false;
        this.props.login(login)
    }
    render() { 
        return (  
            <form onSubmit={this.handleSubmit}>
                <h2>Regístrate</h2>
                <input required className="input-form" type="text" placeholder="Nombre" ref={this.nombreRef} />                
                <input required className="input-form" type="email" placeholder="Email" ref={this.emailRef} />                
                <input required className="input-form" type="text" placeholder="Telefono" ref={this.telefonoRef} />   
                <button type="submit" className="boton-acceder">Acceder</button>   
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="Check" defaultChecked />
                    <label className="form-check-label" htmlFor="Check">He leído y acepto los términos y condiciones de uso</label>
                </div>
            </form>
        );
    }
}
 
export default Login;