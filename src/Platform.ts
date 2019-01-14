/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface Platform {

    //开放数据域
    openDataContext: any;
    createUserInfoButton(): Promise<any>;
    //获取用户数据
    getUserInfo(): Promise<any>;
    //设置屏幕常亮
    setKeepScreenOn(): void;
    //登陆
    login(): Promise<any>;
    //分享重生
    rebornGame(title: string, imgurl: string, query: string): Promise<any>;
    //菜单显示分享
    setDefaultShare(title: string, imgurl: string, query: string): void;
    //分享
    shareAppMessage(title: string, imgurl: string, query: string): Promise<any>;

    updateShareMenu(withticket): Promise<any>;
    //带标志发送
    shareApp(title: string, imgurl: string, query: string): Promise<any>;

    //显示广告
    showAD(): void;

    //存储排行数据
    setUserCloudStorage(kvobj: any): void;

    //向数据域发消息
    sendShareData(kvobj: any): void;

    //获取启动参数
    getLaunchOptionsSync(): any;
    //监听小游戏回到前台的事件
    getOnShow(callback: any): void;
    //监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件。
    getOnHide(callback: any): void;
    //流量主视频广告调用方法
    showA(ad_id: string, success_callback: any, err_callback: any): void;
    //显示广告-banner
    showBA(ad_id: string): void;
    //隐藏广告
    hideBA(): void;
    //摧毁广告
    destroyBA(): void;
    //显示微信菊花转
    showLoading(): void;
    //隐藏微信菊花转
    hideLoading(): void;
    /** 显示提示界面 */
    showMessage(title: string, imgurl: string, callback: Function): void;

    /** 隐藏提示界面 */
    hideMessage(): void;

    /** 显示情景对话框 */
    //callback arg   true:用户点击确定 fasle:用户点击取消
    showModal(title: string, content: string, callback: Function, showCancel: boolean): void;
}

class DebugPlatform implements Platform {
    openDataContext: any;
    async getUserInfo() {
        return { nickName: "username" }

    }
    async createUserInfoButton() {

    }
    async setKeepScreenOn() {

    };
    async login() {

    }
    async setDefaultShare(title: string, imgurl: string, query: string) {
    }
    async showAD() {
    }
    //分享重生
    async rebornGame(title: string, imgurl: string, query: string): Promise<any> {

    }
    async setUserCloudStorage(kvobj: any) {

    }

    async shareAppMessage(title: string, imgurl: string, query: string): Promise<any> { }

    sendShareData(kvobj: any) { }

    getLaunchOptionsSync(): any { }

    async shareApp(title: string, imgurl: string, query: string): Promise<any> { }
    //设置回到前台事件
    getOnShow(callback: any) { }
    //监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件。
    getOnHide(callback: any) { };
    async updateShareMenu(withticket): Promise<any> { }
    //流量主视频广告调用方法
    showA(ad_id: string, success_callback: any, err_callback: any) { }
    //显示广告-banner
    showBA(ad_id: string) { }
    //隐藏广告
    hideBA() { }
    //摧毁广告
    destroyBA() { }
    //显示微信菊花转
    showLoading() { }
    //隐藏微信菊花转
    hideLoading() { }
    async showMessage(title: string, imgurl: string, callback: Function) { }

    async hideMessage() { }

    async showModal(title: string, content: string, callback: Function, showCancel: boolean) { }
}


if (!window.platform) {
    window.platform = new DebugPlatform();
}



declare let platform: Platform;

declare interface Window {

    platform: Platform
}