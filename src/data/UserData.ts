/**
 * 用户数据
 */
class UserData {

	public static goldRate:number = 1;//获得的金币倍数
	public static expRate:number = 1;//获得的经验倍数
	public static glod:number = 1;//玩家金币


	public isGoldH: boolean = false;//是否开启了金币狂欢按钮
	public goldHMaxLv: number = 0;//开启了金币狂欢后 记录的终止关卡
	public dropPer: number = 30;//掉落金币的概率 金币掉落添加概率，为30%。
	public dropPerH: number = 50;//金币狂欢掉落金币的概率 金币掉落添加概率，为50%。
	public nickname: string = "1";
	public openId: number = 1; //用户id
	public gender: number = 1;
	public city: string = "GuangZhou";
	public avatarUrl: string = "";
	private _gold: number = 450; 			//金币
	private _gem: number = 0;				//钻石
	private _ordArr: Array<number>; 		//存储12个格子，存放的为该格子的武器编号
	private _clickOrdArr: Array<any>      //存储12个格子，存放半透明的武器编号
	private _buyArr: Array<number>;			//存储每种武器购买后的价格
	private _highLevel: number = 1;				//合成的最高等级
	private _addTime: number = 0;				//加速时间
	private _signAwards: Array<number>;	//签到奖励列表
	private _nowTime: string = "0";//当前时间
	private _shopTime: string;//当前时间

