
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import AccionElegida from './AccionElegida';
import data from '../assets/accionesPrueba.json';


declare function require(path: string): any;
export const myFirstContext = React.createContext("");

const App = (props) => {
    let datosAMostrar;
    if(props.palabra != null){
        datosAMostrar = data.filter(accion => accion.tipo.toLowerCase().includes(props.palabra.toLowerCase()));
    }else{
        datosAMostrar = data;
    }

    const accionesNoDuplicadas = [];
    datosAMostrar.forEach(p => {
        if(accionesNoDuplicadas.findIndex(pd => pd.tipo === p.tipo) === -1) {
            accionesNoDuplicadas.push(p);
        }
    });

   /*const accionesNoDuplicadas = sacarDuplicados();

    function sacarDuplicados(){
        const accionesNoDuplicadas = [];
        data.forEach(p => {
            if(accionesNoDuplicadas.findIndex(pd => pd.tipo === p.tipo) === -1) {
                accionesNoDuplicadas.push(p);
            }
        
        })
        return accionesNoDuplicadas
};*/



    const onCancel = () => {
        parent.postMessage({ pluginMessage: { type: 'salirPlugin' } }, '*');
    };

    const irALaAccion = (tipo:string) => {
        <AccionElegida tipo={tipo} libreria={''}/>
        ReactDOM.render(<AccionElegida tipo={tipo} libreria={''} />, document.getElementById('react-page'));
    };

    const buscarAccion = palabra => {   
        <App palabra={palabra.target.value} />
        ReactDOM.render(<App palabra={palabra.target.value}  />, document.getElementById('react-page')); 
    }

    return (
        <div>
            <p id="textoInicial"> Selecciona una acción, le recomendamos copiar dicha accion en un comentario sobre el componente seleccionado</p>

            <div className="flexsearch">
                <div className="flexsearch--wrapper">
                    <form id="barraBusqueda" className="flexsearch--form" action="#" method="post">
                        <div className="flexsearch--input-wrapper">
                            <input id="barraBusqueda" onChange={buscarAccion} className="flexsearch--input" type="search" placeholder="Ingrese una acción..." />
                            <img src={require('../assets/search-icon.png').default } width="20" height="20"/>
                            
                        </div>
                    </form>
                </div>
            </div>

            <hr></hr>

            <div className="Listado">
                <div id="mapListado">
                    {accionesNoDuplicadas.map(element => (
                        <><li>Accion: {element.tipo}
                            <input id="botonIrAAccion" onClick={() => irALaAccion(element.tipo)} className="flexsearch--submit" type="submit" value="&#10140;" />
                        </li></>
                    ))}

                </div>
            </div>
            <hr></hr>
            <button id="salirPlugin" onClick={onCancel}> Salir del plugin</button>
            <script>

            </script>
        </div>
    );
};

export default App;
