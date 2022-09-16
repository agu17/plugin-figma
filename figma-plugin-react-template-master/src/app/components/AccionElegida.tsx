import * as React from 'react';
import '../styles/ui.css';

declare function require(path: string): any;

const AccionElegida = ({}) => {

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'salirPlugin'}}, '*');
    };

    const volver = () => {
        parent.postMessage({pluginMessage: {type: 'volver'}}, '*');
    };

    const irALaAccion = () => {
        parent.postMessage({pluginMessage:{type:'ingresarContenido'}}, '*');
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

            <ul>
                /* Aca habria que recorrer el vector de variantes /
                <li>Variante1: <input id= "ingresarContenido" className="flexsearch--submit" type="submit" value="&#10140;"/></li>
                <hr></hr>
                <li>Variante2: <input id="click" className="flexsearch--submit" type="submit" value="&#10140;"/></li>
                <hr></hr>
                <li>Variante3: <input id="seleccionarElemento" className="flexsearch--submit" type="submit" value="&#10140;"/></li>
                <hr></hr>
            </ul>

            <button id="salirPlugin"> Salir del plugin</button>
            <button id="volver" onClick={volver}> Volver</button>
        </div>
    );
};

export default AccionElegida;