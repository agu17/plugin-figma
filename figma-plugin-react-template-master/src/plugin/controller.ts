
figma.showUI(__html__, {width: 320, height: 450});

figma.ui.onmessage = (msg) => {
    switch(msg.type){
        case 'salirPlugin':
            figma.closePlugin()
            break;
        
        case 'libreria':
            let nombreNodo;
            for(let node of figma.currentPage.selection){
                nombreNodo = node.name;
            }
            alert(nombreNodo);
                figma.ui.postMessage({
                    type: 'libreria',
                    message: nombreNodo,
                });
            
            break;

        case 'accionElegida':
            break;
        }
};
