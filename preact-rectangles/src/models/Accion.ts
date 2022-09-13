
export default class Accion{
    tipo="";
    descripcion="";
    acciones:Array<Accion>=[];

    accion(tipo:string, descripcion:string) {
        this.tipo = tipo;
        this.descripcion = descripcion;
      }

    getTipo(){
        return this.tipo;
    }

    setTipo(unTipo:string){
        this.tipo=unTipo;
    }

    getDescripcion(){
        return this.descripcion;
    }
    setDescripcion(unaDescripcion:string){
        this.descripcion=unaDescripcion;
    }
    getAcciones(){
        return this.acciones;
    }
   
}



