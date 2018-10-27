const { app, BrowserWindow } = require('electron');


/*
require('electron-reload')("html/connexion.html"); //À SUPPRIMER APRÈS LE DÉVELOPPEMENT
*/

  function createWindow () {
  	const screen = require("electron").screen;
	const display = screen.getPrimaryDisplay().workAreaSize;

    win = new BrowserWindow({ width: 400, height: 600, frame: false,transparent: true});
   	win.setAlwaysOnTop(true);
   	win.setMenu(null);
   	win.setResizable(false);

   	win.setPosition(display.width - 400,display.height - 600);
    win.loadFile('html/connexion.html');
  }
  
  app.on('ready', createWindow);
