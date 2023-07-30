import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../styles/ui.css';
import App from './App';
import toast, {Toaster} from 'react-hot-toast';
import SinNomenclatura from './SinNomenclatura';

declare function require(path: string): any;
export const myFirstContext = React.createContext('');

const Home = ({}) => {
    const [nombreToken, setNombreToken] = React.useState('');

    React.useEffect(() => {
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'nomenclatura') {
                let componentes = message.pop();
                console.log(componentes.length);
                if (componentes.length == 0) {
                    toast.error(
                        'No se encontraron tips que tengan relacion con los nombres de los componentes seleccionados.'
                    );
                } else {
                    ReactDOM.render(
                        <App componentes={componentes} parametrosDeComentario={message} />,
                        document.getElementById('react-page')
                    );
                }
            }
        };
    }, []);

    const onCancel = () => {
        parent.postMessage({pluginMessage: {type: 'salirPlugin'}}, '*');
    };

    const conNomenclatura = () => {
        parent.postMessage({pluginMessage: {type: 'nomenclatura'}}, '*');
    };
    const sinNomenclatura = () => {
        ReactDOM.render(<SinNomenclatura />, document.getElementById('react-page'));
    };

    const setearToken = () => {
        parent.postMessage({pluginMessage: {type: 'setearToken', mens: nombreToken}}, '*');
        toast.success('Se ha guardado el token!');
    };

    return (
        <div>
            <p id="textoHome">Seleccione el método de utilización del plugin</p>
            <div>
                <button id="botonHome" className="botonHome" onClick={conNomenclatura}>
                    {' '}
                    Nomenclatura
                </button>
                <button id="botonHome" className="botonHome" onClick={sinNomenclatura}>
                    {' '}
                    Sin nomenclatura
                </button>
            </div>

            <Toaster />

            <div className="divInpToken">
            <hr></hr>
                <p id="textoDelToken" className="textoDelToken">Ingrese su token personal si no lo has ingresado o si lo deseas renovar</p>
                <input
                    id="inputDelToken"
                    placeholder="Token"
                    className="inputDelToken"
                    onChange={(e) => setNombreToken(e.target.value)}
                />
                <button id="botonDeAgregarToken" title="Guardar token" onClick={setearToken} className="botonDeAgregarToken">
                    <img src={require('../assets/guardar.png').default} width="15" height="15" />
                </button>
                <Toaster />
            </div>
        </div>
    );
};

export default Home;
