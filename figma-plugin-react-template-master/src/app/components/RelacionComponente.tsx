import * as React from 'react';
import * as ReactDOM from 'react-dom';
import toast, {Toaster} from 'react-hot-toast';
import '../styles/ui.css';
import AccionElegida from './AccionElegida';

declare function require(path: string): any;
export const myFirstContext = React.createContext('');

const RelacionComponente = (props) => {
    var estado: string = ' lleno.';

    const [acciones, setAcciones] = React.useState([]);
    const [accionesAMostrar, setAccionesAMostrar] = React.useState([]);
    var componentesRelacionados = []

    React.useEffect(() => {
        let componentesDeEstaVista = [];
        componentesDeEstaVista = funcionAuxiliar();
        setAcciones(componentesDeEstaVista);
    }, []);

    function funcionAuxiliar() {
        let vec = [];
        vec = props.componenteRelacion;
        var acciones = [];
        for (let component of vec) {
            acciones.push(component);
        }
        return acciones;
    }

    React.useEffect(() => setAccionesAMostrar(acciones), [acciones]);

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'salirPlugin'}}, '*');
    };

    const relacionar = (/*nombreComponente: string*/) => {
        if (componentesRelacionados.length < 1){
            toast.error("No se ha seleccionado ningun componente")
        }
        else{
            let componentes:string= "";
            for (let c of componentesRelacionados){
                componentes+= c + ", ";
            }
            ReactDOM.render(
                <AccionElegida
                    nombreBootstrap={props.nombreBootstrap}
                    accionesVuelta={props.accionesVuelta}
                    parametrosDeComentario={props.parametrosDeComentario}
                    componenteRelacion={componentes + estado}
                />,
                document.getElementById('react-page')
            );
        }
    };

    function setEstado(event) {
        estado = event.target.value;
    }

    const volver = () => {
            ReactDOM.render(
                <AccionElegida
                nombreBootstrap={props.nombreBootstrap}
                accionesVuelta={props.accionesVuelta}
                parametrosDeComentario={props.parametrosDeComentario}
                componenteRelacion={""}
                />,
                document.getElementById('react-page')
            );
    };

    const agregarComponenteALaRelacion = (componente:string, check:boolean) =>{
        
        if (check){
            componentesRelacionados.push(componente)
        }
        else{
            componentesRelacionados = componentesRelacionados.filter((comp) => comp != componente);
        }
    }

    return (
        <div>
            <p id="textoInicial"> Componentes que pueden establecer una relación con: {accionesAMostrar[0]}</p>
            <hr></hr>
            <div className="Listado">
                <div id="mapListado">
                    {accionesAMostrar.map((element) => (
                        <>
                            <li>
                                Componente: {element}
                                <input type="checkbox"  onChange={(e) => agregarComponenteALaRelacion(element, e.target.checked)} />  
                            </li>
                        </>
                    ))}
                </div>
            </div>
            <Toaster/>
            <div onChange={setEstado.bind(this)}>
                <input type="radio" value=" lleno." name="gender" checked/> Lleno
                <input type="radio" value=" vacio." name="gender" /> Vacio
            </div>
            <button id="relacionar" onClick={relacionar}>
                {' '}
                Relacionar
            </button>
            <hr></hr>
            <button id="salirPlugin" onClick={onCancel}>
                {' '}
                Salir del plugin
            </button>
            <button id="volver" onClick={volver}>
                {' '}
                Volver
            </button>
        </div>
    );
};

export default RelacionComponente;
