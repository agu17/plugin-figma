
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
            let componentes = []
                var selected = figma.currentPage.selection
                console.log(selected)
                for(let node of selected){
                    componentes.push(node.name);
                    if (node.type == "INSTANCE"){
                        if (node.name == "form" || node.name == "input" || node.name== "button"){
                            for (let hijo of node.children){
                                componentes.push(hijo.name)
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
