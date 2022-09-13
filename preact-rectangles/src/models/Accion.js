"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Accion {
    constructor() {
        this.tipo = "";
        this.descripcion = "";
        this.acciones = [];
    }
    accion(tipo, descripcion) {
        this.tipo = tipo;
        this.descripcion = descripcion;
    }
    getTipo() {
        return this.tipo;
    }
    setTipo(unTipo) {
        this.tipo = unTipo;
    }
    getDescripcion() {
        return this.descripcion;
    }
    setDescripcion(unaDescripcion) {
        this.descripcion = unaDescripcion;
    }
    getAcciones() {
        return this.acciones;
    }
}
exports.default = Accion;
