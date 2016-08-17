var logger = require('pomelo-logger').getLogger(__filename)
var accountDao = require('../../../dao/accountDao.js');

var remote = module.exports;

remote.auth = function(args, cb) {
	var username = args.username;
	var host = args.host || 0;
	queryUid(username, host, function(id) {
		if (id === null) {
			cb(null, null);
			return;
		}
		cb(null, id);
	});
};

var queryUid = function(username, host, cb) {
	accountDao.getUserId(username, host, function(err, uid) {
		if (uid === null) {
			accountDao.createAccount(username, host, function(err, uid) {
				logger.info(err, uid)
				cb(uid)	
			});
		} else {
			cb(uid);
		}
	});
};
