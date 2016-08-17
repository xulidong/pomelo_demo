var logger = require('pomelo-logger').getLogger(__filename)
var area = require('../../../domain/area');
var userDao = require('../../../dao/userDao.js');
var User = require('../../../domain/user');

var remote = module.exports;

remote.userEnter = function(args, cb) {
	logger.debug('remote.userEnter:', args.uid);
	getUser(args.uid, function(res) {
		logger.debug('getUser:', res);
		if (res === null) {
			cb(new Error('get user failed.'));
			return;
		}
		area.addUser(res);
		cb(null);
	});
};

remote.userLeave = function(args, cb) {
	logger.debug('remote.userLeave:', args.uid);
	area.delUser(args.uid);
	cb(null);
};

var getUser = function(uid, cb) {
	userDao.getUser(uid, function(err, res) {
		console.log('userDao.getUser:', res);
		if (res === null) {
			var user = new User({uid: uid});
			userDao.createUser(user, function(err) {
				logger.info(err)
				if (err === null) {
					cb(user)	
				} else {
					cb(null)
				}
			});
		} else {
			cb(new User(res));
		}
	});
};

