import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import data from '../assets/accionesPrueba.json';
import dataRestricciones from '../assets/restricciones.json';
import App from './App';
import SinLibreria from './sinLibreria';
import RelacionComponente from './RelacionComponente';
import toast, {Toaster} from 'react-hot-toast';
import Restriccion from './Restriccion';

declare function require(path: string): any;

const AccionElegida = (props) => {
    const acciones = data;
    const [nombreAccion, setNombreAccion] = React.useState('');
    const [accionesAMostrar, setAccionesAMostrar] = React.useState([]);
    const fileKey = props.parametrosDeComentario[0];
    const idNodo = props.parametrosDeComentario[1];
    const posX = props.parametrosDeComentario[2];
    const posY = props.parametrosDeComentario[3];
    const token = props.parametrosDeComentario[4];
    var comentario: string;

    React.useEffect(() => {
        let nombreComponente = props.nombreBootstrap;
        let acc = [];
        if (props.nombreBootstrap == '') {
            acc = acciones.filter((accion) => accion.tipo == props.tipo);
        } else {
            acc = acciones.filter((accion) => nombreComponente.includes(accion.nombreBootstrap));
        }
        setAccionesAMostrar(acc);
    }, []);

    React.useEffect(() => {
        if (nombreAccion != '') {
            setAccionesAMostrar(
                accionesAMostrar.filter((accion) =>
                    accion.descripcion.toLowerCase().includes(nombreAccion.toLowerCase())
                )
            );
        } else {
            if (props.nombreBootstrap == '') {
                setAccionesAMostrar(acciones.filter((accion) => accion.tipo == props.tipo));
            } else {
                let nombreComponente = props.nombreBootstrap;
                setAccionesAMostrar(acciones.filter((accion) => nombreComponente.includes(accion.nombreBootstrap)));
            }
        }
        [nombreAccion];
    });

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'salirPlugin'}}, '*');
    };

    const volver = () => {
        if (props.nombreBootstrap === '') {
            ReactDOM.render(<SinLibreria />, document.getElementById('react-page'));
        } else {
            ReactDOM.render(
                <App
                    tipo={nombreAccion}
                    nombreBootstrap={props.accionesVuelta}
                    parametrosDeComentario={props.parametrosDeComentario}
                />,
                document.getElementById('react-page')
            );
        }
    };

    const relacionarComponente = () => {
        if (props.nombreBootstrap != '') {
            let acc = [];
            acc = props.accionesVuelta;
            acc = acc.filter((element) => element != props.nombreBootstrap);
            <RelacionComponente componenteRelacion={acc} />;
            ReactDOM.render(
                <RelacionComponente
                    nombreBootstrap={props.nombreBootstrap}
                    accionesVuelta={props.accionesVuelta}
                    parametrosDeComentario={props.parametrosDeComentario}
                    nombreDelComponenteARelacionar={props.nombreBootstrap}
                    componenteRelacion={acc}
                    listadoRestricciones={props.listadoRestricciones}
                />,
                document.getElementById('react-page')
            );
        } else {
            toast.error('Esta funcionalidad no esta disponible para el modo sin libreria!');
        }
    };

    const editarTexto = (i: string) => {
        let textoAEditar = document.getElementById(i);
        let colorBoton = document.getElementById(i + 'botonDeEdicionDeTexto');
        if (textoAEditar.isContentEditable) {
            textoAEditar.contentEditable = 'false';
            textoAEditar.style.backgroundColor = '#7572E7';
            colorBoton.style.backgroundColor = '#E4E4E4';
        } else {
            textoAEditar.contentEditable = 'true';
            textoAEditar.style.backgroundColor = '#C5C5C5';
            colorBoton.style.backgroundColor = '#F37A7A';
        }
    };

    function sacarSaltosDeLinea(tip) {
        tip = tip.replace('<br><br>', '\n');
        tip = tip.replace('<br><br>', '\n');
        tip = tip.replace('<br>', '\n');
        tip = tip.replace('<br>', '\n');
        tip = tip.replace('<br>', '\n');
        tip = tip.replace('<br>', '\n');
        return tip;
    }

    const copiarAccion = async (id: string) => {
        var copyTextarea = document.createElement('textarea');
        copyTextarea.style.position = 'fixed';
        copyTextarea.style.opacity = '0';
        let tip = document.getElementById(id + 'tip').innerHTML;
        tip = sacarSaltosDeLinea(tip);
        copyTextarea.textContent = tip;
        document.body.appendChild(copyTextarea);
        copyTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(copyTextarea);
        toast.success('Copiado!');
    };

    const postear = async (id: string) => {
        if (props.nombreBootstrap != '') {
            let tip = document.getElementById(id + 'tip').innerHTML;
            tip = sacarSaltosDeLinea(tip);
            comentario = tip;
            var myHeaders = new Headers();
            myHeaders.append('X-FIGMA-TOKEN', token);
            myHeaders.append('Content-Type', 'application/json');

            var raw = JSON.stringify({
                message: comentario,
                client_meta: {
                    node_id: idNodo,
                    node_offset: {
                        x: posX,
                        y: posY,
                    },
                },
            });

            var requestOptions: RequestInit = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
            };

            fetch('https://api.figma.com/v1/files/' + fileKey + '/comments', requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.log('error', error));

            toast.success('El comentario se posteo con exito!');
        } else {
            toast.error('Esta funcionalidad no esta disponible para el modo sin libreria!');
        }
    };

    const agregarRestricciones = () => {
        if (props.nombreBootstrap != '') {
            let restricciones = [];
            restricciones = dataRestricciones;
            console.log(props.nombreBootstrap);
            restricciones = restricciones.filter((restriccion) =>
                props.nombreBootstrap.toLowerCase().includes(restriccion.tipo.toLowerCase())
            );
            <Restriccion listadoRestricciones={restricciones} />;
            ReactDOM.render(
                <Restriccion
                    nombreBootstrap={props.nombreBootstrap}
                    accionesVuelta={props.accionesVuelta}
                    parametrosDeComentario={props.parametrosDeComentario}
                    nombreDelComponenteARelacionar={props.nombreBootstrap}
                    componenteRelacion={props.componenteRelacion}
                    listadoRestricciones={restricciones}
                />,
                document.getElementById('react-page')
            );
        } else {
            toast.error('Esta funcionalidad no esta disponible para el modo sin libreria!');
        }
    };

    return (
        <div>
            <p id="textoInicial"> Componente: {props.nombreBootstrap}</p>

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
                                type="search"
                                placeholder="Ingrese una variante..."
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
                                <div id={element.id} className="textoDeAccion" contentEditable="false">
                                    <p id={element.id + 'tip'}>
                                        {' '}
                                        {element.descripcion} <br />
                                        <br /> {element.preCondicion} <br /> <br />
                                        <br /> {element.postCondicion} <br />
                                        RELACIÓN: {props.componenteRelacion} <br />
                                        RESTRICCIÓN: {props.listadoRestricciones} <br />
                                    </p>
                                </div>
                                <Toaster />
                                <div className="Botones">
                                    <button
                                        id={element.id + 'botonDeEdicionDeTexto'}
                                        title="Editar tip"
                                        className="botonDeEdicionDeTexto"
                                        onClick={() => {
                                            editarTexto(element.id);
                                        }}
                                    >
                                        <img
                                            src={require('../assets/edit-button.png').default}
                                            width="20"
                                            height="20"
                                        />
                                    </button>
                                    <button
                                        id="botonDeCopiarAccion"
                                        title="Copiar tip"
                                        onClick={() => {
                                            copiarAccion(element.id);
                                        }}
                                    >
                                        <img
                                            src={require('../assets/icono-copiar.png').default}
                                            width="20"
                                            height="20"
                                        />
                                    </button>
                                    <button
                                        id="botonDepost"
                                        className="botonDepost"
                                        title="Realizar un comentario con este tip"
                                        onClick={() => {
                                            postear(element.id);
                                        }}
                                    >
                                        <img src={require('../assets/comentario.png').default} width="20" height="20" />
                                    </button>
                                    <button
                                        id="botonDeRelacion"
                                        title="Relacionar este componente con otros"
                                        className="botonDeRelacion"
                                        onClick={() => {
                                            relacionarComponente();
                                        }}
                                    >
                                        <img
                                            src={require('../assets/icono-vinculacion.png').default}
                                            width="20"
                                            height="20"
                                        />
                                    </button>
                                    <button
                                        id="botonDeRestricciones"
                                        title="Agregar una restriccion al componente"
                                        className="botonDeRestricciones"
                                        onClick={() => {
                                            agregarRestricciones();
                                        }}
                                    >
                                        <img
                                            src={require('../assets/icono-vinculacion.png').default}
                                            width="20"
                                            height="20"
                                        />
                                    </button>
                                </div>
                            </li>
                            <hr></hr>
                        </>
                    ))}
                </div>
            </div>

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

export default AccionElegida;
