const {app, Menu, Tray, globalShortcut} = require('electron');
const robot = require('robotjs');


let tray;

function init(){
    console.log('okkk')
    createTrayItem();
    registerShortcuts();
    console.log("ok")
}

function createTrayItem(){
    tray = new Tray('./static/placeholder.png');
    const contextMenu = Menu.buildFromTemplate([
        {label: 'Exit', type: 'normal', click: exit}
    ]);
    tray.setContextMenu(contextMenu);
}

function registerShortcuts(){
    globalShortcut.register('Alt+F10',() => {
        robot.keyTap("audio_prev");
    });

    globalShortcut.register('Alt+F11',() => {
        robot.keyTap("audio_play");
    });

    globalShortcut.register('Alt+F12',() => {
        robot.keyTap("audio_next");
    });
}

function exit(menuItem, browserWindow, event){
    app.exit();
}


app.on('ready', init);