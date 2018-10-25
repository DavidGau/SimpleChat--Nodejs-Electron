const mysql = require("mysql");
const db = require("./db_connection.js");

module.exports = {

	//Liste tout les lobby
	list: function(socket){

		let sql = "SELECT * FROM Lobby";

		db.query(sql,function(err,result){
			if(!err){
				socket.emit("list",result);
			}
		});
	},

	//Crée un nouveau lobby
	create: function(name){

		let sql = "INSERT INTO Lobby (name) VALUES (?)";
		let filler = [name];

		sql = mysql.format(sql,filler);

		db.query(sql,function(err){
			//Traiter les erreurs ici
		});
	},

	//Charge le titre d'un lobby
	load_title: function(socket,lobby_id){

		let sql = "SELECT Name FROM Lobby WHERE Id = ?";
		let filler = [lobby_id];
		sql = mysql.format(sql,filler);

		db.query(sql,function(err,result){
			if(!err){
				socket.emit("title",result);
			}
		});
	},

	//Charge les messages d'un lobby
	load_message: function(socket,lobby_id){

		let sql = "SELECT User.nickname,Message.message FROM Message INNER JOIN User ON Message.Id_user = User.Id WHERE Message.Id_lobby = ?";
		let filler = [lobby_id];
		sql = mysql.format(sql,filler);

		db.query(sql,function(err,result){
			if(!err){
				socket.emit("message",result);
			}
		});
	},

	//Charge les membres connectés à un lobby
	load_member: function(socket,io,id_room=false){

		if(!id_room){ //Si on ne passe pas d'argument, c'est qu'on le connait donc déconnexion proche
			id_room = Object.keys(socket.rooms)[0];
			socket.leave(id_room);						//Si bug du user qui ne se déco pas, il faudra utiliser un callback ici car ASYNC
		}

		let room_sockets = io.nsps["/in_lobby"].adapter.rooms[id_room];

		if(room_sockets != undefined) //La room n'est pas vide
		{
			room_sockets = Object.keys(room_sockets.sockets);
			let member_list = [];

			for(let i = 0; i < room_sockets.length;i++)
			{	
				let nickname = io.nsps["/in_lobby"].connected[room_sockets[i]].nickname;
				member_list.push(nickname);
			}
			
			io.of("/in_lobby").to(id_room).emit("member_list",member_list);
		}
	}
}	