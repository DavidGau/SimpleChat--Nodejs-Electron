const mysql = require("mysql");
const db = require("./db_connection.js");
const uuid4 = require("uuid4");
const pw_hash = require("password-hash");


let server_session = [];

module.exports = {


	//Sert à authentifier l'utilisateur et démarre la session
	connect: function(name,password,socket){

		let sql = "SELECT password FROM User WHERE nickname = ?";
		let filler = [name];

		sql = mysql.format(sql,filler);

		db.query(sql,function(err,result){

			if(!err){

				if(result.length != 0 && pw_hash.verify(password,result[0].password)){ //Bons infos			 	
				 	let id = uuid4();
				 	
				 	server_session.push({
				 		key: id,
				 		nickname: name,
				 		socket_id: socket.id
				 	});

				 	socket.emit("answer",id);
			 	}
			 	else{ //Mauvais infos
			 		socket.emit("answer",false);
			 	}
			}

		});
	},

	//Sert à s'assurer que la clée d'identification fournie par le User est valide
	valid: function(key,socket_id){

		if(uuid4.valid(key)){ //Format valide

			for(let i = 0;i < server_session.length;i++)
			{
				if(server_session[i].key == key){ //Donnée par le serveur
					server_session[i].socket_id = socket_id.split("#")[1]; //Informe le serveur du changement de socket | # pour enlever le Nsp
					return true;
				}
			}
		}

		return false;
	},


	//Contient tout les sessions présentements connectées
	server_session: server_session
}