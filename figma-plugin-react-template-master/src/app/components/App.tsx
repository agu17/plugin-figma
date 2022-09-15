import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import AccionElegida from './AccionElegida';

declare function require(path: string): any;

const App = ({}) => {

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'salirPlugin'}}, '*');
    };

    const irALaAccion = () => {
        //parent.postMessage({pluginMessage:{type:'ingresarContenido'}}, '*');
        ReactDOM.render(<AccionElegida />, document.getElementById('react-page'));
    };

    React.useEffect(() => {
        // This is how we read messages sent from the plugin controller
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'create-rectangles') {
                console.log(`Figma Says: ${message}`);
            }
        };
    }, []);

    return (
        <div>
            <p id="textoInicial"> Selecciona una acción, le recomendamos copiar dicha accion en un comentario sobre el componente seleccionado</p>

            <div className="flexsearch">
                <div className="flexsearch--wrapper">
                    <form className="flexsearch--form" action="#" method="post">
                        <div className="flexsearch--input-wrapper">
                            <input className="flexsearch--input" type="search" placeholder="Ingrese una acción..."/> 
                            <input className="flexsearch--submit" type="submit" value="Buscar" />
                        </div>
                    </form>
                </div>
            </div>

            <hr></hr>

            <ul id="lista">

                <li>Acción:Ingresar Contenido<input id="ingresarContenido" onClick={irALaAccion} className="flexsearch--submit" type="submit" value="&#10140;" /></li>
                <hr></hr>
                <li>Acción: Click en botón de acción<input id="click" onClick={irALaAccion} className="flexsearch--submit" type="submit" value="&#10140;" /></li>
                <hr></hr>
                <li>Acción: Seleccionar Elemento<input id="seleccionarElemento" onClick={irALaAccion} className="flexsearch--submit" type="submit" value="&#10140;" /></li>
                <hr></hr>
            </ul>

            <button id="salirPlugin" onClick={onCancel}> Salir del plugin</button>
        </div>
    );
};

export default App;
