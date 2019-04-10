import React, { Component } from 'react'
import Productos from './Productos';
import Filtros from './Filtros';

class Busqueda extends Component {
  state = {  
    linea: [],
    estado: "",
    filtros: true
  }
  filtrosLinea = (nuevalinea) => {
    var lineas;
    if (this.state.linea.length === 0) {
      lineas = [...this.state.linea, nuevalinea]
      this.setState({
        linea: lineas
      })
    } else {
      if (this.state.linea.indexOf(nuevalinea) === -1) {
        lineas = [...this.state.linea, nuevalinea]
        this.setState({
          linea: lineas
        })
      }
    }
  }
  filtrosEstado = (idEstado) => {
    // var estado = this.props.resultados.estados[idEstado - 1].nombre
    this.setState({
      estado: idEstado
    })
  }
  borrarFiltro = (nuevosFiltros) => {
    var contador = 0;
    console.log(nuevosFiltros)
    if (nuevosFiltros.length === 1) {
      contador++;
    }
    if (nuevosFiltros.length === 0) {
      this.setState({
        linea: nuevosFiltros,
        filtros: false
      })
    } else {
      this.setState({
        linea: nuevosFiltros,
        filtros: true
      })
    }
  }
  render() { 
    const { productos, lineas, estados, busqueda } = this.props.resultados
    let filtradoLinea = [];
    let filtradoEstado = [];
    let resultado = [];
    console.log(this.state.linea.length)
    if (this.state.estado && this.state.linea.length === 0) {
      console.log(1)
      filtradoEstado.push(productos.filter(producto => (
        producto.estado.indexOf(this.state.estado) !== -1
      )))
      filtradoEstado.map(filtro => (
        resultado = resultado.concat(filtro)
      ))
    } else if (this.state.estado && this.state.linea.length > 0) {
      console.log(2)
      resultado = resultado.filter(filtro => (
        filtro.estado.indexOf(this.state.estado) !== -1
      ))
    } else if (!(this.state.estado) && this.state.linea.length > 0) {
      console.log(3)
      this.state.linea.map(linea => (
        filtradoLinea.push(productos.filter(producto => (
          producto.linea.indexOf(linea) !== -1
        )))
      ))
      filtradoLinea.map(filtro => (
        resultado = resultado.concat(filtro)
      ))
    } else if (!(this.state.estado && this.state.linea.length === 0)) {
      console.log(4)
      resultado = productos
    }

    if(!this.state.filtros) {
      resultado = productos;
    }

    console.log(resultado)
    const resultados =  <div className="App slide">
                          <div className="main">
                              <Productos 
                                productos={resultado}
                                busqueda={busqueda}
                                linea={this.state.linea}
                                estado={this.state.estado}
                              />
                          </div>
                          <div className="filtros">
                              <Filtros 
                                lineas={lineas}
                                estados={estados}
                                filtrosLinea={this.filtrosLinea}
                                filtrosEstado={this.filtrosEstado}
                                borrarFiltro={this.borrarFiltro}
                              />
                          </div>
                        </div>

    const noResultados =  <h1 className="slide">No se encontraron resultados</h1>
    return (  
      <React.Fragment>
        {(this.props.respuesta) ? resultados : noResultados}
      </React.Fragment>
    );
  }
}
 
export default Busqueda;