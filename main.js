const {app, Menu, Tray, globalShortcut, ipcMain, BrowserWindow} = require('electron');
const robot = require('robotjs');
const Settings = require('./utils/Settings.js');
const path = require('path');


const prefs = new Settings({
    configName: 'prefs',
    defaults: {
        audioPrev: 'Alt+F10',
        audioPlay: 'Alt+F11',
        audioNext: 'Alt+F12'
    }
});

let tray;
let settingsWindow;

function init(){
    createTrayItem();
    registerShortcuts();
    createSettingsWindow();
}

function createTrayItem(){
    tray = new Tray('./static/placeholder.png');
    const contextMenu = Menu.buildFromTemplate([
        {label: 'Settings', type: 'normal', click: (menuItem, browserWindow, event) => {
            if(settingsWindow.isVisible()){
                settingsWindow.hide();
            }else{
                settingsWindow.show();
            }
        }},
        {label: 'Exit', type: 'normal', click: (menuItem, browserWindow, event) => {
            app.exit();
        }}
    ]);
    tray.setContextMenu(contextMenu);
}

function registerShortcuts(){
    globalShortcut.register(prefs.get('audioPrev'),() => {
        robot.keyTap('audio_prev');
    });

    globalShortcut.register(prefs.get('audioPlay'),() => {
        robot.keyTap('audio_play');
    });

    globalShortcut.register(prefs.get('audioNext'),() => {
        robot.keyTap('audio_next');
    });

//    console.log(globalShortcut.isRegistered(prefs.get('audioPrev')))
//    console.log(globalShortcut.isRegistered(prefs.get('audioPlay')))
//    console.log(globalShortcut.isRegistered(prefs.get('audioNext')))
}

function createSettingsWindow(){
    settingsWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false
    });
    settingsWindow.loadURL('file://' + path.join(__dirname, 'static', 'settingsPage.html'));
 
    settingsWindow.on('close', (e) => {
        settingsWindow.hide();
        e.preventDefault();
    });
}

ipcMain.on('updateKeyBinds', (event, args) => {
    prefs.set(args[0], args[1]);
    globalShortcut.unregisterAll();
    registerShortcuts();
});


app.on('ready', init);

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});