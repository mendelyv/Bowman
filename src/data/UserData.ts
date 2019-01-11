/**
 * 用户数据
 */
class UserData {

	public static goldRate: number = 1;//获得的金币倍数
	public static expRate: number = 1;//获得的经验倍数
	public static levelMax: number = 25;//最高等级
	public static s_selRole: number = 0;//默认选择第0个角色

	private static _openId: string = ""; //微信用户id
	private static _code: string = "";//微信code
	private static _nickName: string = "凯撒大帝";//玩家昵称
	private static _avatar: string = "";//玩家头像地址
	private static _gold: number = 0;//玩家金币
	private static _gem: number = 0;//玩家钻石

	public constructor() {

	}

	/**设置玩家数据 */
	public static setUser(user): void {
		console.log('user=', user);
		if (user) {
			if (user.scoreStr) {
				let new_gold: number = StringUtil.parseValueG(user.scoreStr);
				UserData._gold = new_gold;
			}
			else {
				let gold = Number(Util.getWordBySign("initGold")); //初始化金币
				if (gold > UserData._gold) {
					this.setGold(gold);
				}
			}
			if (user.diamondNums) {
				this.setGem(Number(user.diamondNums));
			}
		}
	}
/**获取微信openId*/
	public static getOpenId(): string {
		return UserData._openId;
	}
	/**设置微信token*/
	public static setOpenId(token: string): void {
		if (UserData._openId != token) {
			UserData._openId = token;
		}
	}
	/**获取微信code*/
	public static getCode(): string {
		return UserData._code;
	}
	/**设置微信code*/
	public static setCode(code: string): void {
		if (UserData._code != code) {
			UserData._code = code;
		}
	}
	/**获取头像地址*/
	public static getAvatar(): string {
		return UserData._avatar;
	}
	/**设置头像地址*/
	public static setAvatar(avatar: string): void {
		if (UserData._avatar != avatar) {
			UserData._avatar = avatar;
		}
	}
	/**获取玩家姓名*/
	public static getNickeName(): string {
		return UserData._nickName;
	}
	/**设置玩家姓名*/
	public static setNickName(nick: string): void {
		if (UserData._nickName != nick) {
			UserData._nickName = nick;
		}
	}
	/**获得钻石 */
	public static getGem(): number {
		return UserData._gem;
	}
	/**设置钻石 */
	public static setGem(gem: number): number {
		let changeGem: number = 0;
		if (UserData._gem != gem) {
			changeGem = gem - UserData._gem;
			UserData._gem = gem;
		}
		return changeGem;
	}
	/**添加钻石 */
	public static addGem(addG: number): void {
		var curGem: number = this.getGem();
		if (addG > 0) {
			curGem = curGem + addG;
			this.setGem(curGem);
		}
	}
	/**减少钻石 */
	public static redGem(redG: number): void {
		var curGem: number = this.getGem();
		if (curGem >= redG) {
			curGem = curGem - redG;
			this.setGem(curGem);
		}
	}
	/**返回当前金币数量 */
	public static getGold(): number {
		// var str: string = Util.getDataToLocal(RMS_JINGPO);
		// if (!str) {
		// }
		// else {
		// let save_gold: number = Number(str);
		// if (save_gold > UserData._gold) {
		// 	UserData._gold = Math.floor(save_gold);
		// }
		// }
		return UserData._gold;
	}
	/**增加金币 */
	public static addGold(addG: number) {
		var curGold: number = this.getGold();
		if (addG > 0) {
			curGold = curGold + addG;
			this.setGold(curGold);
		}
	}
	/**减少金币 */
	public static redGold(redG: number) {
		var curGold: number = this.getGold();
		if (curGold >= redG) {
			curGold = curGold - redG;
			this.setGold(curGold);
		}
	}
	/**设置当前金币数量 */
	public static setGold(g: number) {
		if (UserData._gold != g) {
			UserData._gold = g;
			// Util.saveDataToLocal(RMS_JINGPO, UserData._gold.toString());
			// let now_time: string = Date.now().toString();
			// Util.saveDataToLocal(RMS_BISHA, now_time);
		}
	}


	/**
	 * 存储数据到服务器
	 */
	public saveToServer(): void {
		// console.log('keyStr=',keyStr,' valueStr=',valueStr);
		let gold: number = UserData.getGold();
		gold = Math.ceil(gold);
		let score_str: string = StringUtil.changeToUnitGold(gold);
		// let ordArrStr: string = Util.arrToString(this.getSaveOrds(), '_');
		let now_time: string = Date.now().toString();
		let gem_str: string = UserData.getGem().toString();
		let now_data = {
			scoreStr: score_str,
			nowTime: now_time,
			diamondNums: gem_str
		}
		// NetMgr.instance.reqSetJson(now_data);
	}

	/**上传数据到微信 */
	public updataToWX(keyStr: string, valueStr: string): void {
		if (GameConfig.VER_CONTROL == "wechat") {
			platform.setUserCloudStorage([{ key: keyStr, value: valueStr }]);
		}
	}

}

