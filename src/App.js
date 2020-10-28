import React, { useEffect, useState } from 'react'
import Formulario from './components/Formulario'
import {API_KEY} from './API_KEY'
import Listadoimagenes from './components/ListadoImagenes'

function App() {
  const [busqueda, guardarBusqueda] = useState('')
  const [imagenes, guardarImagenes] = useState([])
  const [paginaActual, guardarPaginaActual] = useState(1)
  const [totalPaginas, guardarTotalPaginas] = useState(1)

  useEffect(() => {
    const consultarApi = async () => {
      if (!busqueda) return
      
      const imagenesPorPagina = 30;
      const url = `https://pixabay.com/api/?key=${API_KEY}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`
  
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      guardarImagenes(resultado.hits)
      guardarTotalPaginas(Math.ceil(resultado.totalHits / imagenesPorPagina))

      //Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({behavior: 'smooth'})
    }
    consultarApi();
  }, [busqueda, paginaActual])

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1
    if(nuevaPaginaActual === 0) return
    guardarPaginaActual(nuevaPaginaActual)
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1
    if (nuevaPaginaActual > totalPaginas) return
    guardarPaginaActual(nuevaPaginaActual)
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <Listadoimagenes
          imagenes={imagenes}
        />
        {paginaActual !== 1 &&
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaAnterior}
          >
            Anterior
          </button>
        }
        {paginaActual !== totalPaginas &&
          <button
            type="button"
            className="btn btn-info"
            onClick={paginaSiguiente}
          >
            Siguiente
          </button>
        }
      </div>
    </div>
  );
}

export default App;
