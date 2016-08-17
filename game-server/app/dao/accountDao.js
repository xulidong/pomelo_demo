var logger = require('pomelo-logger').getLogger(__filename);
var pomelo = require('pomelo');
var utils = require('../util/utils');

var accountDao = module.exports;

/**
 * Get an user by uid
 * @param {String} account
 * @param {Number} server host
 * @param {function} cb Callback function.
 */
accountDao.getUserId = function(account, host, cb){
	var sql = 'select id from account where account = ? and host = ?';
	var args = [account, host];
	logger.info(account, host)

	pomelo.app.get('dbclient').query(sql, args, function(err, res){
		if(err !== null){
			utils.invokeCallback(cb, err.message, null);
		} else if (!res || res.length <= 0){
			utils.invokeCallback(cb, null, null);
			return;
		} else{
			utils.invokeCallback(cb, null, res[0].id);
		}
	});
};

/**
 * Create a new user 
 * @param {String} account.
 * @param {Number} server host.
 * @param {function} cb Callback function
 */
accountDao.createAccount = function(account, host, cb){
	var sql = 'insert into account(account, host) values(?, ?)';
	var args = [account, host];
	logger.info(account, host)

	pomelo.app.get('dbclient').insert(sql, args, function(err, res){
		if(err !== null){
			logger.error('create user failed! ' + err.message);
			logger.error(err);
			utils.invokeCallback(cb, err.message, null);
		} else {
			utils.invokeCallback(cb, null, res.insertId);
		}
	});
};

