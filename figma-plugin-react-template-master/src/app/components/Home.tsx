import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
//import AccionElegida from './AccionElegida';
//import data from '../assets/accionesPrueba.json';
import App from './App';
import SinLibreria from './sinLibreria';
import toast, { Toaster } from 'react-hot-toast';

declare function require(path: string): any;
export const myFirstContext = React.createContext("");

const Home = ({}) => {
    const [nombreToken,setNombreToken] = React.useState("");

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
                
                let componentes = message.pop()
                alert("fff" + componentes.length)
                ReactDOM.render(<App nombreBootstrap={componentes} parametrosDeComentario={message} />, document.getElementById('react-page'));
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

    const setearToken = () => {
        parent.postMessage({ pluginMessage: { type: 'setearToken', mens: nombreToken } }, '*');
        toast.success("Se ha guardado el token!");
    }

    return (
        <div>
            <p id="textoInicial"> Seleccione el método de utilización del plugin.</p>
            
            <button id="botonIrAAccion" onClick={conBootstrap}> Libreria</button>
            <button id="botonIrAAccion" onClick={sinBootstrap}> Sin libreria</button>
            
            <button id="salirPlugin" onClick={onCancel}> Salir del plugin</button>
            <hr></hr>
            <Toaster />
            <div className="flexsearch--input-wrapper">
                <input id="inputDelToken" placeholder='Ingrese su token' className="inputDelToken" onChange={(e) => setNombreToken(e.target.value)}/>
                <button id="botonDeCopiarAccion" onClick={setearToken}>
                    <img   src={require('../assets/icono-copiar.png').default } width="20" height="20" />
                </button>
            </div>
        </div>
    );
};

export default Home;