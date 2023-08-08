import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import ComponenteElegido from './ComponenteElegido';
import data from '../assets/accionesPrueba.json';
import Home from './home';

declare function require(path: string): any;
export const myFirstContext = React.createContext('');

const SinNomenclatura = () => {
    const [acciones, setAcciones] = React.useState([]);
    const [nombreAccion, setNombreAccion] = React.useState('');
    const [accionesAMostrar, setAccionesAMostrar] = React.useState([]);

    React.useEffect(() => {
        let accionesNoDuplicadas = [];
        data.forEach((p) => {
            if (accionesNoDuplicadas.findIndex((pd) => pd.tipo === p.tipo) === -1) {
                accionesNoDuplicadas.push(p);
            }
        });
        setAcciones(accionesNoDuplicadas);
    }, []);

    React.useEffect(() => setAccionesAMostrar(acciones), [acciones]);

    React.useEffect(
        () =>
            setAccionesAMostrar(
                acciones.filter((accion) => accion.tipo.toLowerCase().includes(nombreAccion.toLowerCase()))
            ),
        [nombreAccion]
    );

    const irALaAccion = (tipo: string) => {
        <ComponenteElegido tipo={tipo} componentes={''} accionesVuelta={''} parametrosDeComentario={''} />;
        ReactDOM.render(
            <ComponenteElegido tipo={tipo} componentes={''} accionesVuelta={''} parametrosDeComentario={''} />,
            document.getElementById('react-page')
        );
    };
    const volver = () => {
        ReactDOM.render(<Home />, document.getElementById('react-page'));
    };

    return (
        <div>
            <div>
                <button title="Volver" className="back-button" onClick={volver}>
                    <img src={require('../assets/ruta_de_la_imagen.png').default} width="10" height="10" />
                </button>

                <div className="flexsearchhh">
                    <input
                        id="barraBusqueda"
                        onChange={(e) => setNombreAccion(e.target.value)}
                        className="flexsearch--input"
                        onKeyPress={(e) => {
                            e.key === 'Enter' && e.preventDefault();
                        }}
                        type="text"
                        value={nombreAccion}
                        placeholder="Buscar"
                    />
                    <img src={require('../assets/search-icon.png').default} width="18" height="18" />
                </div>
            </div>
            <p id="textoInicial">
                {' '}
                Seleccione una acción <br />
            </p>
            <div className="Listado">
                <div id="mapListadoo">
                    {accionesAMostrar.map((element) => (
                        <>
                            <li onClick={() => irALaAccion(element.tipo)}>
                                Acción: {element.tipo}
                                <img src={require('../assets/flecha-correcta.png').default} width="15" height="15" />
                            </li>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SinNomenclatura;
