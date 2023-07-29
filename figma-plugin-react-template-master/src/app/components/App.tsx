import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import ComponenteElegido from './ComponenteElegido';
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
    }, []);

    function funcionAuxiliar() {
        let vec = [];
        vec = props.componentes;
        var acciones = [];
        for (let component of vec) {
            acciones.push(component);
        }
        return acciones;
    }

    React.useEffect(() => {
        setAccionesAMostrar(acciones);
    }, [acciones]);

    React.useEffect(
        //barra de busqueda
        () =>
            setAccionesAMostrar(acciones.filter((accion) => accion.toLowerCase().includes(nombreAccion.toLowerCase()))),
        [nombreAccion]
    );

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'salirPlugin'}}, '*');
    };

    const irALaAccion = (componentes: string) => {
        <ComponenteElegido componentes={componentes} />;
        ReactDOM.render(
            <ComponenteElegido
                componentes={componentes}
                accionesVuelta={props.componentes}
                parametrosDeComentario={props.parametrosDeComentario}
                componenteRelacion={''}
                restricciones={''}
            />,
            document.getElementById('react-page')
        );
    };

    const volver = () => {
        ReactDOM.render(<Home />, document.getElementById('react-page'));
    };

    return (
        <div>
            <div>
            <button
                // id={element.id + 'botonDeEdicionDeTexto'}
                title="Volver"
                className="back-button"
                onClick={volver}>
                <img
                    src={require('../assets/ruta_de_la_imagen.png').default}
                    width="10"
                    height="10"
                />
            </button>
            </div>
            <p id="textoInicial" className="textApp"> Componentes detectados del frame {props.parametrosDeComentario[5]} </p>
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
            <div className="Listado">
                <div id="mapListado">
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
        </div>
    );
};

export default App;
