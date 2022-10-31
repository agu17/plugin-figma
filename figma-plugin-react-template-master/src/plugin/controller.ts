
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
            
            let componentes: string[] = []
            var seleccion = figma.currentPage.selection;

            mensaje.push(seleccion[0].id);
            mensaje.push(seleccion[0].x);
            mensaje.push(seleccion[0].y);
            mensaje.push(await getToken());

                for(let componente of seleccion){
                    
                    componentes.push(componente.name);
                    if (componente.type == "INSTANCE" || componente.type == "FRAME" || componente.type == "GROUP" ){
                        //if (componente.name == "form" ){
                            for (let componenteHijo of componente.children){
                                if ( componenteHijo.name.toLowerCase().includes("input") || componenteHijo.name.toLowerCase().includes("button")) {
                                    componentes.push(componenteHijo.name)
                                }
                                
                            }
                        //}
                    }
                }

                const myUniqueArray = [...new Set(componentes)]; 
                mensaje.push(myUniqueArray)
                figma.ui.postMessage({
                    type: 'nombreBootstrap',
                    message: mensaje,
                });
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

