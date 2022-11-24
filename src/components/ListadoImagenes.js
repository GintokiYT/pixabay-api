import Estilos from './ListadoImagenes.module.css';
import like from '../assets/like.svg';
import view from '../assets/view.svg';

const ListadoImagenes = ({resultados, paginaActual, guardarPaginaActual, totalPaginas}) => {

  const handleAnterior = () => {
    const paginaactual = paginaActual - 1;
    if(paginaactual > 0){
      guardarPaginaActual(paginaactual);
    }
  }

  const handleSiguiente = () => {
    const paginaactual = paginaActual + 1;
    if(paginaactual <= totalPaginas){
      guardarPaginaActual(paginaactual);
    }
  }

  return (  
    <div className='container'>
      <div className={Estilos.contenedorImagenes}>
        { resultados.map( (resultado, indice) => {
          const { largeImageURL, likes, previewURL, views } = resultado
          return (
            <div key={indice}>
              <img src={previewURL} alt="Imagen" />
              <div className={Estilos.descripcion}>
                <p>
                  <img src={like} alt="like" /> 
                  <span>Le gusta a {likes} personas</span>
                </p>
                <p>
                  <img src={view} alt="view" />
                  <span>Visto por {views} personas</span>
                </p>
                <a 
                  href={largeImageURL}
                  target="_blank"
                  rel='noopener noreferrer'
                >Ver imagen completa</a>
              </div>
            </div>
          );
        })}
      </div>  
      <div className={Estilos.paginador}>
        <button onClick={handleAnterior}>&#171; Anterior</button>
        <button onClick={handleSiguiente}>Siguiente &#187;</button>
      </div>
    </div>
  );
}
 
export default ListadoImagenes;