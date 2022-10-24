
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import AccionElegida from './AccionElegida';
import data from '../assets/accionesPrueba.json';


declare function require(path: string): any;
export const myFirstContext = React.createContext("");

const App = (props) => {
    
    //SE PODRIA USAR USE MEMO PARA EL SET DE ACCIONES
    const accioness = data;
    const [acciones, setAcciones] = React.useState([]);
    const [nombreAccion,setNombreAccion] = React.useState("");
    const [accionesAMostrar, setAccionesAMostrar] = React.useState([]); 

    React.useEffect(() => {
        if (props.nombreBootstrap.length == 0){
            let accionesNoDuplicadas = [];
            data.forEach(p =>{
            if(accionesNoDuplicadas.findIndex(pd => pd.tipo === p.tipo) === -1) {
                accionesNoDuplicadas.push(p);
            }
            });
            setAcciones(accionesNoDuplicadas)

        }
        else{
            
            let componentesDeEstaVista = [];
            componentesDeEstaVista = funcionAuxiliar();
            console.log(componentesDeEstaVista)
            //let acc = [];//
            /*for (let componente of componentesDeEstaVista){

                acc = (accioness.filter(accion => componente.toLowerCase().includes(accion.nombreBootstrap.toLowerCase())))
        
            }*/
            setAcciones(componentesDeEstaVista);
        } 
    }, []);

    function funcionAuxiliar(){
        let vec = [];
        vec = props.nombreBootstrap;
                var acciones = [];
                var v = []; 
                for(let component of vec){
                    v = (data.filter(accion => accion.nombreBootstrap.includes(component)));
                    for( let aux of v){
                        acciones.push(aux);
                    }
                }
        return acciones;


    }


    React.useEffect(() =>
        setAccionesAMostrar(acciones), 
        [acciones]
    );

    React.useEffect(() =>
        setAccionesAMostrar(acciones.filter(accion => accion.tipo.toLowerCase().includes(nombreAccion.toLowerCase()))), 
        [nombreAccion]
    );

    const onCancel = () => {
        parent.postMessage({ pluginMessage: { type: 'salirPlugin' } }, '*');
    };

    const irALaAccion = (tipo:string, nombreBootstrap:string) => {
        <AccionElegida tipo={tipo} nombreBootstrap={nombreBootstrap}/>
        ReactDOM.render(<AccionElegida tipo={tipo} nombreBootstrap={nombreBootstrap} accionesVuelta={props.nombreBootstrap} />, document.getElementById('react-page')); 
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
                        <><li>Accion: {element.tipo} Componente: {element.nombreBootstrap}
                            <input id="botonIrAAccion" onClick={() => irALaAccion(element.tipo, element.nombreBootstrap)} className="flexsearch--submit" type="submit" value="&#10140;" />
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