	private _isRed: boolean = false;//是否显示小红点
	private _newHStep: number = 0;							//新手引导的步骤
	private _gameLv: number = 1;//当前游戏关卡
	private _openId: string = "";//微信token
	private _code: string = "";//微信code
	private _avatar: string = "https://wx.qlogo.cn/mmopen/vi_32/2AO31mdaKao6aHuyZzNocoEgMIkRWsf99osodbLicic5jGJRb2nIK9Jibbl3nrFL9BYCl8cLcquZrYUW2GzkTsabQ/132";//玩家头像地址
	private _nickName: string = "";//玩家姓名
	private _signNum: number = 0;//总共签到次数
	private _isSign: boolean = false;//今天是否签到 true已签到 false没有签到
	private _inviteArr: Array<InviteData>;//邀请数据列表
	private _inAllNum: number = 9;//当前邀请的总人数
	private _inviteAward: number = 200;//邀请一个人奖励钻石的数目
	private _hapRedGem: number = 40;//金币狂欢消耗
	private _bombRedGem: number = 40;//飞机轰炸消耗
	public constructor() {
		this._inAllNum = 9;
		this._inviteArr = [];
		this._signAwards = [50, 55, 60, 65, 70, 75, 100];

		this._ordArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];// new Array<number>(ComposePanel.COMPOSE_GRID_ALL_NUM);
		// this._plaArr = [0, 0, 0, 0, 0, 0];//new Array<number>(ComposePanel.PLACE_ALL_NUM);
		this._clickOrdArr = [null, null, null, null, null, null, null, null, null, null, null, null];//new Array<any>(ComposePanel.COMPOSE_GRID_ALL_NUM);
		this._highLevel = 1;
		this._addTime = 0;
		//TODO:测试
		if (GameConfig.VER_CONTROL == "test") {
			this._gold = 45000000;
			// this._plaArr = [0, 0, 0, 0, 0, 0];
			// this._clickOrdArr = [null, null, null, null, null, null, null, null, null, null, null, null];
			// this._plaArr = [30, 0, 0, 0, 0, 0];
			// this._clickOrdArr = [{ level: 30, plaPos: 0, price: 222200 }, null, null, null, null, null, null, null, null, null, null, null];
		}
	}
	/**获取金币狂欢消耗 */
	public getHapRedGem(): number {
		return this._hapRedGem;
	}
	/**设置金币狂欢消耗 */
	public setHapRedGem(num: number): void {
		this._hapRedGem = num;
	}
	/**获取飞机轰炸消耗 */
	public getBombRedGem(): number {
		return this._bombRedGem;
	}
	/**设置飞机轰炸消耗 */
	public setBombRedGem(num: number): void {
		this._bombRedGem = num;
	}
	/**获取当前邀请的总人数 */
	public getInAllNum(): number {
		return this._inAllNum;
	}
	/**设置当前邀请的总人数 */
	public setInAllNum(num: number): void {
		this._inAllNum = num;
	}
	/**
	 * 清空邀请数据列表
	 */
	public clearInviteArr(): void {
		this._inviteArr = [];
	}
	/**
	 * 获取邀请数据列表
	 */
	public getInviteArr(): Array<InviteData> {
		return this._inviteArr;
	}
	/**根据签到的天数获取当前的钻石奖励 */
	public getSignAByDay(day: number): number {
		if (day >= 0 && day <= this._signAwards.length) {
			return this._signAwards[day - 1];
		}
		return 0;
	}

	/**获取微信openId*/
	public getOpenId(): string {
		return this._openId;
	}
	/**设置微信token*/
	public setOpenId(token: string): void {
		if (this._openId != token) {
			this._openId = token;
		}
	}
	/**获取微信code*/
	public getCode(): string {
		return this._code;
	}
	/**设置微信code*/
	public setCode(code: string): void {
		if (this._code != code) {
			this._code = code;
		}
	}
	/**获取头像地址*/
	public getAvatar(): string {
		return this._avatar;
	}
	/**设置头像地址*/
	public setAvatar(avatar: string): void {
		if (this._avatar != avatar) {
			this._avatar = avatar;
		}
	}
	/**获取玩家姓名*/
	public getNickeName(): string {
		return this._nickName;
	}
	/**设置玩家姓名*/
	public setNickName(nick: string): void {
		if (this._nickName != nick) {
			this._nickName = nick;
		}
	}
	/**获取新手引导步骤*/
	public getNewHStep(): number {
		return this._newHStep;
	}
	/**设置新手引导步骤*/
	public setNewHStep(step: number): void {
		if (this._newHStep != step) {
			this._newHStep = step;
			// console.log('设置新手引导步骤=', this._newHStep);
			// this.saveToServer();
		}
	}
	/**获取邀请奖励数据*/
	public getInviteAward(): number {
		return this._inviteAward;
	}
	/**设置邀请奖励数据*/
	public setInviteAward(award: number): void {
		if (this._inviteAward != award) {
			this._inviteAward = award;
		}
	}
	/**设置服务器版本校验*/
	// public setVersion(version: number): void {
	// 	if (this._version != version) {
	// 		this._version = version;
	// 	}
	// }
	/**
	 * 获取小红点是否显示
	 */
	public isRed(): boolean {
		return this._isRed;
	}
	/**
	 * 设置小红点是否显示
	 */
	public setRed(bool: boolean): void {
		if (this._isRed != bool) {
			this._isRed = bool;
			let isRedStr: string = (bool) ? "1" : "0";
			// console.error('setRed')
			// this.saveToServer();
		}
	}
	/**设置玩家数据 */
	public setUser(user): void {
		// console.log('user=',user);
		if (user) {
			if (user.addTimeStr) {
				this._addTime = Math.floor(Number(user.addTimeStr));
			}
			if (user.highLevelStr) {
				this._highLevel = Math.floor(Number(user.highLevelStr));
			}
			if (user.scoreStr) {
				let new_gold: number = StringUtil.parseValueG(user.scoreStr);
				this._gold = new_gold;
			}
			else {
				let gold = Number(Util.getWordBySign("initGold")); //初始化金币
				if (gold > this._gold) {
					this.setGold(gold);
				}
			}
			if (user.nowTime) {
				this._nowTime = user.nowTime;
			}
			if (user.shopTime) {
				this._shopTime = user.shopTime;
			}
			if (user.ordArrStr) {
				this._ordArr = Util.strToArrNum(user.ordArrStr, '_');
			}
			// if (user.plaArrStr) {
			// 	this._plaArr = Util.strToArrNum(user.plaArrStr, '_');
			// }
			if (user.buyArrStr) {
				this._buyArr = Util.strToArrNum(user.buyArrStr, '_');
			}
			if (user.clickOrdArr) {
				this._clickOrdArr = user.clickOrdArr;
				let data: Array<any> = this.getSaveClickOrds();
				for (let i = 0; i < data.length; i++) {
					let obj = data[i];
					if (obj) {
						//武器拖拽到炮台之后 创建新的武器
						if (obj.level > 0) {
							this.setSaveOrds(i, obj.level);
							this.clearClickOrds(i);
						}
					}
				}
			}
			if (user.isRed) {
				let isRedStr: string = user.isRed;
				this._isRed = (isRedStr == "1") ? true : false;
			}
			if (user.newHStep) {
				this._newHStep = Number(user.newHStep);
			}
			if (user.gameLv) {
				this.setGameLv(Number(user.gameLv));
			}
			if (user.diamondNums) {
				this.setGem(Number(user.diamondNums));
			}
		}
	}
	/**设置签到奖励配置 */
	public setSignAwards(awards: Array<number>): void {
		this._signAwards = awards;
	}
	/**设置 加速时间 */
	public setAddST(time: number): void {
		this._addTime = time;
		// let addTimeStr: string = this._addTime.toString();
		// Util.saveDataToLocal(RMS_ADD_TIME, addTimeStr);

	}
	/**获得 加速时间 */
	public getAddSpeedTime(): number {
		// var str: string = Util.getDataToLocal(RMS_ADD_TIME);
		// if (str) {
		// 	let save_addTime: number = Number(str);
		// 	if (save_addTime > this._addTime) {
		// 		this._addTime = Math.floor(save_addTime);
		// 	}
		// }
		return this._addTime;
	}
	/**设置 合成的最高等级 */
	public setHighLevel(lv: number): boolean {
		if (lv > this._highLevel) {
			this._highLevel = lv;
			// let highLevelStr: string = this._highLevel.toString();
			// Util.saveDataToLocal(RMS_lIVE, highLevelStr);

			return true;
		}
		return false;
	}
	/**获得 合成的最高等级 */
	public getHighLevel(): number {
		// var str: string = Util.getDataToLocal(RMS_lIVE);
		// if (str) {
		// 	let save_highLevel: number = Number(str);
		// 	if (save_highLevel > this._highLevel) {
		// 		this._highLevel = Math.floor(save_highLevel);
		// 	}
		// }
		return this._highLevel;
	}
	/**设置 关卡 */
	public setGameLv(lv: number) {
		this._gameLv = lv;
	}
	/**获得 关卡 */
	public getGameLv(): number {
		return this._gameLv;
	}

	/**设置 签到次数 */
	public setSignNum(num: number) {
		this._signNum = num;
	}
	/**获得 签到次数 */
	public getSignNum(): number {
		return this._signNum;
	}

	/**设置 今天是否签到 */
	public setSign(bool: boolean) {
		this._isSign = bool;
	}
	/**获得 今天是否签到 */
	public isSign(): boolean {
		return this._isSign;
	}
	/**获得钻石 */
	public getGem(): number {
		return this._gem;
	}
	/**设置钻石 */
	public setGem(gem: number): number {
		let changeGem: number = 0;
		if (this._gem != gem) {
			changeGem = gem - this._gem;
			this._gem = gem;
		}
		return changeGem;
	}
	/**添加钻石 */
	public addGem(addG: number): void {
		var curGem: number = this.getGem();
		if (addG > 0) {
			curGem = curGem + addG;
			this.setGem(curGem);
		}
	}
	/**减少钻石 */
	public redGem(redG: number): void {
		var curGem: number = this.getGem();
		if (curGem >= redG) {
			curGem = curGem - redG;
			this.setGem(curGem);
		}
	}
	/**返回当前金币数量 */
	public getGold(): number {
		// var str: string = Util.getDataToLocal(RMS_JINGPO);
		// if (!str) {
		// }
		// else {
		// let save_gold: number = Number(str);
		// if (save_gold > this._gold) {
		// 	this._gold = Math.floor(save_gold);
		// }
		// }
		return this._gold;
	}
	/**增加金币 */
	public addGold(addG: number) {
		var curGold: number = this.getGold();
		if (addG > 0) {
			curGold = curGold + addG;
			this.setGold(curGold);
		}
	}
	/**减少金币 */
	public redGold(redG: number) {
		var curGold: number = this.getGold();
		if (curGold >= redG) {
			curGold = curGold - redG;
			this.setGold(curGold);
		}
	}
	/**设置当前金币数量 */
	public setGold(g: number) {
		if (this._gold != g) {
			this._gold = g;
			// Util.saveDataToLocal(RMS_JINGPO, this._gold.toString());

			// let now_time: string = Date.now().toString();
			// Util.saveDataToLocal(RMS_BISHA, now_time);

		}
	}
	/**获取离线的时间 */
	public getOfflineTime(): number {
		// this._nowTime = Util.getDataToLocal(RMS_BISHA);
		// if (!this._nowTime) {
		// 	return 0;
		// }
		return Number(this._nowTime);
	}
	/**设置商店打开的时间 */
	// public setShopOpenTime(): void {
	// let now_time: string = Date.now().toString();
	// Util.saveDataToLocal(RMS_SHOP_OPEN_TIME, now_time);
	// egret.setTimeout(function () {
	// 	this.saveToServer("shopTime", now_time);
	// }, this, 30000);//延迟30秒存储数据到服务器
	// }
	/**获取商店之前打开的时间 */
	public getShopOpenTime(): number {
		// this._shopTime = Util.getDataToLocal(RMS_SHOP_OPEN_TIME);
		// if (!this._shopTime) {
		// 	return 0;
		// }
		return Number(this._shopTime);
	}
	public setSOT(cur_time: string): void {
		this._shopTime = cur_time;
	}
	/// 设置 12个格子放入的军械（武器）
	public setSaveOrds(id: number, level: number) {
		this._ordArr[id] = level;
		var ordArrStr: string = Util.arrToString(this._ordArr, '_');
		console.log('ordArrStr=', ordArrStr);
		// Util.saveDataToLocal(RMS_GUIDE_ARRAY, ordArrStr);
	}
	
	//设置12个格子放入半透明的武器
	public setSaveClickOrds(id: number, level: number, plaPos: number) {
		this._clickOrdArr[id] = { level: level, plaPos: plaPos };
		// var clickOrdArrStr: string = Util.arrToString(this._clickOrdArr, '_')
		// console.log('clickOrdArrStr=', this._clickOrdArr)
	}
	/**清空 存储的一个半透明武器 */
	public clearClickOrds(id: number): void {
		this._clickOrdArr[id] = null;
		// var clickOrdArrStr: string = Util.arrToString(this._clickOrdArr, '_')
		console.log('clearClickOrds=', this._clickOrdArr)
	}
	public getSaveClickOrds(): Array<any> {
		return this._clickOrdArr;
	}
	/// 获取12个格子放入的军械（武器）
	public getSaveOrds(): Array<number> {
		// var ordArrStr: string = Util.getDataToLocal(RMS_GUIDE_ARRAY);
		// if (ordArrStr) {
		// 	this._ordArr = Util.strToArrNum(ordArrStr, '_');
		// }
		return this._ordArr;
	}
	/// 设置 6个放置军械（武器）的格子
	// public setSavePlas(id: number, level: number) {
	// 	this._plaArr[id] = level;
	// 	let plaArrStr: string = Util.arrToString(this._plaArr, '_');
	// 	console.log('plaArrStr=', plaArrStr);
	// 	// Util.saveDataToLocal(RMS_GUIDE_ARRAY, plaArrStr);
	// }
	/// 获取 6个放置的军械（武器）的格子
	// public getSavePlas(): Array<number> {
	// 	// var plaArrStr: string = Util.getDataToLocal(RMS_GUIDE_ARRAY);
	// 	// if (plaArrStr) {
	// 	// 	this._setArr = Util.strToArrNum(plaArrStr, '_');
	// 	// }
	// 	return this._plaArr;
	// }
	/// 设置 存储的每种武器购买后的价格
	public setSaveBuy(index: number, times: number) {
		this._buyArr[index] = times;
		// var buyArrStr: string = Util.arrToString(this._buyArr, '_');
		// Util.saveDataToLocal(RMS_HUDUN, buyArrStr);
	}
	/**根据购买等级获得新的武器价格 */
	public getNewP(buy_lv: number, old_buy: number): number {
		let bei = GameConfig.BUY_BEI;
		if (buy_lv > 2) {
			bei = 1.175;
		}
		let p = Math.ceil(old_buy * bei);//每次购买后价格提升1.11倍并显示，取整。
		return p;
	}
	/**最高合成等级系数 */
	public getHighRatio(): number {
		//最高合成等级系数=（等级/10-0.5），最小为1
		let highLevel: number = this.getHighLevel();
		let ratio: number = highLevel / 10 - 0.5;
		if (ratio < 1) {
			ratio = 1;
		}
		return ratio;
	}
	// 获取 存储的每种武器购买后的价格
	public getSaveBuy(): Array<number> {
		// var buyArrStr: string = Util.getDataToLocal(RMS_HUDUN);
		// if (buyArrStr) {
		// 	this._buyArr = Util.strToArrNum(buyArrStr, '_');
		// }
		return this._buyArr;
	}

	
	/**
	 * 存储数据到服务器
	 */
	// public saveToServer(): void {
	// 	// console.log('keyStr=',keyStr,' valueStr=',valueStr);
	// 	// NetMgr.getInstance().reqSaveData(keyStr, valueStr);

	// 	let gold: number = this.getGold();
	// 	gold = Math.ceil(gold);
	// 	let score_str: string = StringUtil.changeToUnitGold(gold);
	// 	// this.updataToWX("score", score_str);//上传数据到排行榜
	// 	let ordArrStr: string = Util.arrToString(this.getSaveOrds(), '_');
	// 	let buyArrStr: string = Util.arrToString(this.getSaveBuy(), '_');
	// 	// let plaArrStr: string = Util.arrToString(this.getSavePlas(), '_');
	// 	// let clickOrdArrStr: string = Util.arrToString(this.getSaveClickOrds(), '_')

	// 	let now_time: string = Date.now().toString();
	// 	let isRedStr: string = (this._isRed) ? "1" : "0";
	// 	let gameLv_str: string = this._gameLv.toString();
	// 	let gem_str: string = this.getGem().toString();
	// 	let now_data = {
	// 		addTimeStr: this.getAddSpeedTime().toString(),
	// 		scoreStr: score_str,
	// 		ordArrStr: ordArrStr,
	// 		highLevelStr: this.getHighLevel().toString(),
	// 		buyArrStr: buyArrStr,
	// 		nowTime: now_time,
	// 		isRed: isRedStr,
	// 		newHStep: this._newHStep.toString(),
	// 		shopTime: this._shopTime,
	// 		// plaArrStr: plaArrStr,
	// 		clickOrdArr: this.getSaveClickOrds(),
	// 		gameLv: gameLv_str,
	// 		diamondNums: gem_str
	// 	}
	// 	// console.log('saveToServer now_data=', JSON.stringify(now_data));
	// 	// this._version++;
	// 	// NetMgr.getInstance().reqSetJson(now_data, this._version);
	// 	NetMgr.getInstance().reqSetJson(now_data);
	// }

	/**上传数据到微信 */
	public updataToWX(keyStr: string, valueStr: string): void {
		if (GameConfig.VER_CONTROL == "wechat") {
			platform.setUserCloudStorage([{ key: keyStr, value: valueStr }]);
		}
	}

}
/**邀请数据 */
class InviteData {
	public ranking: number = 1;//名次
	public avatarUrl: string = "";//图像地址
	public nickName: string = "";//昵称
	public receiveType: number = 0;//领取状态 0领取按钮灰色 1可领取 2已领取
	public award: number = 200;//奖励钻石数量
	public openId: string = "";//当前玩家openId
}
var WORD_CONFIG_DATA = [];//多语言配置数据
var ENEMY_CONFIG_DATA = []//怪物信息配置
