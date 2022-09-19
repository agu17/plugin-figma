import * as React from 'react';
import '../styles/ui.css';
import data from '../assets/accionesPrueba.json';


declare function require(path: string): any;

const AccionElegida = (props) =>  {

    const acciones = data.filter(accion => accion.tipo==props.tipo);

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'salirPlugin'}}, '*');
    };

    const volver = () => {
        parent.postMessage({pluginMessage: {type: 'volver'}}, '*');
    };

    const copiarAccion = () => {
        parent.postMessage({pluginMessage:{type:'ingresarContenido'}}, '*');
    };

    return (
        <div>
            <p id="textoInicial" > Acción: </p>

            <div className="flexsearch">
                    <div className="flexsearch--wrapper">
                        <form className="flexsearch--form" action="#" method="post">
                            <div className="flexsearch--input-wrapper">
                                <input className="flexsearch--input" type="search" placeholder="Ingrese una variante..."/> 
                                <input className="flexsearch--submit" type="submit" value="Buscar"/>
                            </div>
                        </form>
                    </div>
            </div>

            <hr></hr>

            <div className="Listado">
                <div id="mapListado">
                {acciones.map(element => (
                        <><li>Accion: {element.tipo}<input id={element.tipo} onClick={() =>{copiarAccion()}} className="flexsearch--submit" type="submit" value="&#10140;" />
                        </li><hr></hr></>
                    ))}
                    
                </div>
            </div>

            <button id="salirPlugin"onClick={onCancel}> Salir del plugin</button>
            <button id="volver" onClick={volver}> Volver</button>
        </div>
    );
};

export default AccionElegida;