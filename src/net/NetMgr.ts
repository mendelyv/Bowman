/**
 * 网络管理类
 */
class NetMgr {
	public static s_cookie:string = "";//存储cookie
	public nomalEvent = new egret.EventDispatcher();
	private static _instance: NetMgr;
	public static get instance(): NetMgr {
		if (!NetMgr._instance) {
			NetMgr._instance = new NetMgr();
		}
		return NetMgr._instance;
	}
	/**请求签到   参数：  type:1正常签到 2双倍领取奖励签到*/
	public reqSign(type: number = 1): void {
		let openId: string = UserData.getOpenId();
		let temp = {
			openId: openId,
			type: type
		}
		console.log("*********reqSign=", JSON.stringify(temp));
		var that = this;
		postSign(function (event) {
			that.analysisSign(event);
		}, this, temp);
	}
	/**解析签到* */
	private analysisSign(str: any): void {
		console.log("*********analysisSign=", str);
		//{"IsSignedToday":true,"diamondNums":100,"stat":"OK","type":1}
		let str2Json = JSON.parse(str);
		if (str2Json.stat == "OK" || str2Json.stat == "ok") {
			if (str2Json.type == 1) { //签到成功
				let sign: number = UserData.getSignNum() + 1;
				UserData.setSignNum(sign);
				UserData.setSign(true);
				if (str2Json.diamondNums) {
					let num: number = Number(str2Json.diamondNums);
					let addNum: number = UserData.setGem(num);
					// Main.instance.getGameUI().updateGemTxt();
					if (addNum > 0) {
						let suc: string = Util.getWordBySign("conGet") + addNum + Util.getWordBySign("gemWord");
						// TipsUtils.showTipsDownToUp(suc, false, 30, 5000);
					}
				}
				// Main.instance.getGameUI().updateSignBR();
				NetMgr.instance.nomalEvent.dispatchEventWith('sign');
			}
			else {
				let loseSigh: string = Util.getWordBySign('loseSigh');
				// TipsUtils.showTipsDownToUp(loseSigh, true);
			}
		}
	}
	/**请求邀请有礼   参数：openId :邀请人openId avatarUrl图像地址 nickName昵称 be_invite_openId被邀请人*/
	public reqInvite(openId: string): void {
		let avatar: string = "1";//ud.getAvatar();
		let nickName: string = "";//ud.getNickeName();
		let be_invite_openId: string = UserData.getOpenId();//被邀请人openId
		let temp = {
			openId: openId,
			beInviteOpenId: be_invite_openId,
			avatarUrl: avatar,
			nickName: nickName
		}
		console.log("*********reqInvite=", JSON.stringify(temp));
		var that = this;
		postInvite(function (event) {
			that.analysisInvite(event);
		}, this, temp);
	}
	/**解析邀请有礼* */
	private analysisInvite(str: any): void {
		console.log("*********analysisInvite=", str);
		let str2Json = JSON.parse(str);
		if (str2Json.stat == "OK" || str2Json.stat == "ok") {
			console.log("*********analysisInvite插入数据成功=", str);
		}
	}
   /**用户存储key,value数据  参数:json*/
	public reqSaveData(now_data: any): void {
		let open: string = UserData.getOpenId();
		let temp = {
			openId: open,
			data: now_data
		}
		var that = this;
		postSaveData(function (event) {
			that.analysisSaveData(event);
		}, this, temp);
	}
	/**解析用户存储key,value数据*/
	private analysisSaveData(str: any): void {
		// let str2Json = JSON.parse(str);
		// if (str2Json.stat == 'ErrVersionNotMatch') {		
		// }
		// console.log("*********analysisSaveData=" + str);
	}
   /**用户存储日志*/
	public reqSaveLog(num:number): void {
		let open: string = UserData.getOpenId();
		let temp = {
			openId: open,
			key: "distance",
			value:num
		}
		var that = this;
		postSaveLog(function (event) {
			that.analysisSaveLog(event);
		}, this, temp);
	}
	/**解析用户存储日志*/
	private analysisSaveLog(str: any): void {
		// let str2Json = JSON.parse(str);
		// if (str2Json.stat == 'ErrVersionNotMatch') {
		// }
		// console.log("*********analysisSaveData=" + str);
	}
	/**登录或者注册新的微信用户 参数：code， avatar， nickName*/
	public reqWeixinLogin(code: string, errorFun: Function): void {
		let temp = {
			code: code
		}
		console.log("微信登录请求发送=", JSON.stringify(temp));
		var that = this;
		postWeixinLogin(function (event) {
			that.analysisWeixinLogin(event);
		}, this, temp, errorFun);
		// platform.showLoading();//显示微信菊花转
	}
	/**解析登录或者注册新的微信用户*/
	private analysisWeixinLogin(str: any): void {
		console.log("*********analysisWeixinLogin=", str);
		// platform.hideLoading();
		let str2Json = JSON.parse(str);
		if (str2Json.stat == "OK" || str2Json.stat == "ok") {
			// let data = str2Json.data;
			// UserData.setOpenId(data.openId);
			// UserData.setUser(data.data);
			NetMgr.instance.nomalEvent.dispatchEventWith('login');
		}
	}
 
	
	/**获取服务器版本   参数：*/
	public reqServerConfig(): void {
		let temp = {};
		var that = this;
		postServicesConfig(function (event) {
			that.analysisConfig(event);
		}, this, temp);
	}
	/**解析服务器版本* */
	private analysisConfig(str: any): void {
		console.log("*********analysisConfig=", str);
		let str2Json = JSON.parse(str);
		if (str2Json.stat == "OK" || str2Json.stat == "ok") {
			let data = str2Json.data;
			GameConfig.setVerNo(Number(data.version));
			GameConfig.setADID(data.adId);
			GameConfig.setVOID(data.videoId);
			GameConfig.setVOIDPER(Number(data.viewAD));
			NetMgr.instance.nomalEvent.dispatchEventWith('version');
			
			if (data.diamondNum) {
				let signArr: Array<number> = Util.strToArrNum(data.diamondNum, '_');
				UserData.setSignAwards(signArr);
			}
			if (data.invite) {
				UserData.setInviteAward(Number(data.invite));
			}
			//TODO:测试数据
			// GameConfig.setVerNo(1);
			// GameConfig.setADID('adunit-74de43dcd43e0466');
			// GameConfig.setVOID('adunit-22ae30e65a858a49');
			// GameConfig.setVOIDPER(100);
		}
	}
//class end
}

