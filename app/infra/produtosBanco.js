module.exports = function() {
	return function(connection) {
		this.lista = function(callback) {
			connection.query('select * from livros', callback);
		}
		console.log(this);
		return this;
	}
}