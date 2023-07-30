import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import toast, {Toaster} from 'react-hot-toast';
import ComponenteElegido from './ComponenteElegido';

declare function require(path: string): any;
export const myFirstContext = React.createContext('');

const Restriccion = (props) => {
    const [restricciones, setRestricciones] = React.useState([]);
    const [restriccionesAMostrar, setRestriccionesAMostrar] = React.useState([]);
    var restriccionesElegidas = [];

    React.useEffect(() => {
        let restriccionesDeEstaVista = [];
        restriccionesDeEstaVista = funcionAuxiliar();
        setRestricciones(restriccionesDeEstaVista);
    }, []);

    function funcionAuxiliar() {
        let vec = [];
        vec = props.listadoRestricciones;
        var restricciones = [];
        for (let restriccion of vec) {
            restricciones.push(restriccion);
        }
        return restricciones;
    }

    React.useEffect(() => setRestriccionesAMostrar(restricciones), [restricciones]);

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'salirPlugin'}}, '*');
    };

    const volver = () => {
        ReactDOM.render(
            <ComponenteElegido
                tipo={props.tipo}
                componentes={props.componentes}
                accionesVuelta={props.accionesVuelta}
                parametrosDeComentario={props.parametrosDeComentario}
                componenteRelacion={props.componenteRelacion}
                listadoRestricciones={''}
            />,
            document.getElementById('react-page')
        );
    };

    const agregarRestriccionAlComponente = (restriccion, check) => {
        if (check) {
            restriccionesElegidas.push(restriccion);
        } else {
            restriccionesElegidas = restriccionesElegidas.filter((rest) => rest != restriccion);
        }
    };

    const generarRestriccion = () => {
        if (restriccionesElegidas.length < 1) {
            toast.error('No se ha seleccionado ninguna restricción');
        } else {
            let restricciones: string = '';
            for (let r of restriccionesElegidas) {
                restricciones += r.descripcion + ' ';
            }
            ReactDOM.render(
                <ComponenteElegido
                    tipo={props.tipo}
                    componentes={props.componentes}
                    accionesVuelta={props.accionesVuelta}
                    parametrosDeComentario={props.parametrosDeComentario}
                    componenteRelacion={props.componenteRelacion}
                    listadoRestricciones={restricciones}
                />,
                document.getElementById('react-page')
            );
        }
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
            <p id="textoInicial" className="textApp">Restricciones</p>
            <hr></hr>
            <div className="Listado">
                <div id="mapListado">
                    {restriccionesAMostrar.map((element) => (
                        <>
                            <li>
                                Restricción: {element.tipo}
                                <br />
                                {element.descripcion}
                                <input
                                    type="checkbox"
                                    onChange={(e) => agregarRestriccionAlComponente(element, e.target.checked)}
                                />
                            </li>
                        </>
                    ))}
                </div>
            </div>
            <Toaster />

            <button id="relacionar" onClick={generarRestriccion}>
                {' '}
                Generar Restricción
            </button>
        </div>
    );
};
export default Restriccion;
