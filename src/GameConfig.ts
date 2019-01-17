
/**
 * 统一设置游戏所有配置参数，含版本号，参数地址等
 * 
 */
class GameConfig {
    public static WORD_CONFIG_DATA = [];//多语言配置数据
    public static VER_CONTROL = "wechat";//控制版本模式 test 测试登录 wechat 微信登录
    public static IS_DEBUG: boolean = false;//默认不显示 加速按钮
    public static CUR_VERNO: number = 3;//当前游戏版本

    public static scenceConfig;//场景配置表
    public static obstacalsConfig;//障碍配置表
    public static skillConfig;//技能配置表
    public static playerConfig;//玩家配置表
    public static enemyConfig;//敌人配置表
    public static nameConfig;//敌人名字配置表

    // http通讯地址,请自行填入自己的服务器地址，若有跨域问题则点开开发工具详情，勾选不校验合法域名
    private static headUrl: string = 'https://bowman.taoke93.com';//正式服服务器地址
    // private static headUrl: string = 'https://gmkun.taoke93.com';//测试服服务器地址
    // 游戏版本号
    private static verNo: number = 1;//现在服务器的版本
    // 视频广告ID
    private static VOID: string = "";
    // 横幅广告ID
    private static ADID: string = "";
    // 看广告百分比 默认100%
    private static VOIDPER: number = 100;
    // 游戏基本分享标题
    private static shareData: ShareData; //= "我爱98k";
    // 游戏分享类型 1主动分享 2分享后加速 3分享后得金币 4点我翻倍 5双倍领取签到奖励
    private static shareType: number = 1;

    //static nameary:string[] = ["大大1","大大2","大大3","大大4","大大5","大大6","大大7","大大8"];
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
    // public static fenlieTime:number = 1000;
    /*喷射时长*/
    // public static jetTime:number = 3000;

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
    public static getHeadUrl() {
        // if (GameConfig.VER_CONTROL == "wechat") {
        //     this.headUrl = 'https://gmkun.vmobs.net';//正式服服务器地址
        // }
        // else if (GameConfig.VER_CONTROL == "test") {
        //     this.headUrl = 'https://gmkun.taoke93.com';//测试服服务器地址
        // }
        return this.headUrl;
    }

    public static getVerNo() { return this.verNo };
    public static setVerNo(no: number): void { this.verNo = no };
    // 视频广告ID
    public static getVOID() { return this.VOID };
    public static setVOID(no: string): void { this.VOID = no };
    // 横幅广告ID
    public static getADID() { return this.ADID };
    public static setADID(no: string): void { this.ADID = no };
    //获取看视频广告百分比
    public static getVOIDPER() { return this.VOIDPER };
    public static setVOIDPER(per: number): void { this.VOIDPER = per };
    /**获取分享标题和图片地址 */
    public static getShareData() {
        let random: number = Util.getRandomRange(1, 3);
        let title: string = Util.getWordBySign("shareTitle" + random);
        let imgurl: string = Util.getWordBySign("shareImg" + random);
        let data: ShareData = new ShareData();
        data.title = title;
        data.imgurl = imgurl;
        return data;
    };

    public static getShareType() { return this.shareType };

    public static setShareType(type: number): void { this.shareType = type };
}
/**分享数据 */
class ShareData {
    public title: string;//分享标题
    public imgurl: string;//分享图片
}