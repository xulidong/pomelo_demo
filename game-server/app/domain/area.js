var logger = require('pomelo-logger').getLogger(__filename)

var exp = module.exports;

var users = {};

exp.addUser = function(user) {
	logger.debug('area.addUser:', user.uid)
	users[user.uid] = user;
};

exp.delUser = function(uid) {
	logger.debug('area.delUser:', uid);
	delete users[uid];
};

exp.getUser = function(uid) {
	return users[uid];
};

