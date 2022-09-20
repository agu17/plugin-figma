
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import AccionElegida from './AccionElegida';
import data from '../assets/accionesPrueba.json';


declare function require(path: string): any;
export const myFirstContext = React.createContext("");

const App = ({}) => {


    const onCancel = () => {
        parent.postMessage({ pluginMessage: { type: 'salirPlugin' } }, '*');
    };

    const irALaAccion = (tipo:string) => {
        <AccionElegida tipo={tipo}/>
        //parent.postMessage({ pluginMessage: { type: tipo } }, '*');
        ReactDOM.render(<AccionElegida tipo={tipo}/>, document.getElementById('react-page'));
    };

    return (
        <div>
            <p id="textoInicial"> Selecciona una acción, le recomendamos copiar dicha accion en un comentario sobre el componente seleccionado</p>

            <div className="flexsearch">
                <div className="flexsearch--wrapper">
                    <form id="barraBusqueda" className="flexsearch--form" action="#" method="post">
                        <div className="flexsearch--input-wrapper">
                            <input id="barraBusqueda" className="flexsearch--input" type="search" placeholder="Ingrese una acción..." />
                            <input id="botonBuscar" className="flexsearch--submit" type="submit" value="&#x2315;" />
                        </div>
                    </form>
                </div>
            </div>

            <hr></hr>

            <div className="Listado">
                <div id="mapListado">
                    {data.map(element => (
                        <><li>Accion: {element.tipo}
                        <input id="botonIrAAccion"onClick={() => irALaAccion(element.tipo)} className="flexsearch--submit" type="submit" value="&#10140;" />
                        </li></>
                    ))}
                    
                </div>
            </div>
            <hr></hr>              
            <button id="salirPlugin" onClick={onCancel}> Salir del plugin</button>
        </div>
    );
};

export default App;
