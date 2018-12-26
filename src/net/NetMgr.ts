/**
 * 网络管理类
 */
class NetMgr {
	private static _instance: NetMgr;
	public static get instance(): NetMgr {
		if (!NetMgr._instance) {
			NetMgr._instance = new NetMgr();
		}
		return NetMgr._instance;
	}

	public nomalEvent = new egret.EventDispatcher();

/**获取服务器版本   参数：*/
	public reqServerConfig(): void {
		// let open: string = this.getOpenId();
		let temp = {};
		postServicesConfig(function (event) {
			this.analysisConfig(event);
		}, this, JSON.stringify(temp));
	}
	/**解析服务器版本* */
	private analysisConfig(str: any): void {
		console.log("*********analysisConfig=", str);
		//{"adId":"adunit-acc120a1d4f95221","debug":true,"stat":"ok","version":"1","videoId":"adunit-92596c0ee604f582"}
		let str2Json = JSON.parse(str);
		if (str2Json.stat == "ok") {
			GameConfig.setVerNo(Number(str2Json.version));
			GameConfig.setADID(str2Json.adId);
			GameConfig.setVOID(str2Json.videoId);
			GameConfig.setVOIDPER(Number(str2Json.ADpercent));
			NetMgr.instance.nomalEvent.dispatchEventWith('version');
			let ud: UserData = Main.instance.getUserData();
			if (str2Json.diamondNum) {
				let signArr: Array<number> = Util.strToArrNum(str2Json.diamondNum, '_');
				ud.setSignAwards(signArr);
			}
			if (str2Json.invite) {
				ud.setInviteAward(Number(str2Json.invite));
			}
			//TODO:测试数据
			// GameConfig.setVerNo(1);
			// GameConfig.setADID('adunit-acc120a1d4f95221');
			// GameConfig.setVOID('adunit-92596c0ee604f582');
			// GameConfig.setVOIDPER(100);
		}
	}
	/**登录或者注册新的微信用户 参数：code， avatar， nickName*/
	public reqWeixinLogin(code: string, errorFun: Function): void {
		// let temp: string = '&code=' + code + "&avatar=" + avatar + "&nickName=" + nickName;
		let temp = {
			code: code
		}
		console.log("微信登录请求发送=", JSON.stringify(temp));
		postWeixinLogin(function (event) {
			this.analysisWeixinLogin(event);
		}, this, JSON.stringify(temp), errorFun);
		platform.showLoading();//显示微信菊花转
	}
	/**解析登录或者注册新的微信用户*/
	private analysisWeixinLogin(str: any): void {
		console.log("*********analysisWeixinLogin=", str);
		platform.hideLoading();
		let str2Json = JSON.parse(str);
		if (str2Json.stat == "ok") {
			let ud: UserData = Main.instance.getUserData();
			ud.setOpenId(str2Json.openId);
			ud.setUser(str2Json.data);
			if (str2Json.signNums) {
				ud.setSignNum(Number(str2Json.signNums));
			}
			if (str2Json.isSignedToday) {
				ud.setSign(Boolean(str2Json.isSignedToday));
			}
			if (str2Json.coinNextReduce && str2Json.coinNextReduce > 0) {
				ud.setHapRedGem(Number(str2Json.coinNextReduce));
			}
			if (str2Json.bombNextReduce && str2Json.bombNextReduce > 0) {
				ud.setBombRedGem(Number(str2Json.bombNextReduce));
			}
			NetMgr.instance.nomalEvent.dispatchEventWith('login');
		}
	}
	/**获取openId值 */
	private getOpenId(): string {
		let token: string = Main.instance.getUserData().getOpenId();
		return token;
	}
//class end
}

