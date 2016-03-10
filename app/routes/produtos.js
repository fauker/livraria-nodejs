module.exports = function(app) {
	app.get('/produtos', function(req, res, next) {
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.lista(function(err, results) {
			if (err) {
				return next(err);
			}
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
			res.format({
				html: function() {
					res.status(400).render('produtos/form', {errosValidacao: erros, livro: {}});
				},
				json: function() {
					res.status(400).json(erros);
				}
			});			
			return;
		}

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		
		produtosDAO.salva(livro, function(err, results) {
			res.redirect('/produtos');
		});
	});
}
