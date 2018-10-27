const io = require("socket.io")(3000);

//Les scripts
const db = require("./scripts/db_connection.js");
const register = require("./scripts/register.js");
const connection = require("./scripts/connection.js");
const lobby = require("./scripts/lobby.js");
const user = require("./scripts/user.js");

//Les différents namespaces pour les sockets
const register_nsp = io.of("/register");
const connection_nsp = io.of("/connection");
const register_lobby_nsp = io.of("/register_lobby");
const lobby_list_nsp = io.of("/lobby_list");
const in_lobby_nsp = io.of("/in_lobby");


//Timer des session
setInterval(function(){

	for(let i = 0;i < connection.server_session.length;i++)
	{
		if(Object.keys(io.sockets.connected).indexOf(connection.server_session[i].socket_id) < 0) //Socket maintenant inutile
		{	
			connection.server_session.splice(i,1);
		}
	}

	console.log("NB de personnes sur l'app: " + connection.server_session.length);

},10000);

//Namespace pour l'enregistrement de compte
register_nsp.on("connection",function(socket){
	
	//Tente d'enregistrer le User sur demande
	socket.on("register",function(name,password){
		register(name,password,socket);
	});

});

//Namespace pour la connexion à un compte
connection_nsp.on("connection",function(socket){

	//Tente de connecter le User
	socket.on("connection",function(name,password){
		connection.connect(name,password,socket);
	});

});

//Namespace pour la liste des lobby ainsi que pour la création des lobby
lobby_list_nsp.on("connection",function(socket){

	//Recoit la clée de sécurité du client, charge donc les lobby
	socket.on("key",function(key){

		if(connection.valid(key,socket.id)){
			lobby.list(socket);
		}

	});
});

//Namespace pour la création de lobby
register_lobby_nsp.on("connection",function(socket){

	socket.on("key",function(key){ //Sans cela, l'app perd la trace du client lors de la vérif d'authenticité
		connection.valid(key,socket.id);
	});

	//Crée un lobby dans la DB
	socket.on("add_lobby",function(key,name){

		if(connection.valid(key,socket.id)){
			lobby.create(name);
		}

	});

});

//Namespace lorsque dans un lobby
in_lobby_nsp.on("connection",function(socket){
	

	//Change le User de Room
	socket.on("changed_lobby",function(key,lobby_id){
		if(connection.valid(key,socket.id)){
			user.change_lobby(socket,key,lobby_id); //Call async, lobby_id doit être passer en parm des autres fct
			lobby.load_title(socket,lobby_id);
			lobby.load_member(socket,io,lobby_id);
			lobby.load_message(socket,lobby_id);
		}
	});

	//Envoi un message à ceux qui se trouvent dans la même room et sur la DB
	socket.on("send_message",function(key,message){
		if(connection.valid(key,socket.id)){
			user.upload_message(socket,message);
			user.emit_message(io,socket,message);
		}
	});

	//Notifie les membres de la même room lorsque le user se déconnecte
	socket.on("disconnecting",function(){
		lobby.load_member(socket,io);
	});

});
