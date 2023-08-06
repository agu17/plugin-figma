import * as React from 'react';
import * as ReactDOM from 'react-dom';
import toast, {Toaster} from 'react-hot-toast';
import '../styles/ui.css';
import AccionElegida from './ComponenteElegido';

declare function require(path: string): any;
export const myFirstContext = React.createContext('');

const RelacionComponente = (props) => {
    var estado: string = ' lleno';
    const [acciones, setAcciones] = React.useState([]);
    const [accionesAMostrar, setAccionesAMostrar] = React.useState([]);
    var componentesRelacionados = [];

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

    const relacionar = () => {
        if (componentesRelacionados.length < 1) {
            toast.error('No se ha seleccionado ningun componente');
        } else {
            let componentes: string = 'Los siguientes componentes deben estar ' + estado + 's :';
            for (let c of componentesRelacionados) {
                componentes += c + ', ';
            }
            let final: string = ' para que este componente este habilitado.';
            componentes = componentes + final;
            ReactDOM.render(
                <AccionElegida
                    componentes={props.componentes}
                    accionesVuelta={props.accionesVuelta}
                    parametrosDeComentario={props.parametrosDeComentario}
                    componenteRelacion={componentes}
                    listadoRestricciones={props.listadoRestricciones}
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
                componentes={props.componentes}
                accionesVuelta={props.accionesVuelta}
                parametrosDeComentario={props.parametrosDeComentario}
                componenteRelacion={''}
                listadoRestricciones={props.listadoRestricciones}
            />,
            document.getElementById('react-page')
        );
    };

    const agregarComponenteALaRelacion = (componente: string, check: boolean) => {
        if (check) {
            componentesRelacionados.push(componente);
        } else {
            componentesRelacionados = componentesRelacionados.filter((comp) => comp != componente);
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
            <p id="textoInicial" className="textApp">
                {' '}
                Selecciona los componentes que quieras relacionar con {props.nombreDelComponenteARelacionar}
            </p>
            <div className="Listado">
                <div id="mapListado">
                    {accionesAMostrar.map((element) => (
                        <>
                            <li id="liResticcion">
                                Componente: {element}
                                <input
                                    type="checkbox"
                                    onChange={(e) => agregarComponenteALaRelacion(element, e.target.checked)}
                                />
                            </li>
                        </>
                    ))}
                </div>
            </div>
            <Toaster />
            <div className='container' onChange={setEstado.bind(this)}>
                <p id="textoCondicion">Condicion</p>
                <div className='centerSelect'>
                    <select id="selectorDeCondicion" className='selectorCondicion'>
                        <option value="lleno">Lleno</option>
                        <option value="vacio">Vacío</option>
                        <option value="habilitado">Habilitado</option>
                        <option value="deshabilitado">Deshabilitado</option>
                    </select>
                </div>
            </div>
            <button id="relacionar" className='btnGenerarRestriccion' onClick={relacionar}>
                {' '}
                Relacionar
            </button>
        </div>
    );
};

export default RelacionComponente;
