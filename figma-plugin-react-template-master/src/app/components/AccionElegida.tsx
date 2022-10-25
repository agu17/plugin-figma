import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import data from '../assets/accionesPrueba.json';
import App from './App';
import SinLibreria from './sinLibreria';


declare function require(path: string): any;

const AccionElegida = (props) =>  {
    const acciones = data;
    const [nombreAccion,setNombreAccion] = React.useState("");
    const [accionesAMostrar, setAccionesAMostrar] = React.useState([]); 

    const fileKey = props.parametrosDeComentario[0];
    const idNodo = props.parametrosDeComentario[1];
    const posX = props.parametrosDeComentario[2];
    const posY = props.parametrosDeComentario[3];
    const token = props.parametrosDeComentario[4];
    var comentario:string;

    React.useEffect(() => {
        let nombreComponente = props.nombreBootstrap;
        let acc = [];
        if(props.nombreBootstrap == '' ){
            acc = acciones.filter(accion => accion.tipo==props.tipo)
        }
        else{ 
            acc = acciones.filter(accion => nombreComponente.includes(accion.nombreBootstrap));
            
        }
        setAccionesAMostrar(acc);
    }, []);
    
    
    //FILTRADO SOLO POR DESCRIPCION
    React.useEffect(() =>{    
        if (nombreAccion != ""){
            setAccionesAMostrar(accionesAMostrar.filter(accion => accion.descripcion.toLowerCase().includes(nombreAccion.toLowerCase() ) ) ) }
        else{
            let nombreComponente = props.nombreBootstrap;
            setAccionesAMostrar(acciones.filter(accion => nombreComponente.includes(accion.nombreBootstrap)));
        }
        [nombreAccion]}
    );

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'salirPlugin'}}, '*');
    };

    const volver = () => {
        if(props.nombreBootstrap === ''){
            ReactDOM.render(<SinLibreria />, document.getElementById('react-page'));
            
        }
        else {
            ReactDOM.render(<App tipo = {nombreAccion} nombreBootstrap={props.accionesVuelta} parametrosDeComentario={props.parametrosDeComentario}/>, document.getElementById('react-page'));
        }
        
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
        copyTextarea.style.opacity = "0";
        //let pre = document.getElementById(id + "precondicion").innerHTML;
       // let post = document.getElementById(id + "postcondicion").innerHTML;
        let tip = document.getElementById(id + "tip").innerHTML;
        tip = tip.replace('<br><br>', '\n' );
        tip = tip.replace('<br><br>', '\n' );
        copyTextarea.textContent = tip;
        document.body.appendChild(copyTextarea);
        copyTextarea.select();
        document.execCommand("copy");
        document.body.removeChild(copyTextarea);
    }

    const postear = async(id:string) => {
        let tip = document.getElementById(id + "tip").innerHTML;
        tip = tip.replace('<br><br>', '\n' );
        tip = tip.replace('<br><br>', '\n' );
        comentario = tip;
        var myHeaders = new Headers();
        myHeaders.append("X-FIGMA-TOKEN", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "message": comentario,
            "client_meta": {
                "node_id": idNodo,
                "node_offset": {
                "x": posX,
                "y": posY
                }
            }
        });

        var requestOptions:RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://api.figma.com/v1/files/"+ fileKey +"/comments", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
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
                               <p id={element.id + 'tip'} > {element.descripcion} <br/><br/> {element.preCondicion} <br/><br/> {element.postCondicion} </p> 
                            </div>
                            <div className="Bottones">
                                <button id={element.id + "botonDeEdicionDeTexto"} className="botonDeEdicionDeTexto" onClick={() => { editarTexto(element.id) }}  >
                                    <img   src={require('../assets/edit-button.png').default } width="20" height="20" />
                                </button>
                                <button id="botonDeCopiarAccion" onClick={() =>  { copiarAccion(element.id) }}>
                                    <img   src={require('../assets/icono-copiar.png').default } width="20" height="20" />
                                </button>
                                <button id="botonDepost" className="botonDepost" onClick={() =>  { postear(element.id) }}>
                                    <img   src={require('../assets/comentario.png').default } width="20" height="20" />
                                </button>
                            </div>
                            
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