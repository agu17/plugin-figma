
figma.showUI(__html__, {width: 320, height: 450});

figma.ui.onmessage = async (msg) => {
    switch(msg.type){
        case 'salirPlugin':
            figma.closePlugin()
            break;

        case 'setearToken':
            await setToken(msg.mens);
            let i = await getToken();
            alert("el token es: " + i)
            break;
        
        case 'nombreBootstrap':
            
            if(figma.currentPage.selection.length == 0 ){
                alert("Se deberá seleccionar un componente")

            }
            var mensaje = []
            mensaje.push(figma.fileKey);
            
            let componentes: string[] = []
            var seleccion = figma.currentPage.selection;
            mensaje.push(seleccion[0].id);
            mensaje.push(seleccion[0].x);
            mensaje.push(seleccion[0].y);
               // alert(figma.fileKey)
                for(let componente of seleccion){
                    //alert(componente.x + " y " + componente.y + " y " + componente.id)
                    componentes.push(componente.name);
                    if (componente.type == "INSTANCE"){
                        if (componente.name == "form" ){
                            for (let componenteHijo of componente.children){
                                componentes.push(componenteHijo.name)
                            }
                        }
                    }
                    };
                mensaje.push(componentes)
                figma.ui.postMessage({
                    type: 'nombreBootstrap',
                    message: mensaje,
                });
            break;

        case 'accionElegida':
            break;
        }
};
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

