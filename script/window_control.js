var remote = require('electron').remote;  //Permet d'accéder au main process de Electron

//Les boutons
let btn_min = document.getElementById("btn_min");
let btn_close = document.getElementById("btn_close");


//Minimiser l'app
btn_min.addEventListener("click",function(){

	let main_window = remote.getCurrentWindow();
	main_window.minimize();

},false);

//Fermer l'app
btn_close.addEventListener("click",function(){
	
	let main_window = remote.getCurrentWindow();
	main_window.close();

},false);