figma.showUI(__html__, {width: 320, height: 450});

figma.ui.onmessage = (msg) => {
    switch(msg.type){
        case 'salirPlugin':
            figma.closePlugin()
            break;
        
        case 'volver':
            //figma.showUI(__html__, {width: 320, height: 450});
            break;

        //acciones

        case 'accionElegida':
            break;
        }
};
