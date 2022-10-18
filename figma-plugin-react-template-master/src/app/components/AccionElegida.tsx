import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import data from '../assets/accionesPrueba.json';
import App from './App';


declare function require(path: string): any;

const AccionElegida = (props) =>  {
    const acciones = data;

    const [nombreAccion,setNombreAccion] = React.useState("");
    const [accionesAMostrar, setAccionesAMostrar] = React.useState([]); 

    React.useEffect(() => {
        let acc = [];
        if(props.libreria == '' ){
            acc = acciones.filter(accion => accion.tipo==props.tipo)
        }
        else{
           acc = acciones.filter(accion => accion.libreria==props.libreria);
        }
        setAccionesAMostrar(acc);
    }, []);
    
    
    //FILTRADO SOLO POR DESCRIPCION
    React.useEffect(() =>{    
        if (nombreAccion != ""){
            setAccionesAMostrar(accionesAMostrar.filter(accion => accion.descripcion.toLowerCase().includes(nombreAccion.toLowerCase() ) ) ) }
        else{
            setAccionesAMostrar(acciones.filter(accion => accion.tipo==props.tipo))
        }
        [nombreAccion]}
    );

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'salirPlugin'}}, '*');
    };

    const volver = () => {
        ReactDOM.render(<App />, document.getElementById('react-page'));
    };

    const editarTexto = (i: string) => {
        let textoAEditar = document.getElementById(i);
        let colorBoton = document.getElementById(i + "botonDeEdicionDeTexto");
        if (textoAEditar.isContentEditable){
            textoAEditar.contentEditable = "false";
            textoAEditar.style.backgroundColor = '#7572E7';
            colorBoton.style.backgroundColor = '#E4E4E4';
        }
        else{
            textoAEditar.contentEditable = "true";
            textoAEditar.style.backgroundColor = '#C5C5C5'; 
            colorBoton.style.backgroundColor = '#F37A7A';
        }
    }
    
    const copiarAccion = async(id:string) => {

        var copyTextarea = document.createElement("textarea");
        copyTextarea.style.position = "fixed";
        //copyTextarea.style.position = "fixed";
        copyTextarea.style.opacity = "0";
        let pre = document.getElementById(id + "precondicion").innerHTML;
        let post = document.getElementById(id + "postcondicion").innerHTML;
        copyTextarea.textContent = pre + post;
        document.body.appendChild(copyTextarea);
        copyTextarea.select();
        document.execCommand("copy");
        document.body.removeChild(copyTextarea);
      
    }
    
    return (
        <div>
            <p id="textoInicial" > Acción: {props.tipo}</p>

            <div className="flexsearch">
                <div className="flexsearch--wrapper">
                    <form id="barraBusqueda" className="flexsearch--form" >
                        <div className="flexsearch--input-wrapper">
                            <input id="barraBusqueda" onChange={(e) => setNombreAccion(e.target.value)} className="flexsearch--input" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} type="search" placeholder="Ingrese una variante..." />
                            <img src={require('../assets/search-icon.png').default } width="20" height="20"/>
                        </div>
                    </form>
                </div>
            </div>

            <hr></hr>

            <div className="Listado">
                <div id="mapListado">
                    {accionesAMostrar.map(element => (
                        <><li>
                            <div id={element.id} className='textoDeAccion' contentEditable="false">
                               <p id={element.id + 'descripcion'} > {element.descripcion} </p> 
                               <p id={element.id + 'precondicion'} > {element.preCondicion} </p> 
                               <p id={element.id + 'postcondicion'} > {element.postCondicion} </p>
                               
                            </div>
                            <button id={element.id + "botonDeEdicionDeTexto"} className="botonDeEdicionDeTexto" onClick={() => { editarTexto(element.id) }}  >
                                <img   src={require('../assets/edit-button.png').default } width="20" height="20" />
                            </button>
                            <button id="botonDeCopiarAccion" onClick={() =>  { copiarAccion(element.id) }}>
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