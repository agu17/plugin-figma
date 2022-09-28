import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import AccionElegida from './AccionElegida';
import data from '../assets/accionesPrueba.json';
import App from './App';



declare function require(path: string): any;
export const myFirstContext = React.createContext("");

const Home = ({}) => {


    const onCancel = () => {
        parent.postMessage({ pluginMessage: { type: 'salirPlugin' } }, '*');
    };

    const conBootstrap = () => {

        for(const node of figma.currentPage.selection){

            /*node.name == input;
            ReactDOM.render(<AccionElegida tipo={}/>, document.getElementById('react-page'));*/

        }

        //Acá recuperamos el nombre del componente y ademas, manejamos un if else, donde nos damos cuenta si
        //ejecuto el plugin sobre un componente de la libreria de boostrap 5, de esta manera pondriamos una alerta advirtiendole en caso de
        //que no haya seleccionado un componente de dicha libreria, derivandolo a utilizar el plugin sin libreria.
        //---
        //teniendo el nombre del componente, renderizariamos AccionElegida con el nombre del componente.


         /*figma.currentPage.selection();
        
        
        
        <AccionElegida tipo={}/>
        ReactDOM.render(<AccionElegida tipo={}/>, document.getElementById('react-page'));*/
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