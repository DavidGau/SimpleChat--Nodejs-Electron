const pw_hash = require("password-hash");
const mysql = require("mysql");
const db = require("./db_connection.js");

//Enregistrement des Users
module.exports = function(name,password,socket){

	let hash = pw_hash.generate(password);

	let sql = "SELECT Id FROM User WHERE nickname = ?";
	let filler = [name];

	sql = mysql.format(sql,filler);

	db.query(sql,function(err,result){

		if(result.length == 0){ //Le pseudo n'existe pas donc ajout

			sql = "INSERT INTO User VALUES (DEFAULT,?,?)";
			filler = [name,hash];
			sql = mysql.format(sql,filler);

			db.query(sql,function(err,result){console.log(err);});
			
			if(!err){
				socket.emit("registered",true);
			}
			
		}
		else{
			socket.emit("registered",false);
		}

	});

}