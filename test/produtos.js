var express = require('../config/express')();
var request = require('supertest')(express);

describe('#LivrosController', function() {

	beforeEach(function(done) {
		var conn = express.infra.connectionFactory();
		//node-database-cleaner limpa todas as tabelas
		conn.query("delete from livros", function(ex, result) {
			if(!ex) {
				done();
			}
		});
	});

	it('#listagem json', function(done) {
		request.get('/produtos')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});

	it('#cadastro de novo livro com dados invalidos', function(done) {
		request.post('/produtos')
		.type('form')
		.send({titulo: '', descricao: 'novo livro'})
		.expect(400, done);
	});

	it('#cadastro de novo livro com dados validos', function(done) {
		request.post('/produtos')
		.type('form')
		.send({titulo: 'Titulo de um novo livro', descricao: 'novo livro', preco: 50.0})
		.expect(302, done);
	});
});