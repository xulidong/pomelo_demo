module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

Handler.prototype.queryEntry = function(msg, session, next) {
	//console.log("luo:", msg, session);
	var connectors = this.app.getServersByType('connector');
	if (!connectors || connectors.length === 0) {
		next(null, {code: 500});
		return;
	}
	var index = parseInt(Math.random() * connectors.length, 10);
	var res = connectors[index];
	next(null, {code: 0, host: res.host, port: res.clientPort});
};

