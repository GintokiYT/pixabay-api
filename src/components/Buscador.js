import { useState } from 'react';
import Estilos from './Buscador.module.css';
import Error from './Error';

const Buscador = ({guardarBusqueda}) => {

  const [ termino, guardarTermino ] = useState('');
  const [ error, guardarError ] = useState(false);

  const handleChange = e => {
    guardarTermino(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();

    if(termino === '') {
      guardarError(true);
      return;
    }
    
    guardarError(false);
    guardarBusqueda(termino);

  }

  return (  
    <div className='container'>
      <div className={`${Estilos.buscadorContainer}`}>
        <h1>Buscador de imagenes</h1>
        <form 
          className={`${Estilos.form}`}
          onSubmit={handleSubmit}
        >
          <input 
            type='text' 
            placeholder='Busca una imagen, ejemplo: futbol o café'
            onChange={handleChange}
          />
          <input type='submit' />
        </form>

        { error 
          ? <Error error='No hay ingresado un termino de busqueda'/>
          : null
        }

      </div>
    </div>
  );
}
 
export default Buscador;