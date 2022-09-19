import React, { Component } from 'react';
//import * as React from 'react';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import AccionElegida from './AccionElegida';
import data from '../assets/accionesPrueba.json';


declare function require(path: string): any;
export const myFirstContext = React.createContext("");

const App = ({}) => {

    //const [accion, setAccion]= useState('');

  

    const onCancel = () => {
        parent.postMessage({ pluginMessage: { type: 'salirPlugin' } }, '*');
    };

    const irALaAccion = (tipo:string) => {
        /*<myFirstContext.Provider value={tipo}>
          <AccionElegida/>
        </myFirstContext.Provider>*/
        //setAccion(tipo);
        <AccionElegida tipo={tipo}/>
        //parent.postMessage({pluginMessage:{type: tipo}}, '*');
        ReactDOM.render(<AccionElegida tipo={tipo}/>, document.getElementById('react-page'));
    };

    return (
        <div>
            <p id="textoInicial"> Selecciona una acción, le recomendamos copiar dicha accion en un comentario sobre el componente seleccionado</p>

            <div className="flexsearch">
                <div className="flexsearch--wrapper">
                    <form className="flexsearch--form" action="#" method="post">
                        <div className="flexsearch--input-wrapper">
                            <input className="flexsearch--input" type="search" placeholder="Ingrese una acción..." />
                            <input className="flexsearch--submit" type="submit" value="Buscar" />
                        </div>
                    </form>
                </div>
            </div>

            <hr></hr>

            <div className="Listado">
                <div id="mapListado">
                    {data.map(element => (
                        <><li>Accion: {element.tipo}<input id={element.tipo} onClick={() => irALaAccion(element.tipo)} className="flexsearch--submit" type="submit" value="&#10140;" />
                        </li><hr></hr></>
                    ))}
                    
                </div>
            </div>

            <button id="salirPlugin" onClick={onCancel}> Salir del plugin</button>
        </div>
    );
};

export default App;
