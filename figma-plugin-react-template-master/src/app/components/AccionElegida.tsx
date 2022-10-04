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

    const editarTexto = (i: string) => {
        let textoAEditar = document.getElementById(i);
        if (textoAEditar.isContentEditable){
            textoAEditar.contentEditable = "false";
            textoAEditar.style.backgroundColor = '#7572E7';
        }
        else{
            textoAEditar.contentEditable = "true";
            textoAEditar.style.backgroundColor = '#C5C5C5'; 
        }
       
    };
    
    const copiarAccion = async(desc:string, pre:string, post:string) => {
        try{
            var a = new Clipboard();
            var text = desc + pre + post;
            a.writeText(text);
            alert("Si se copio")
        }
        catch{
            alert("No se copio")
        }
}
    

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
                        <><li>
                            <div id={element.id} className='textoDeAccion' contentEditable="false">
                               <p id='descripcion' > {element.descripcion} </p> 
                               <p id='precondicion'> {element.preCondicion} </p> 
                               <p id='postcondicion'> {element.postCondicion} </p> 
                            </div>
                            <button id="botonDeEdicionDeTexto" onClick={() => { editarTexto(element.id) }}  >
                                <img   src={require('../assets/edit-button.png').default } width="20" height="20" />
                            </button>
                            <button id="botonDeCopiarAccion" onClick={() =>  { copiarAccion(element.id, element.preCondicion, element.postCondicion) }}>
                                <img   src={require('../assets/icono-copiar.png').default } width="20" height="20" />
                            </button>
                            
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