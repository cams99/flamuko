import React, { Component } from 'react'
import CheckLogin from './CheckLogin';

class Login extends Component {
    state = {
        registrado: false
    }
    constructor(props) {
        super(props);
        this.nombreRef = React.createRef();
        this.emailRef = React.createRef();
        this.telefonoRef = React.createRef();
    }
    registrarUsuario = (e) => {
        e.preventDefault();
        const usuario = {
            nombre: this.nombreRef.current.value,
            email: this.emailRef.current.value,
            telefono: this.telefonoRef.current.value, 
            busqueda: this.props.producto
        }
        this.enviarRegistro(usuario)
        var duracionCookie = 48 * 3600
        document.cookie = `sesion=activa; max-age=${duracionCookie};`;
        document.cookie = `email=${this.emailRef.current.value}; max-age=${duracionCookie};`;
        document.cookie = `estado=login; max-age=10;`;
        var login = false
        this.props.login(login)
    }
    enviarRegistro = (usuario) => {
        console.log(usuario)
    }
    login = (estado) => {
        this.props.login(estado)
    }
    toogleSesion = () => {
        if (this.state.registrado === false) {
            this.setState({
                registrado: true
            })
        } else {
            this.setState({
                registrado: false
            })
        }
    }
    iniciarSesion = (e) => {
        e.preventDefault();
        const usuario = {
            email: this.emailRef.current.value,
            busqueda: this.props.producto
        }
        console.log(usuario)
        var duracionCookie = 48 * 3600
        document.cookie = `sesion=activa; max-age=${duracionCookie};`;
        document.cookie = `email=${this.emailRef.current.value}; max-age=${duracionCookie};`;
        document.cookie = `estado=login; max-age=10;`;
        var login = false
        this.props.login(login)
    }
    render() { 
        var sesion = document.cookie.substr(7,7).replace("activa;", "activa");
        var indexEstado = document.cookie.indexOf("estado")
        var indexLogin = indexEstado + 7
        var estado = document.cookie.substr(indexLogin, indexLogin)
        return (  
            <React.Fragment>
                {
                    (sesion === "activa" && estado !== "login") 
                        ?   <CheckLogin 
                                login={this.login}
                            />   
                        :   (this.state.registrado)
                                ?   <div className="check-login">
                                        <form onSubmit={this.iniciarSesion}>
                                            <h2>Iniciar Sesión</h2>
                                            <input required className="input-form" type="email" placeholder="Email" ref={this.emailRef} />                
                                            <button type="submit" className="boton-acceder">Ingresar</button>   
                                        </form>
                                        <p>o <button onClick={this.toogleSesion} className="toogle-sesion">Registrarse</button></p>
                                    </div>
                                :   <div className="check-login">
                                        <form onSubmit={this.registrarUsuario}>
                                            <h2>Regístrate</h2>
                                            <input required className="input-form" type="text" placeholder="Nombre" ref={this.nombreRef} />                
                                            <input required className="input-form" type="email" placeholder="Email" ref={this.emailRef} />                
                                            <input required className="input-form" type="number" placeholder="Telefono" ref={this.telefonoRef} />   
                                            <button type="submit" className="boton-acceder">Ingresar</button>   
                                            <div className="form-check">
                                                <input type="checkbox" className="form-check-input" id="Check" defaultChecked />
                                                <label className="form-check-label" htmlFor="Check">He leído y acepto los términos y condiciones de uso</label>
                                            </div>
                                        </form>
                                        <p>o <button onClick={this.toogleSesion} className="toogle-sesion">Iniciar Sesión</button></p>
                                    </div>
                }
            </React.Fragment>
        );
    }
}
 
export default Login;