"use strict";
figma.showUI(__html__, { width: 320, height: 640, title: "Detector de Smells." });
figma.ui.onmessage = msg => {
    if (msg.type === 'salirPlugin') {
        figma.closePlugin();
    }
};
