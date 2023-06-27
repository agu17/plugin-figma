import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import App from './App';
import SinLibreria from './SinLibreria';
import toast, {Toaster} from 'react-hot-toast';

declare function require(path: string): any;
export const myFirstContext = React.createContext('');

const Home = ({}) => {
    const [nombreToken, setNombreToken] = React.useState('');

    React.useEffect(() => {
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'nombreBootstrap') {
                let componentes = message.pop();
                console.log(componentes.length);
                if (componentes.length == 0) {
                    toast.error(
                        'No se encontraron tips que tengan relacion con los nombres de los componentes seleccionados.'
                    );
                } else {
                    ReactDOM.render(
                        <App nombreBootstrap={componentes} parametrosDeComentario={message} />,
                        document.getElementById('react-page')
                    );
                }
            }
        };
    }, []);

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'salirPlugin'}}, '*');
    };

    const conBootstrap = () => {
        parent.postMessage({pluginMessage: {type: 'nombreBootstrap'}}, '*');
    };
    const sinBootstrap = () => {
        ReactDOM.render(<SinLibreria />, document.getElementById('react-page'));
    };

    const setearToken = () => {
        parent.postMessage({pluginMessage: {type: 'setearToken', mens: nombreToken}}, '*');
        toast.success('Se ha guardado el token!');
    };

    return (
        <div>
            <p id="textoInicial">Seleccione el método de utilización del plugin</p>
            <div>
                <button id="botonHome" onClick={conBootstrap}>
                    {' '}
                    Nomenclatura
                </button>
                <button id="botonHome" onClick={sinBootstrap}>
                    {' '}
                    Sin nomenclatura
                </button>
            </div>

            <Toaster />
            <hr></hr>

            <p id="textoDelToken">Ingrese su token personal si no lo has ingresado o si lo deseas cambiar</p>

            <div className="flexsearch--input-wrapper">
                <input
                    id="inputDelToken"
                    placeholder="Ingrese su token"
                    className="inputDelToken"
                    onChange={(e) => setNombreToken(e.target.value)}
                />
                <button id="botonDeAgregarToken" title="Guardar token" onClick={setearToken}>
                    <img src={require('../assets/icono-copiar.png').default} width="15" height="15" />
                </button>
                <Toaster />
            </div>

            <button id="salirPluginHome" className="salirPluginHome" onClick={onCancel}>
                {' '}
                Salir del plugin
            </button>
        </div>
    );
};

export default Home;
