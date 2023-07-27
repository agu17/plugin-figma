var componentes: string[] = [];
figma.showUI(__html__, {width: 320, height: 450});
figma.ui.onmessage = async (msg) => {
    switch (msg.type) {
        case 'salirPlugin':
            figma.closePlugin();
            break;

        case 'setearToken':
            await setToken(msg.mens);
            break;

        case 'nomenclatura':
            if (figma.currentPage.selection.length == 0) {
                alert('Se deberá seleccionar un componente');
                break;
            }

            var mensaje = [];
            mensaje.push(figma.fileKey);

            var seleccion = figma.currentPage.selection;

            mensaje.push(seleccion[0].id);
            mensaje.push(seleccion[0].x);
            mensaje.push(seleccion[0].y);
            mensaje.push(await getToken());
            mensaje.push(seleccion[0].name);
            for (let componente of seleccion) {
                if (esValido(componente)) {
                    componentes.push(componente.name);
                } else {
                    if (componente.type == 'INSTANCE' || componente.type == 'FRAME' || componente.type == 'GROUP') {
                        for (let componenteHijo of componente.children) {
                            busquedaDeComponentesValidos(componenteHijo);
                        }
                    }
                }
            }

            const componentesSinRepetir = [...new Set(componentes)];
            mensaje.push(componentesSinRepetir);
            figma.ui.postMessage({
                type: 'nomenclatura',
                message: mensaje,
            });
            break;
    }
};

function busquedaDeComponentesValidos(listaDeComponente) {
    if (esValido(listaDeComponente)) {
        componentes.push(listaDeComponente.name);
    } else {
        if (
            listaDeComponente.type == 'INSTANCE' ||
            listaDeComponente.type == 'FRAME' ||
            listaDeComponente.type == 'GROUP'
        ) {
            for (let componenteHijo of listaDeComponente.children) {
                busquedaDeComponentesValidos(componenteHijo);
            }
        }
    }
}

function esValido(componenteAComprobar) {
    if (
        componenteAComprobar.name.toLowerCase().includes('input') ||
        componenteAComprobar.name.toLowerCase().includes('button') ||
        componenteAComprobar.name.toLowerCase().includes('checkbox') ||
        componenteAComprobar.name.toLowerCase().includes('select') ||
        componenteAComprobar.name.toLowerCase().includes('radio') ||
        componenteAComprobar.name.toLowerCase().includes('boton') ||
        componenteAComprobar.name.toLowerCase().includes('link')
    ) {
        return true;
    } else {
        return false;
    }
}

async function setToken(token) {
    try {
        await figma.clientStorage.setAsync('token', token);
    } catch (err) {
        console.log(err);
    }
}

async function getToken() {
    try {
        var i = await figma.clientStorage.getAsync('token');
        return i;
    } catch (err) {
        console.log(err);
    }
}
