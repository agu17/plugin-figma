import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import data from '../assets/accionesPrueba.json';
import App from './App';


declare function require(path: string): any;

const AccionElegida = (props) =>  {
    let acciones = data;
    


    
    if(props.libreria == '' ){
        acciones = acciones.filter(accion => accion.tipo==props.tipo)
    }
    else{
        acciones = acciones.filter(accion => accion.libreria==props.libreria);
    }
    if(props.palabra != null){
        acciones = acciones.filter(accion => accion.descripcion.toLowerCase().includes(props.palabra.toLowerCase()));
    }

    
    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'salirPlugin'}}, '*');
    };

    const volver = () => {
        ReactDOM.render(<App />, document.getElementById('react-page'));
    };

    const copiarAccion = () => {
        parent.postMessage({pluginMessage:{type:'ingresarContenido'}}, '*');
    };

    const buscarAccion = palabra => {   
        <AccionElegida tipo={props.tipo} libreria={props.libreria} palabra={palabra.target.value} />
        ReactDOM.render(<AccionElegida tipo={props.tipo} libreria={props.libreria} palabra={palabra.target.value}  />, document.getElementById('react-page')); 
    }

    return (
        <div>
            <p id="textoInicial" > Acción: {props.tipo}</p>

            <div className="flexsearch">
                <div className="flexsearch--wrapper">
                    <form id="barraBusqueda" className="flexsearch--form" action="#" method="post">
                        <div className="flexsearch--input-wrapper">
                            <input id="barraBusqueda" onChange={buscarAccion} className="flexsearch--input" type="search" placeholder="Ingrese una variante..." />
                            <img src={require('../assets/search-icon.png').default } width="20" height="20"/>
                        </div>
                    </form>
                </div>
            </div>

            <hr></hr>

            <div className="Listado">
                <div id="mapListado">
                    {acciones.map(element => (
                        <><li>{element.descripcion}<br></br>{element.preCondicion}<br></br>{element.postCondicion}
                            <input id="descripcionAccion" onClick={() => { copiarAccion() }} className="flexsearch--submit" type="submit" value="&#10140;" />
                        </li><hr></hr></>
                    ))}

                </div>
            </div>

            <button id="salirPlugin" onClick={onCancel}> Salir del plugin</button>
            <button id="volver" onClick={volver}> Volver</button>
        </div>
    );
};

export default AccionElegida;