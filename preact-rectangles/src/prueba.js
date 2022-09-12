"use strict";
figma.showUI(__uiFiles__.main, { width: 320, height: 640, title: "Detector de Smells." });
figma.ui.onmessage = msg => {
    switch (msg.type) {
        case 'salirPlugin':
            figma.closePlugin();
            break;
        case 'ingresarContenido':
            figma.showUI(__uiFiles__.secondary, { width: 320, height: 640, title: "Detector de Smells." });
            break;
        case 'volver':
            figma.showUI(__uiFiles__.main, { width: 320, height: 640, title: "Detector de Smells." });
            break;
    }
};
/*if(msg.type === 'salirPlugin'){
    figma.closePlugin()
}
else {
    if (msg.type === 'ingresarContenido') {
    figma.showUI(__uiFiles__.secondary, {width: 320, height: 640, title:"Detector de Smells."});
    }
    else {
        if (msg.type === 'volver') {
        figma.showUI(__uiFiles__.main, {width: 320, height: 640, title:"Detector de Smells."});
        }

}

}
}*/
