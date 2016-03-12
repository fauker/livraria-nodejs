var mysql = require('mysql');

function createDBConnection() {
	if(!process.env.NODE_ENV){
		return mysql.createConnection({
				host: 'localhost',
				user: 'root',
				password: 'root',
				database: 'casadocodigo'
			});		
	}

	if(process.env.NODE_ENV == 'test') {
		return mysql.createConnection({
				host: 'localhost',
				user: 'root',
				password: 'root',
				database: 'casadocodigo_test'
			});		
	}
};

module.exports = function() {
	return createDBConnection;
};

