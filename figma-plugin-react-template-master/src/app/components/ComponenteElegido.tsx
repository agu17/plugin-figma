import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import data from '../assets/accionesPrueba.json';
import dataRestricciones from '../assets/restricciones.json';
import App from './App';
import SinNomenclatura from './SinNomenclatura';
import RelacionComponente from './RelacionComponente';
import toast, {Toaster} from 'react-hot-toast';
import Restriccion from './Restriccion';

declare function require(path: string): any;

const ComponenteElegido = (props) => {
    const acciones = data;
    const [tips, setTips] = React.useState([]);
    const [nombreTip, setNombreTip] = React.useState('');
    const [tipsAMostrar, setTipsAMostrar] = React.useState([]);
    const fileKey = props.parametrosDeComentario[0];
    const idNodo = props.parametrosDeComentario[1];
    const posX = props.parametrosDeComentario[2];
    const posY = props.parametrosDeComentario[3];
    const token = props.parametrosDeComentario[4];
    var comentario: string;

    React.useEffect(() => {
        let tipsDeEstaVista = [];
        tipsDeEstaVista = funcionAuxiliar();
        setTips(tipsDeEstaVista);
    }, []);

    function funcionAuxiliar() {
        let nombreComponente = props.componentes;
        if (nombreComponente == '') {
            return acciones.filter((accion) => accion.tipo == props.tipo);
        }
        if (nombreComponente === 'boton') {
            nombreComponente = 'button';
        }
        return acciones.filter((accion) => nombreComponente.includes(accion.nombre));
    }

    React.useEffect(() => setTipsAMostrar(tips), [tips]);

    /*React.useEffect(() => {
        if (props.componentes == '') {
            setTipsAMostrar(acciones.filter((accion) => accion.tipo == props.tipo));
        } else {
            let nombreComponente = props.componentes;
            if (nombreComponente === 'boton') {
                nombreComponente = 'button';
            }
            setTipsAMostrar(acciones.filter((accion) => nombreComponente.includes(accion.nombre)));
        }
        
        [];
    });*/

    /*React.useEffect(() => {
        if (nombreTip != '') {
            setTipsAMostrar(tipsAMostrar.filter((accion) => accion.descripcion.toLowerCase().includes(nombreTip.toLowerCase())));
        } else {
            if (props.componentes == '') {
                setTipsAMostrar(acciones.filter((accion) => accion.tipo == props.tipo));
            } else {
                let nombreComponente = props.componentes;
                if (nombreComponente === 'boton') {
                    nombreComponente = 'button';
                }
                setTipsAMostrar(acciones.filter((accion) => nombreComponente.includes(accion.nombre)));
            }
        }
        [];
    });*/

    React.useEffect(
        //barra de busqueda
        () =>
            setTipsAMostrar(
                tips.filter((accion) => accion.descripcion.toLowerCase().includes(nombreTip.toLowerCase()))
            ),
        [nombreTip]
    );

    const volver = () => {
        if (props.componentes === '') {
            ReactDOM.render(<SinNomenclatura />, document.getElementById('react-page'));
        } else {
            ReactDOM.render(
                <App
                    tipo={nombreTip}
                    componentes={props.accionesVuelta}
                    parametrosDeComentario={props.parametrosDeComentario}
                />,
                document.getElementById('react-page')
            );
        }
    };

    const relacionarComponente = () => {
        if (props.componentes != '') {
            let acc = [];
            acc = props.accionesVuelta;
            acc = acc.filter((element) => element != props.componentes);
            <RelacionComponente componenteRelacion={acc} />;
            ReactDOM.render(
                <RelacionComponente
                    componentes={props.componentes}
                    accionesVuelta={props.accionesVuelta}
                    parametrosDeComentario={props.parametrosDeComentario}
                    nombreDelComponenteARelacionar={props.componentes}
                    componenteRelacion={acc}
                    listadoRestricciones={props.listadoRestricciones}
                />,
                document.getElementById('react-page')
            );
        } else {
            toast.error('Esta funcionalidad no esta disponible para el modo sin nomenclatura!');
        }
    };

    const editarTexto = (i: string) => {
        let textoAEditar = document.getElementById(i);
        let colorBoton = document.getElementById(i + 'botonDeEdicionDeTexto');
        if (textoAEditar.isContentEditable) {
            textoAEditar.contentEditable = 'false';
            textoAEditar.style.backgroundColor = '#f1f1f1';
            colorBoton.style.backgroundColor = '#e4e4e4';
        } else {
            textoAEditar.contentEditable = 'true';
            textoAEditar.style.backgroundColor = '#E4E4E4';
            colorBoton.style.backgroundColor = '#7572E7';
        }

        colorBoton.addEventListener('mouseenter', () => {
            colorBoton.classList.add('hover-estilo');
        });
    };

    function sacarSaltosDeLinea(tip) {
        tip = tip.replaceAll('<br>', '\n');
        tip = tip.replaceAll('<p>', '');
        tip = tip.replaceAll('</p>', '');
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
        if (props.componentes != '') {
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
            toast.error('Esta funcionalidad no esta disponible para el modo sin nomenclatura!');
        }
    };

    const agregarRestricciones = () => {
        if (props.componentes != '') {
            let restricciones = [];
            restricciones = dataRestricciones;
            <Restriccion listadoRestricciones={restricciones} />;
            ReactDOM.render(
                <Restriccion
                    componentes={props.componentes}
                    accionesVuelta={props.accionesVuelta}
                    parametrosDeComentario={props.parametrosDeComentario}
                    nombreDelComponenteARelacionar={props.componentes}
                    componenteRelacion={props.componenteRelacion}
                    listadoRestricciones={restricciones}
                />,
                document.getElementById('react-page')
            );
        } else {
            let restricciones = [];
            restricciones = dataRestricciones;
            <Restriccion listadoRestricciones={restricciones} />;
            ReactDOM.render(
                <Restriccion
                    tipo={props.tipo}
                    componentes={props.componentes}
                    accionesVuelta={props.accionesVuelta}
                    parametrosDeComentario={props.parametrosDeComentario}
                    nombreDelComponenteARelacionar={props.componentes}
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
                <button title="Volver" className="back-button" onClick={volver}>
                    <img src={require('../assets/ruta_de_la_imagen.png').default} width="10" height="10" />
                </button>
                <div className="flexsearchhh">
                    <input
                        id="barraBusqueda"
                        onChange={(e) => setNombreTip(e.target.value)}
                        className="flexsearch--input"
                        onKeyPress={(e) => {
                            e.key === 'Enter' && e.preventDefault();
                        }}
                        type="text"
                        value={nombreTip}
                        placeholder="Buscar tip"
                    />
                    <img src={require('../assets/search-icon.png').default} width="20" height="20" />
                </div>
            </div>
            <div>
                {props.componentes ? (
                    <p id="textoInicial"> Tips para: {props.componentes}</p>
                ) : (
                    <p id="textoInicial">Todos los tips:</p>
                )}
            </div>
            <div className="Listado">
                <div id="mapListado">
                    {tipsAMostrar.map((element) => (
                        <>
                            <li className="listadoDeComponenteElegido">
                                <div id={element.id} className="textoDeAccion" contentEditable="false">
                                    <p id={element.id + 'tip'}>
                                        {' '}
                                        {element.descripcion} <br />
                                        {element.preCondicion != '' ? (
                                            <p>
                                                PRE: {element.preCondicion} <br />{' '}
                                            </p>
                                        ) : (
                                            ''
                                        )}
                                        {element.postCondicion != '' ? (
                                            <p>
                                                POST: {element.postCondicion} <br />{' '}
                                            </p>
                                        ) : (
                                            ''
                                        )}
                                        {props.componenteRelacion ? (
                                            <p>
                                                RELACIÓN: {props.componenteRelacion} <br />
                                            </p>
                                        ) : (
                                            ''
                                        )}
                                        {props.listadoRestricciones ? (
                                            <p>
                                                RESTRICCIÓN: {props.listadoRestricciones} <br />{' '}
                                            </p>
                                        ) : (
                                            ''
                                        )}
                                    </p>
                                </div>
                                <Toaster />
                                <div className="Botoness">
                                    <button
                                        id={element.id + 'botonDeEdicionDeTexto'}
                                        title="Editar tip"
                                        className="BotonesDeAccion"
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
                                        className="BotonesDeAccion"
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
                                        className="BotonesDeAccion"
                                        title="Realizar un comentario con este tip"
                                        onClick={() => {
                                            postear(element.id);
                                        }}
                                    >
                                        <img
                                            src={require('../assets/icono-comentario.png').default}
                                            width="20"
                                            height="20"
                                        />
                                    </button>
                                    <button
                                        id="botonDeRelacion"
                                        title="Relacionar este componente con otros"
                                        className="BotonesDeAccion"
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
                                        className="BotonesDeAccion"
                                        onClick={() => {
                                            agregarRestricciones();
                                        }}
                                    >
                                        <img
                                            src={require('../assets/icono-restringido.png').default}
                                            width="20"
                                            height="20"
                                        />
                                    </button>
                                </div>
                            </li>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ComponenteElegido;
