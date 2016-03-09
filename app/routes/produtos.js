module.exports = function(app) {
	app.get('/produtos', function(req, res) {
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.lista(function(err, results) {
			res.format({
				html: function() {
					res.render('produtos/lista', {lista: results});
				},
				json: function() {
					res.json(results);
				}
			});
		});

		connection.end();
	});	

	app.get('/produtos/form', function(req, res) {
		res.render('produtos/form', {errosValidacao: {}, livro: {}});
	});

	app.post('/produtos', function(req, res) {
		req.assert('titulo', 'O título é obrigatório').notEmpty();

		var livro = req.body;

		var erros = req.validationErrors();
		if (erros) {
			res.render('produtos/form', {errosValidacao: erros, livro:livro});	
			return;
		}

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		
		produtosDAO.salva(livro, function(err, results) {
			res.redirect('/produtos');
		});
	});
}
