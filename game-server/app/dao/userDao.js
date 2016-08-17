var logger = require('pomelo-logger').getLogger(__filename);
var pomelo = require('pomelo');
var utils = require('../util/utils');

var userDao = module.exports;

/**
 * Get an user by uid
 * @param {Number} uid 
 * @param {function} cb Callback function.
 */
userDao.getUser = function(uid, cb){
	var sql = 'select * from user where uid = ?';
	var args = [uid];

	pomelo.app.get('dbclient').query(sql, args, function(err, res){
		if(err !== null){
			utils.invokeCallback(cb, err.message, null);
		} else if (!res || res.length <= 0){
			utils.invokeCallback(cb, null, null);
			return;
		} else{
			utils.invokeCallback(cb, null, res[0]);
		}
	});
};

/**
 * Create a new user 
 * @param {String} uid User id.
 * @param {String} name user's name in the game.
 * @param {function} cb Callback function
 */
userDao.createUser = function(user, cb){
	var sql = 'insert into user(uid, nickname) values(?, ?)';
	var args = [user.uid, user.nickname]

	pomelo.app.get('dbclient').insert(sql, args, function(err,res){
		if(err !== null){
			logger.error('create user failed! ' + err.message);
			utils.invokeCallback(cb, err.message);
		} else {
			utils.invokeCallback(cb, null);
		}
	});
};

/**
 * Update a user 
 * @param {Object} user The user need to update, all the propties will be update.
 * @param {function} cb Callback function.
 */
userDao.updateUser = function(user, cb){
	var sql = 'update user set nickname = ?, yuanbao = ?, freeYuanbao = ?, gold = ?, clvl = ?, levelId = ? where id = ?';
	var args = [user.nickname, user.yuanbao, user.freeYuanbao, user.gold, user.clvl, user.levelId, user.uid];

	pomelo.app.get('dbclient').query(sql, args, function(err, res){
		if(err !== null){
			utils.invokeCallback(cb, err.message, null);
		} else {
			if (!!res && res.affectedRows > 0) {
				utils.invokeCallback(cb, null, true);
			} else {
				logger.error('update user failed!');
				utils.invokeCallback(cb, null, false);
			}
		}
	});
};

