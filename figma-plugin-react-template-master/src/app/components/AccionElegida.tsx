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
            <p id="textoInicial" > Acción: {acciones[0].tipo}</p>

            <div className="flexsearch">
                    <div className="flexsearch--wrapper">
                        <form id="barraBusqueda" className="flexsearch--form" action="#" method="post">
                            <div className="flexsearch--input-wrapper">
                                <input id="barraBusqueda" className="flexsearch--input" type="search" placeholder="Ingrese una variante..."/> 
                                <input id="botonBuscar" className="flexsearch--submit" type="submit" value="&#x2315;"/>
                            </div>
                        </form>
                    </div>
            </div>

            <hr></hr>

            <div className="Listado">
                <div id="mapListado">
                {acciones.map(element => (
                        <><li>{element.descripcion}
                        <input id="descripcionAccion" onClick={() =>{copiarAccion()}} className="flexsearch--submit" type="submit" value="&#10140;" />
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