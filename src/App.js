import './App.css';
import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';
import Frase from './components/Frase';
import { useState, useEffect} from 'react';
import Spinner from './components/Spinner';

function App() {
  const [personaje, setPersonaje] = useState({});
  const [carga, setCarga] = useState(true);

  useEffect(()=>{
    consultaAPI();
  },[]);

  const consultaAPI = async()=>{
    setCarga(true)
    const respuesta = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
    const dato = await respuesta.json();
    console.log(respuesta);
    console.log(dato[0]);
    setTimeout(()=>{
      // guardar los datos dentro del state
      setPersonaje(dato[0]);
      setCarga(false);
    }, 2000)
  }

  // operador ternario ? :
  // (condicion logica)?(codigo a ejecutar si la condicion logica es verdadera):(codigo a ejecutar cuando la condicion no se cumple)

  const mostrarComponente = (carga === true )?(<Spinner></Spinner>):(<Frase personaje={personaje}></Frase>);

  return (
    <section className='container my-5 d-flex flex-column align-items-center'>
      <img src={logo} alt="Logo de los Simpsons" />
      <Button variant='warning' className='w-75 my-5' onClick={()=> consultaAPI()}>Obtener frase</Button>
      { mostrarComponente }
    </section>
  );
}

export default App;
