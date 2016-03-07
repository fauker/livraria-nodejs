module.exports = function(app) {
	app.get('/produtos', function(req, res) {
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.lista(function(err, results) {
			res.render('produtos/lista', {lista: results});
		});

		connection.end();
	});	

	app.get('/produtos/form', function(req, res) {
		res.render('produtos/form');
	});

	app.post('/produtos', function(req, res) {
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		var livro = req.body;
		produtosDAO.salva(livro, function(err, results) {
			res.redirect('/produtos');
		});
	});
}
