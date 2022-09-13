"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const acciones_json_1 = __importDefault(require("./acciones.json"));
const Accion_js_1 = __importDefault(require("./models/Accion.js"));
let accioness = generarAcciones();
/*figma.ui.postMessage(accioness);*/
figma.showUI(__uiFiles__.main, { width: 320, height: 640, title: "Detector de Smells." });
figma.ui.onmessage = msg => {
    switch (msg.type) {
        case 'salirPlugin':
            figma.closePlugin();
            break;
        case 'ingresarContenido':
            figma.showUI(__uiFiles__.secondary, { width: 320, height: 640, title: "Detector de Smells." });
            break;
        case 'volver':
            figma.showUI(__uiFiles__.main, { width: 320, height: 640, title: "Detector de Smells." });
            break;
    }
};
function generarAcciones() {
    let acc = [];
    acciones_json_1.default.forEach(function (value) {
        let accion = new Accion_js_1.default();
        accion.setDescripcion(JSON.parse(value.descripcion));
        accion.setTipo(JSON.parse(value.tipo));
        acc.push(accion);
    });
    return acc;
    /*let acc=[];
    let ingresarContenido= new Accion();
    ingresarContenido.setTipo("ingresarContenido");

    let ingresarContenidoSesion= new Accion();
    ingresarContenidoSesion.setTipo("ingresarContenido");
    ingresarContenidoSesion.setDescripcion("Inicio de sesión Pre: Estar situado en el campo email/usuario y llenarlo.Post: Se habilitará el botón contraseña.");
    ingresarContenido.getAcciones().push(ingresarContenidoSesion);

    let ingresarContenidoTarjeta= new Accion();
    ingresarContenidoTarjeta.setTipo("ingresarContenido");
    ingresarContenidoTarjeta.setDescripcion("Llenar campos de tarjeta: Pre:  Solo se permitirá ingresar números, Longitud de 16 caracteres.Post: Se habilitará el siguiente campo cuando se ingresen los 16 caracteres.");
    ingresarContenido.getAcciones().push(ingresarContenidoTarjeta);
    acc.push(ingresarContenido);

    //click
    let click= new Accion();
    click.setTipo("click");

    let clickRegistro= new Accion();
    clickRegistro.setTipo("click");
    clickRegistro.setDescripcion("Registrarse: Pre: Se deberá haber llenado los campos anteriores, se habilita el botón registrarsePost: Se registra al usuario, si la carga es lenta, se deberá agregar una barra de progreso.");
    click.getAcciones().push(ingresarContenidoSesion);
    acc.push(click);
    return acc;*/
}
