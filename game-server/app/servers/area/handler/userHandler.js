var area = require('../../../domain/area');

var handler = module.exports;

handler.getUserInfo = function(msg, session, next) {
	var user = area.getUser(session.uid);
	console.log('user:', typeof(user), session.uid, area.users);
	if (!user) {
		next(new Error('user not exist'));
		return;
	}
	next(null, user.toJSON());
};

