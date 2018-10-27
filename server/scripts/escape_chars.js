const htmlspecialchars = require('htmlspecialchars');


module.exports = {

	//Prend les valeurs sortantes de la BD et les escapes
	escape: function(array_to_escape){

		for(let i = 0;i < array_to_escape.length;i++) //Boucle sur le nb de résultats
		{	
			let keys = Object.keys(array_to_escape[i]); 
			
			for(let j = 0;j < keys.length;j++) //Boucle sur chaqu'une des clées
			{
				array_to_escape[i][keys[j]] = htmlspecialchars(array_to_escape[i][keys[j]]);
			}

		}

		return array_to_escape; //Array totalement safe 
		
	}

}