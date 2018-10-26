process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'; //ENLEVER LORSQU'EN LIGNE
const { app, BrowserWindow } = require('electron');

require('electron-reload')("html/connexion.html"); //À SUPPRIMER APRÈS LE DÉVELOPPEMENT
require('electron-reload')("html/create_lobby.html"); //À SUPPRIMER APRÈS LE DÉVELOPPEMENT
require('electron-reload')("html/enregistrement.html"); //À SUPPRIMER APRÈS LE DÉVELOPPEMENT
require('electron-reload')("html/in_lobby.html"); //À SUPPRIMER APRÈS LE DÉVELOPPEMENT
require('electron-reload')("html/lobby_list.html"); //À SUPPRIMER APRÈS LE DÉVELOPPEMENT
require('electron-reload')("css/style_connexion.css"); //À SUPPRIMER APRÈS LE DÉVELOPPEMENT
require('electron-reload')("css/style_lobby_list.css"); //À SUPPRIMER APRÈS LE DÉVELOPPEMENT
require('electron-reload')("css/style_header_footer.css"); //À SUPPRIMER APRÈS LE DÉVELOPPEMENT
require('electron-reload')("css/style_form.css"); //À SUPPRIMER APRÈS LE DÉVELOPPEMENT
require('electron-reload')("css/style_enregistrement.css"); //À SUPPRIMER APRÈS LE DÉVELOPPEMENT
require('electron-reload')("css/style_in_lobby.css"); //À SUPPRIMER APRÈS LE DÉVELOPPEMENT

  function createWindow () {
    win = new BrowserWindow({ width: 400, height: 600 });
   	win.setAlwaysOnTop(true);

    win.loadFile('html/connexion.html');
  }
  
  app.on('ready', createWindow);