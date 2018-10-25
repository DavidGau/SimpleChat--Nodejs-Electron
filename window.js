process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'; //ENLEVER LORSQU'EN LIGNE
const { app, BrowserWindow } = require('electron');

require('electron-reload')("html/connexion.html"); //À SUPPRIMER APRÈS LE DÉVELOPPEMENT


  function createWindow () {
    win = new BrowserWindow({ width: 400, height: 600 });
   	win.setAlwaysOnTop(true);

    win.loadFile('html/connexion.html');
  }
  
  app.on('ready', createWindow);