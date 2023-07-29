import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import ComponenteElegido from './ComponenteElegido';
import data from '../assets/accionesPrueba.json';
import Home from './home';

declare function require(path: string): any;
export const myFirstContext = React.createContext('');

const SinNomenclatura = () => {
    const [acciones, setAcciones] = React.useState([]);
    const [nombreAccion, setNombreAccion] = React.useState('');
    const [accionesAMostrar, setAccionesAMostrar] = React.useState([]);

    React.useEffect(() => {
        let accionesNoDuplicadas = [];
        data.forEach((p) => {
            if (accionesNoDuplicadas.findIndex((pd) => pd.tipo === p.tipo) === -1) {
                accionesNoDuplicadas.push(p);
            }
        });
        setAcciones(accionesNoDuplicadas);
    }, []);

    React.useEffect(() => setAccionesAMostrar(acciones), [acciones]);

    React.useEffect(
        () =>
            setAccionesAMostrar(
                acciones.filter((accion) => accion.tipo.toLowerCase().includes(nombreAccion.toLowerCase()))
            ),
        [nombreAccion]
    );

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'salirPlugin'}}, '*');
    };

    const irALaAccion = (tipo: string) => {
        <ComponenteElegido tipo={tipo} componentes={''} accionesVuelta={''} parametrosDeComentario={''} />;
        ReactDOM.render(
            <ComponenteElegido tipo={tipo} componentes={''} accionesVuelta={''} parametrosDeComentario={''} />,
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
            <p id="textoInicial" className="textApp">
                {' '}
                Selecciona una acción, le recomendamos copiar dicha accion en un comentario sobre el componente
                seleccionado
            </p>

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
                                Acción: {element.tipo}
                                <input
                                    id="botonIrAAccion"
                                    onClick={() => irALaAccion(element.tipo)}
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

export default SinNomenclatura;
