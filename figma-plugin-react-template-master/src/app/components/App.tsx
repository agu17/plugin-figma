
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import AccionElegida from './AccionElegida';
import data from '../assets/accionesPrueba.json';


declare function require(path: string): any;
export const myFirstContext = React.createContext("");

const App = (props) => {
    
    //SE PODRIA USAR USE MEMO PARA EL SET DE ACCIONES
    const [acciones, setAcciones] = React.useState([]);
    const [nombreAccion,setNombreAccion] = React.useState("");
    const [accionesAMostrar, setAccionesAMostrar] = React.useState([]); 

    React.useEffect(() => {
            let componentesDeEstaVista = [];
            componentesDeEstaVista = funcionAuxiliar();
            //let acc = [];//
            /*for (let componente of componentesDeEstaVista){

                acc = (accioness.filter(accion => componente.toLowerCase().includes(accion.nombreBootstrap.toLowerCase())))
        
            }*/
            setAcciones(componentesDeEstaVista);
        
    }, []);

    function funcionAuxiliar(){
        let vec = [];
        vec = props.nombreBootstrap;
                var acciones = [];
                //var v = []; 
                for(let component of vec){
                    /*v = (data.filter(accion => accion.nombreBootstrap.includes(component)));
                    for( let aux of v){
                        acciones.push(aux);
                    }*/
                    acciones.push(component);
                }
        return acciones;


    }


    React.useEffect(() =>
        setAccionesAMostrar(acciones), 
        [acciones]
    );

    React.useEffect(() =>
        setAccionesAMostrar(acciones.filter(accion => accion.toLowerCase().includes(nombreAccion.toLowerCase()))), 
        [nombreAccion]
    );

    const onCancel = () => {
        parent.postMessage({ pluginMessage: { type: 'salirPlugin' } }, '*');
    };

    const irALaAccion = (nombreBootstrap:string) => {

        <AccionElegida  nombreBootstrap={nombreBootstrap}/>
        ReactDOM.render(<AccionElegida nombreBootstrap={nombreBootstrap} accionesVuelta={props.nombreBootstrap} parametrosDeComentario={props.parametrosDeComentario}/>, document.getElementById('react-page')); 
    };

    return (
        <div>
            <p id="textoInicial"> Selecciona una acción, le recomendamos copiar dicha accion en un comentario sobre el componente seleccionado</p>

            <div className="flexsearch">
                <div className="flexsearch--wrapper">
                    <form id="barraBusqueda" className="flexsearch--form">
                        <div className="flexsearch--input-wrapper">
                            <input id="barraBusqueda" onChange={(e) => setNombreAccion(e.target.value)} className="flexsearch--input" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} type="text" value={nombreAccion} placeholder="Ingrese una acción..." /> 
                            <img src={require('../assets/search-icon.png').default } width="20" height="20"/>
                        </div>
                    </form>
                </div>
            </div>
            <hr></hr>
            <div className="Listado">
                <div id="mapListado">
                    {accionesAMostrar.map(element => (
                        <><li>Componente: {element}
                            <input id="botonIrAAccion" onClick={() => irALaAccion(element)} className="flexsearch--submit" type="submit" value="&#10140;" />
                        </li></>
                    ))}
                </div>
            </div>
            <hr></hr>
            <button id="salirPlugin" onClick={onCancel}> Salir del plugin</button>
        </div>
    );
};

export default App;
