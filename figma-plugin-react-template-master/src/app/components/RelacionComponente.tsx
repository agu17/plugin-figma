import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import AccionElegida from './AccionElegida';

declare function require(path: string): any;
export const myFirstContext = React.createContext('');

const RelacionComponente = (props) => {
    var estado: string = ' ';

    const [acciones, setAcciones] = React.useState([]);
    const [accionesAMostrar, setAccionesAMostrar] = React.useState([]);

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

    const relacionar = (nombreComponente: string) => {
        ReactDOM.render(
            <AccionElegida
                nombreBootstrap={props.nombreBootstrap}
                accionesVuelta={props.accionesVuelta}
                parametrosDeComentario={props.parametrosDeComentario}
                componenteRelacion={nombreComponente + estado}
            />,
            document.getElementById('react-page')
        );
    };

    function setEstado(event) {
        estado = event.target.value;
        console.log(event.target.value);
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
                                <input
                                    id="botonLinkeo"
                                    onClick={() => relacionar(element)}
                                    className="flexsearch--submit"
                                    type="submit"
                                    value="&#10140;"
                                />
                                <div onChange={setEstado.bind(this)}>
                                    <input type="radio" value=" lleno" name="gender" /> Lleno
                                    <input type="radio" value=" vacio" name="gender" /> Vacio
                                </div>
                            </li>
                        </>
                    ))}
                </div>
            </div>
            <hr></hr>
            <button id="salirPlugin" onClick={onCancel}>
                {' '}
                Salir del plugin
            </button>
        </div>
    );
};

export default RelacionComponente;
