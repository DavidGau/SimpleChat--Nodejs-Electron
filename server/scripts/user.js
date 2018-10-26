const connection = require("./connection.js");
const mysql = require("mysql");
const db = require("./db_connection.js");

module.exports = {

	//Fait changer le User de room et set son Nickname dans le socket
	change_lobby: function(socket,key,lobby_id){

		socket.join(lobby_id);

		for(let i =0;i < connection.server_session.length;i++)
		{
			if(connection.server_session[i].key == key){
				socket.nickname = connection.server_session[i].nickname;
				return;
			}
		}

	},

	//Envoi le message du User sur la base de donnée
	upload_message: function(socket,message){

		let client_lobby = Object.keys(socket.rooms)[0];
		let client_name = socket.nickname;

		let sql = "INSERT INTO Message (Id_lobby,Id_user,Message) VALUES (?,(SELECT Id FROM User WHERE nickname = ?),?)";
		let filler = [client_lobby,client_name,message];
		
		sql = mysql.format(sql,filler);

		db.query(sql,function(err){
			console.log(err);
		});
	},

	//Envoi le message à tout les membres de la même room que le User
	emit_message: function(io,socket,message){

		let client_room = Object.keys(socket.rooms)[0];
		let client_name = socket.nickname;

		socket.broadcast.to(client_room).emit("message",[{nickname: client_name,message: message}]);

		console.log("emittitng message");
	}

}