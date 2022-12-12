import * as React from 'react';
import * as ReactDOM from 'react-dom';
import toast, {Toaster} from 'react-hot-toast';
import '../styles/ui.css';
import AccionElegida from './AccionElegida';
import Home from './home';

declare function require(path: string): any;
export const myFirstContext = React.createContext('');

const App = (props) => {
    const [acciones, setAcciones] = React.useState([]);
    const [nombreAccion, setNombreAccion] = React.useState('');
    const [accionesAMostrar, setAccionesAMostrar] = React.useState([]);

    React.useEffect(() => {
        let componentesDeEstaVista = [];
        componentesDeEstaVista = funcionAuxiliar();
        setAcciones(componentesDeEstaVista);
        console.log(accionesAMostrar);
        if (accionesAMostrar.length == 0) {
            toast.error('Los nombres de los componentes no se encuentran relacionados con ningún tip');
        }
    }, []);

    function funcionAuxiliar() {
        let vec = [];
        vec = props.nombreBootstrap;
        var acciones = [];
        for (let component of vec) {
            acciones.push(component);
        }
        return acciones;
    }

    React.useEffect(() => setAccionesAMostrar(acciones), [acciones]);

    React.useEffect(
        //barra de busqueda
        () =>
            setAccionesAMostrar(acciones.filter((accion) => accion.toLowerCase().includes(nombreAccion.toLowerCase()))),
        [nombreAccion]
    );

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'salirPlugin'}}, '*');
    };

    const irALaAccion = (nombreBootstrap: string) => {
        <AccionElegida nombreBootstrap={nombreBootstrap} />;
        ReactDOM.render(
            <AccionElegida
                nombreBootstrap={nombreBootstrap}
                accionesVuelta={props.nombreBootstrap}
                parametrosDeComentario={props.parametrosDeComentario}
                componenteRelacion={''}
            />,
            document.getElementById('react-page')
        );
    };

    const volver = () => {
        ReactDOM.render(<Home />, document.getElementById('react-page'));
    };

    return (
        <div>
            <div className="flexsearch">
                <div className="flexsearch--wrapper">
                    <form id="barraBusqueda" className="flexsearch--form">
                        <div className="flexsearch--input-wrapper">
                            <input
                                id="barraBusqueda"
                                onChange={(e) => setNombreAccion(e.target.value)}
                                className="flexsearch--input"
                                onKeyPress={(e) => {
                                    e.key === 'Enter' && e.preventDefault();
                                }}
                                type="text"
                                value={nombreAccion}
                                placeholder="Ingrese una acción..."
                            />
                            <img src={require('../assets/search-icon.png').default} width="20" height="20" />
                        </div>
                    </form>
                </div>
            </div>
            <hr></hr>
            <p id="textoInicial"> Componentes detectados del frame {props.parametrosDeComentario[5]}</p>
            <div className="Listado">
                <div id="mapListado">
                    <Toaster />
                    {accionesAMostrar.map((element) => (
                        <>
                            <li>
                                Componente: {element}
                                <input
                                    id="botonIrAAccion"
                                    onClick={() => irALaAccion(element)}
                                    className="flexsearch--submit"
                                    type="submit"
                                    value="&#10140;"
                                />
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
            <button id="volver" onClick={volver}>
                {' '}
                Volver
            </button>
        </div>
    );
};

export default App;
