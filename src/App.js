import { Fragment, useState, useEffect } from 'react';
import Buscador from './components/Buscador';
import ListadoImagenes from './components/ListadoImagenes';
import Footer from './components/Footer';

let terminoBusqueda = null;

function App() {

  const NoFund = () => {
    return (
        <div className='container'>
          <h1 className='noEncontrado'>No se encontro resultado!</h1>
        </div>
    )
  }

  const [ busqueda, guardarBusqueda ] = useState('');
  const [ resultados, guardarResultados ] = useState([]);
  const [ paginaActual, guardarPaginaActual ] = useState(1);
  const [ totalPaginas, guardarTotalPaginas ] = useState(1);

  useEffect(() => {
    const consultarAPI =  async () => {
      if(terminoBusqueda === busqueda) {
        guardarPaginaActual(paginaActual);
        terminoBusqueda = busqueda;
      }
      else {
        guardarPaginaActual(1);
        terminoBusqueda = busqueda;
      }

      const imagenesPorPagina = 30;
      const key = '29204254-2026f3e239c6ca89f079598f6';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const response = await fetch(url);
      const data = await response.json();

      guardarResultados(data.hits);

      // Calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(data.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      window.scroll({top: 0, left: 0, behavior: 'smooth' });
    }

    if(busqueda !== '') consultarAPI();


  }, [busqueda, paginaActual])

  return (
    <Fragment>
      <Buscador guardarBusqueda={guardarBusqueda}/>
      { resultados.length > 0 
        ? <ListadoImagenes 
          resultados={resultados} 
          paginaActual={paginaActual}
          guardarPaginaActual={guardarPaginaActual}
          totalPaginas={totalPaginas}
          />
        : busqueda !== '' 
        ? <NoFund />
        : null
      }
      <Footer />
    </Fragment>
  );
}

export default App;
