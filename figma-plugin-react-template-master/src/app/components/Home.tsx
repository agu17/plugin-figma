import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import AccionElegida from './AccionElegida';
import data from '../assets/accionesPrueba.json';
import App from './App';
import SinLibreria from './sinLibreria';




declare function require(path: string): any;
export const myFirstContext = React.createContext("");

const Home = ({}) => {

    React.useEffect(() => {
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'nombreBootstrap') {
                /*let vec = [];
                vec = message;
                var acciones = [];
                var v = []; 
                for(let component of vec){
                    v = (data.filter(accion => accion.nombreBootstrap.includes(component)));
                    for( let aux of v){
                        acciones.push(aux);
                    }

                }*/
            
                //CREO QUE ACA ESTA EL ERROR, PORQ SE QUEDARIA CON EL ULTIMO TIPO
                ReactDOM.render(<App nombreBootstrap={message}/>, document.getElementById('react-page'));
            }
           
        };
    }, []);


    const onCancel = () => {
        parent.postMessage({ pluginMessage: { type: 'salirPlugin' } }, '*');
    };

    const conBootstrap = () => {
        parent.postMessage({ pluginMessage: { type: 'nombreBootstrap' } }, '*');
    };
    const sinBootstrap = () => {
        ReactDOM.render(<SinLibreria/>, document.getElementById('react-page'));
    };

    return (
        <div>
            <p id="textoInicial"> Seleccione el método de utilización del plugin.</p>
            <hr></hr>
            <button id="botonIrAAccion" onClick={conBootstrap}> Libreria</button>
            <button id="botonIrAAccion" onClick={sinBootstrap}> Sin libreria</button>
            <button id="salirPlugin" onClick={onCancel}> Salir del plugin</button>
        </div>
    );
};

export default Home;