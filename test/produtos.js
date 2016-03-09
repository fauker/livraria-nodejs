var http = require('http');
var assert = require('assert');

describe('#LivrosController', function() {
	it('#listagem json', function(done) {
		var configuracoes = {
			hostname: 'localhost',
			port: 3000,
			path: '/produtos',
			headers: {
				'Accept': 'application/json'
			}
		};
		http.get(configuracoes, function(res) {
			assert.equal(res.statusCode, 200);
			done();
		});
	});
});