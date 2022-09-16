figma.showUI(__html__, {width: 320, height: 640});

figma.ui.onmessage = (msg) => {
    switch(msg.type){
        case 'salirPlugin':
            figma.closePlugin()
            break;
        
        case 'volver':
            figma.showUI(__html__, {width: 320, height: 640});
            break;

        //acciones
        
        case 'ingresarContenido':
            
            break;


        case 'accionElegida':
            break;1
        }
};
