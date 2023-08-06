import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import toast, {Toaster} from 'react-hot-toast';
import ComponenteElegido from './ComponenteElegido';

declare function require(path: string): any;
export const myFirstContext = React.createContext('');

const Restriccion = (props) => {
    const [restricciones, setRestricciones] = React.useState([]);
    const [nombreRestriccion, setNombreRestriccion] = React.useState('');
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
        var restriccioness = [];
        for (let restriccion of vec) {
            restriccioness.push(restriccion);
        }
        return restriccioness;
    }

    React.useEffect(() => setRestriccionesAMostrar(restricciones), [restricciones]);

    React.useEffect(
        //barra de busqueda
        () =>
            setRestriccionesAMostrar(
                restricciones.filter((restriccion) =>
                    restriccion.tipo.toLowerCase().includes(nombreRestriccion.toLowerCase())
                )
            ),
        [nombreRestriccion]
    );

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
                    onClick={volver}
                >
                    <img src={require('../assets/ruta_de_la_imagen.png').default} width="10" height="10" />
                </button>
                <div className="flexsearchhh">
                    <input
                        id="barraBusqueda"
                        onChange={(e) => setNombreRestriccion(e.target.value)}
                        className="flexsearch--input"
                        onKeyPress={(e) => {
                            e.key === 'Enter' && e.preventDefault();
                        }}
                        type="text"
                        value={nombreRestriccion}
                        placeholder="Buscar restricción"
                    />
                    <img src={require('../assets/search-icon.png').default} width="20" height="20" />
                </div>
            </div>
            <p id="textoCondicion" >
                Restricciones
            </p>
            <div className="Listado">
                <div id="mapListado">
                    {restriccionesAMostrar.map((element) => (
                        <>
                            <li id="liResticcion">
                                {element.tipo}
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

            <button id="relacionar" className="btnGenerarRestriccion" onClick={generarRestriccion}>
                {' '}
                Generar Restricción
            </button>
        </div>
    );
};
export default Restriccion;
