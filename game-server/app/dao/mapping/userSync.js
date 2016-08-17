module.exports =  {
	updateUser:function(client, user, cb) {
		var sql = 'update user set nickname = ?, yuanbao = ?, freeYuanbao = ?, gold = ?, clvl = ?, levelId = ? where uid = ?';
		var args = [user.nickname, user.yuanbao, user.freeYuanbao, user.gold, user.clvl, user.levelId, user.uid];
		client.query(sql, args, function(err, res) {
			if(err !== null) {
				console.error('write mysql failed!　' + sql + ' ' + JSON.stringify(user) + ' stack:' + err.stack);
			}
      if(!!cb && typeof cb == 'function') {
        cb(!!err);
      }
		});
	}
};
