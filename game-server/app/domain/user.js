function User(opts) {
	this.uid = opts.uid || 0;
	this.nickname = opts.nickname || '';
	this.yuanbao = opts.yuanbao || 0;
	this.freeYuanbao = opts.freeYuanbao || 0;
	this.gold = opts.gold || 0;
	this.clvl = opts.clvl || 1;
	this.levelId = opts.levelId || 1;
	this.round = opts.round || 0;
}

module.exports = User;

User.prototype.toJSON = function() {
	return {
		uid: this.uid,
		nickname: this.nickname,
		yuanbao: this.yuanbao,
		freeYuanbao: this.freeYuanbao,
		gold: this.gold,
		clvl: this.clvl,
		levelId: this.levelId,
		round: this.round
	};
};

