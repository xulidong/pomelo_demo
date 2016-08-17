var async = require('async');
var logger = require('pomelo-logger').getLogger(__filename);

module.exports = function(app) {
	return new Handler(app);
};

var Handler = function(app) {
	this.app = app;
};

Handler.prototype.login = function(msg, session, next) {
	console.log('login')
	var uid, self = this;
	async.waterfall([
			function(cb) {
				self.app.rpc.auth.authRemote.auth(session, msg, cb);
			}, function(id, cb) {
				if (id === null) {
					next(null, {code: 500});
					return;
				}
				uid = id;
				self.app.get('sessionService').kick(uid, cb);
			}, function(cb) {
				session.bind(uid, cb);
			}, function(cb) {
				var areaServers = self.app.getServersByType('area');
				if (!areaServers || areaServers.length === 0) {
					next(null, {code: 500});
					return;
				}
				var index = parseInt(Math.random() * areaServers.length, 10);
				var res = areaServers[index];
				console.log('res.id:', res.id);
				session.set('areaServerId', res.id);
				session.on('closed', onUserLeave.bind(null, self.app));
				session.pushAll(cb);
				self.app.rpc.area.userRemote.userEnter(session, {'uid': uid}, cb);
			}
			], function(err) {
				if (err) {
					next(err, {code: 500});
				}
				next(null, {code: 0, msg: 'game server is ok.'});
			});
};

var onUserLeave = function(app, session, reason) {
	if (!session || !session.uid) {
		return;
	}
	console.log('onUserLeave:', session.uid);
	app.rpc.area.userRemote.userLeave(session, {uid: session.uid}, function(err) {
	});
};

