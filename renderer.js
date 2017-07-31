const {ipcRenderer} = require('electron');

document.getElementById('btn1').addEventListener('click', () => {
    ipcRenderer.send('updateKeyBinds', [
        'audioPrev',
        document.getElementById('prev').value
    ]);
});

document.getElementById('btn2').addEventListener('click', () => {
    ipcRenderer.send('updateKeyBinds', [
        'audioPlay',
        document.getElementById('play').value
    ]);
});

document.getElementById('btn3').addEventListener('click', () => {
    ipcRenderer.send('updateKeyBinds', [
        'audioNext',
        document.getElementById('next').value
    ]);
});
