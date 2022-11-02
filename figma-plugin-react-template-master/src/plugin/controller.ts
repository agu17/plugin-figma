var componentes: string[] = []
figma.showUI(__html__, {width: 320, height: 450});

figma.ui.onmessage = async (msg) => {
    switch(msg.type){
        case 'salirPlugin':
            figma.closePlugin()
            break;

        case 'setearToken':
            await setToken(msg.mens);
            break;
        
        case 'nombreBootstrap':
            
            if(figma.currentPage.selection.length == 0 ){
                alert("Se deberá seleccionar un componente")
            }
            var mensaje = []
            mensaje.push(figma.fileKey);
            
            var seleccion = figma.currentPage.selection;

            mensaje.push(seleccion[0].id);
            mensaje.push(seleccion[0].x);
            mensaje.push(seleccion[0].y);
            mensaje.push(await getToken());
            
                for(let componente of seleccion){
                    if (componente.type == "INSTANCE" || componente.type == "FRAME" || componente.type == "GROUP" ){
                            for (let componenteHijo of componente.children){
                                busquedaDeComponentesValidos(componenteHijo);
                        }
                    }
                    else{
                        if (esValido(componente)){
                        componentes.push(componente.name)
                        }
                    }
                }
                console.log(componentes)
                const myUniqueArray = [...new Set(componentes)]; 
                mensaje.push(myUniqueArray)
                figma.ui.postMessage({
                    type: 'nombreBootstrap',
                    message: mensaje,
                });     
            break;
        }
};

function busquedaDeComponentesValidos(listaDeComponente){
    if ( esValido(listaDeComponente)){
        componentes.push(listaDeComponente.name)
    } 
    else {
        if(listaDeComponente.type == "INSTANCE" || listaDeComponente.type == "FRAME" || listaDeComponente.type == "GROUP"){
            for (let componenteHijo of listaDeComponente.children){
                busquedaDeComponentesValidos(componenteHijo)
            }
        }
    } 
}

function esValido(componenteAComprobar){
    if ( componenteAComprobar.name.toLowerCase().includes("input") || 
        componenteAComprobar.name.toLowerCase().includes("button") ||
        componenteAComprobar.name.toLowerCase().includes("checkbox") || 
        componenteAComprobar.name.toLowerCase().includes("select") || 
        componenteAComprobar.name.toLowerCase().includes("radio")  ){
            return true
        }
    else{
        return false;
    }
}

async function setToken(token)  {
    try{ 
        await figma.clientStorage.setAsync("token", token) ;
    }
    catch (err) {
        console.log(err);
      }
}

async function getToken() {
    try{
        var i = await figma.clientStorage.getAsync("token");
        return i;
    }
    catch (err) {
    console.log(err);
    }
}

