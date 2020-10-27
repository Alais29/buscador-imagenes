import React, { useEffect, useState } from 'react'
import Formulario from './components/Formulario'
import {API_KEY} from './API_KEY'

function App() {
  const [busqueda, guardarBusqueda] = useState('')

  useEffect(() => {
    const consultarApi = async () => {
      if (!busqueda) return
      
      const imagenesPorPagina = 30;
      const url = `https://pixabay.com/api/?key=${API_KEY}&q=${busqueda}&per_page=${imagenesPorPagina}`
  
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      guardarBusqueda(resultado.hits)
    }
    consultarApi();
  }, [busqueda])

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>
    </div>
  );
}

export default App;
