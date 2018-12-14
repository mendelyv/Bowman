var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 统一设置游戏所有配置参数，含版本号，参数地址等
 *
 */
var GameConfig = (function () {
    function GameConfig() {
    }
    //获得随机头像
    // static WWgetRandomRole():number{
    //     return WWAlg.WWrandom(0,11);
    // }
    // /*随机泡泡*/
    // static WWgetRandomPaoPao():number{
    //     return WWAlg.WWrandom(0,11);
    // }
    // //获得随机名字
    // static WWgetRandomName():string{
    //     return GameConfig .nameary[WWAlg.WWrandom(0,GameConfig .nameary.length-1)];
    // }
    /** http通讯地址*/
    GameConfig.getHeadUrl = function () {
        // if (GameConfig.VER_CONTROL == "wechat") {
        //     this.headUrl = 'https://gmkun.vmobs.net';//正式服服务器地址
        // }
        // else if (GameConfig.VER_CONTROL == "test") {
        //     this.headUrl = 'https://gmkun.taoke93.com';//测试服服务器地址
        // }
        return this.headUrl;
    };
    GameConfig.getVerNo = function () { return this.verNo; };
    ;
    GameConfig.setVerNo = function (no) { this.verNo = no; };
    ;
    // 视频广告ID
    GameConfig.getVOID = function () { return this.VOID; };
    ;
    GameConfig.setVOID = function (no) { this.VOID = no; };
    ;
    // 横幅广告ID
    GameConfig.getADID = function () { return this.ADID; };
    ;
    GameConfig.setADID = function (no) { this.ADID = no; };
    ;
    //获取看视频广告百分比
    GameConfig.getVOIDPER = function () { return this.VOIDPER; };
    ;
    GameConfig.setVOIDPER = function (per) { this.VOIDPER = per; };
    ;
    /**获取分享标题和图片地址 */
    GameConfig.getShareData = function () {
        var random = Util.getRandomRange(1, 3);
        var title = Util.getWordBySign("shareTitle" + random);
        var imgurl = Util.getWordBySign("shareImg" + random);
        var data = new ShareData();
        data.title = title;
        data.imgurl = imgurl;
        return data;
    };
    ;
    GameConfig.getShareType = function () { return this.shareType; };
    ;
    GameConfig.setShareType = function (type) { this.shareType = type; };
    ;
    GameConfig.WORD_CONFIG_DATA = [];
    GameConfig.VER_CONTROL = "test"; //控制版本模式 test 测试登录 wechat 微信登录
    GameConfig.BUY_BEI = 1.07; //每次购买后价格提升1.07倍并显示，取整。
    GameConfig.IS_DEBUG = false; //默认不显示 加速按钮
    GameConfig.CUR_VERNO = 3; //当前游戏版本
    // http通讯地址,请自行填入自己的服务器地址，若有跨域问题则点开开发工具详情，勾选不校验合法域名
    GameConfig.headUrl = 'https://gmkun.vmobs.net'; //正式服服务器地址
    // private static headUrl: string = 'https://gmkun.taoke93.com';//测试服服务器地址
    // 游戏版本号
    GameConfig.verNo = 1; //现在服务器的版本
    // 视频广告ID
    GameConfig.VOID = "";
    // 横幅广告ID
    GameConfig.ADID = "";
    // 看广告百分比 默认100%
    GameConfig.VOIDPER = 100;
    // 游戏分享类型 1主动分享 2分享后加速 3分享后得金币 4点我翻倍 5双倍领取签到奖励
    GameConfig.shareType = 1;
    GameConfig.nameary = ["大大1", "大大2", "大大3", "大大4", "大大5", "大大6", "大大7", "大大8"];
    //static roleary:string[] = ["head_0","head_1","head_2","head_3","head_4","head_5","head_6"];
    //static paopaoary:string[] = ["head_0","head_1","head_2","head_3","head_4","head_5","head_6"];
    //static mapwidth:number = 6000;//地图的宽
    //static mapheight:number = 6000;//地图的高
    /**速度减少比例*/
    //public static addSpeedRate: number = 0.0007;
    /**半径增大比例*/
    //public static addRaduisRate: number = 0.3;
    /**玩家最小速度*/
    //public static playerMinSpeed:number = 1;
    /**玩家最大速度*/
    //static playerMaxSpeed:number = 3;
    /**玩家初始半径*/
    //static playerInitRadius: number = 20;
    /**玩家初始重量*/
    //static playerInitWeight: number = 10;
    /**达到重量才能使用分裂技能*/
    //public static fenlieLimit: number = 20;
    /**分裂时，分身移动时间*/
    GameConfig.fenlieTime = 1000;
    /*喷射时长*/
    GameConfig.jetTime = 100;
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
/**分享数据 */
var ShareData = (function () {
    function ShareData() {
    }
    return ShareData;
}());
__reflect(ShareData.prototype, "ShareData");
