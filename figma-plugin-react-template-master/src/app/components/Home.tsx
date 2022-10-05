import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import AccionElegida from './AccionElegida';
import data from '../assets/accionesPrueba.json';
import App from './App';




declare function require(path: string): any;
export const myFirstContext = React.createContext("");

const Home = ({}) => {

    React.useEffect(() => {
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'libreria') {
                const acciones = data.filter(accion => accion.libreria==message);
                let tipo;
                const accion= acciones.map(element => ( tipo = element.tipo)) //PARA QUE ESTA ESTA LINEA?

                ReactDOM.render(<AccionElegida tipo={tipo} libreria={message}/>, document.getElementById('react-page'));
            }
        };
    }, []);


    const onCancel = () => {
        parent.postMessage({ pluginMessage: { type: 'salirPlugin' } }, '*');
    };

    const conBootstrap = () => {
        parent.postMessage({ pluginMessage: { type: 'libreria' } }, '*');
    };
    const sinBootstrap = () => {
        ReactDOM.render(<App />, document.getElementById('react-page'));
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