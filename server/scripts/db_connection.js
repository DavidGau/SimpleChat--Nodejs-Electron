const mysql = require("mysql");


const db_con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "simple_chat"
});

db_con.connect(function(err){
		console.log("Erreur: " + err);
});

module.exports = db_con;