
figma.showUI(__html__, {width: 320, height: 450});

figma.ui.onmessage = (msg) => {
    switch(msg.type){
        case 'salirPlugin':
            figma.closePlugin()
            break;
        
        case 'libreria':
            if(figma.currentPage.selection.length == 0 ){
                alert("Se deberá seleccionar un componente")
            }
            let componentes: string[] = []
                var seleccion = figma.currentPage.selection
               // alert(figma.fileKey)
                for(let componente of seleccion){
                    //alert(componente.x + " y " + componente.y + " y " + componente.id)
                    componentes.push(componente.name);
                    if (componente.type == "INSTANCE"){
                        if (componente.name == "form" || componente.name == "input" || componente.name== "button"){
                            for (let componeneteHijo of componente.children){
                                componentes.push(componeneteHijo.name)
                            }
                        }
                    }
                    };
                figma.ui.postMessage({
                    type: 'libreria',
                    message: componentes,
                });
            break;

        case 'accionElegida':
            break;
        }
};
