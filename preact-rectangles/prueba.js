"use strict";
figma.showUI(__html__);
figma.ui.onmessage = msg => {
    if (msg.type === 'salirPlugin') {
        figma.closePlugin();
    }
};
