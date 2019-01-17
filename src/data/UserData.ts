/**
 * 用户数据
 */
class UserData {

	public static goldRate: number = 1;//获得的金币倍数
	public static expRate: number = 1;//获得的经验倍数
	public static levelMax: number = 25;//最高等级
	public static s_selRole: number = 0;//默认选择第0个角色
	
	public static s_weaponType:number = 0;//初始玩家使用的武器类型   BOW,//弓箭 SHOTGUN,//散弹枪 ROTARY_DARTS,//旋转镖 ROTARY_SHIELD //旋转盾

	private static _openId: string = ""; //微信用户id
	private static _code: string = "";//微信code
	private static _nickName: string = "凯撒大帝";//玩家昵称
	private static _avatar: string = "";//玩家头像地址
	private static _gold: number = 0;//玩家金币
	private static _gem: number = 0;//玩家钻石
	private static _signAwards: Array<number> = [50, 55, 60, 65, 70, 75, 100];	//签到奖励列表
	private static _signNum: number = 0;//总共签到次数
	private static _isSign: boolean = false;//今天是否签到 true已签到 false没有签到
	private static _inviteArr: Array<InviteData>;//邀请数据列表
	private static _inviteAward: number = 200;//邀请一个人奖励钻石的数目
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
	/**设置 签到次数 */
	public static setSignNum(num: number) {
		UserData._signNum = num;
	}
	/**获得 签到次数 */
	public static getSignNum(): number {
		return UserData._signNum;
	}

	/**设置 今天是否签到 */
	public static setSign(bool: boolean) {
		UserData._isSign = bool;
	}
	/**获得 今天是否签到 */
	public static isSign(): boolean {
		return UserData._isSign;
	}
    /**
	 * 清空邀请数据列表
	 */
	public static clearInviteArr(): void {
		UserData._inviteArr = [];
	}
	/**
	 * 获取邀请数据列表
	 */
	public static getInviteArr(): Array<InviteData> {
		return UserData._inviteArr;
	}
	/**设置邀请奖励数据*/
	public static setInviteAward(award: number): void {
		if (UserData._inviteAward != award) {
			UserData._inviteAward = award;
		}
	}
	/**根据签到的天数获取当前的钻石奖励 */
	public static getSignAByDay(day: number): number {
		if (day >= 0 && day <= UserData._signAwards.length) {
			return UserData._signAwards[day - 1];
		}
		return 0;
	}
	/**设置签到奖励配置 */
	public static setSignAwards(awards: Array<number>): void {
		UserData._signAwards = awards;
	}


	/*** 存储数据到服务器*/
	public static updateLocalData(): void {
		NetMgr.instance.setJson({
			openId: UserData._openId,
			data:{
				//需要保存的数据
			}
		});
	}


	/**上传log到服务器 */
	public static uploadLog(curMileage: number): void {
		// NetMgr.instance.reqSaveLog(curMileage);
	}
	/**上传数据到微信 */
	public static updataToWX(keyStr: string, valueStr: string): void {
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