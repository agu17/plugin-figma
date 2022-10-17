
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
            else{
                let vec = []
                for(let node of figma.currentPage.selection){
                    vec.push(node.name)
                    alert(node.name)
                    };
                figma.ui.postMessage({
                    type: 'libreria',
                    message: vec,
                });
                /*for(let node of figma.currentPage.selection){
                    figma.ui.postMessage({
                        type: 'libreria',
                        message: node.name,
                    });
                
                }*/
            }
            break;

        case 'accionElegida':
            break;
        }
};
