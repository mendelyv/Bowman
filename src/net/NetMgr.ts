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


//class end
}

