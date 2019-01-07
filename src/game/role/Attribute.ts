// TypeScript file

/**
 * class name : Ability
 * description : 角色身上所挂的能力
 * time : 2018.12.29
 * @author : 杨浩然
 */
class Attribute extends BaseAttribute
{
    
    // public static MAX_ARROW_NUM = 7; 
    
    // public arrowNum: number;//箭的数量
    // public power: number;//箭的威力
    // public range: number;//射程
    // public hemophagia: boolean;//攻击是否吸血
    // public res: string;//弓箭的资源
    //人物基础属性
    // public hp: number;//当前血量
	// public get HP() { return this.hp; }
	// public maxHp: number;//最大血量
	// public get MaxHP() { return this.maxHp; }
	// public level: number;//当前等级
	// public get Level() { return this.level; }
	// public shieldPower: number;//护甲值，用于计算伤害
	// public critRate: number//暴击率
	// public exp: number;//当前经验值
	// public expMax: number;//当前最大经验（升级所需经验）
	// public role_img:eui.Image;
	// public speed:number;//移动速度
    //技能属性
    // NONE,//空
    // AttackTypeIntensive,//攻击方式强化
    // CriticalIntensive,//暴击强化
    // AttackPowerIntensive,//攻击力强化
    // DefenseIntensive,//防御强化
    // ResumeBloodIntensive,//回血加强
    // AddExpIntensive,//加经验加强
    // SpeedIntensive,//移速强化
    // Hemophagia,//攻击吸血
    // KillOthenAddBlood,//击杀回血
    static attackTypeArr:Array<number>;
    static criticalArr:Array<number>;
    static attackPowerArr:Array<number>;
    static defenseArr:Array<number>;
    static resumeBloodArr:Array<number>;
    static addExpArr:Array<number>;

    public obj: Role;//挂载的玩家对象
    public weaponType:WeaponType;//武器类型,弓箭，喷子等

    public AttackTypeLv:number;//攻击方式等级（武器等级）
    public CriticalLv:number;//暴击等级
    public AttackPowerLv:number;//攻击力等级(子弹等级)
    public DefenseLv:number;//防御等级
    public ResumeBloodLv:number;//回血等级
    public AddExpLv:number;//加经验等级

    public SpeedIntensive:boolean;//移速加强
    public Hemophagia:boolean;//伤害吸血
    public KillOthenAddBlood:boolean;//击杀吸血

    public constructor(obj: Role)
    {
        super();

        this.obj = obj;
        this.weaponType = WeaponType.BOW;
        this.hp = 50;
        this.hpMax = 50;
        this.level = 1;
        this.exp = 0;
        this.expMax = 10;
        this.speed = 100;
        this.power = 10;
        
        this.totalExp = 0;//本局总经验

        this.AttackTypeLv = 0;
        this.CriticalLv = 0;
        this.AttackPowerLv = 0;
        this.DefenseLv = 0;
        this.AddExpLv =  0;
        this.ResumeBloodLv = 0;

        this.SpeedIntensive = false;
        this.Hemophagia = false;
        this.KillOthenAddBlood = false;

        Attribute.attackTypeArr = [1,2,3,4,5];
        Attribute.criticalArr = [0,0.1,0.2,0.3,0.4,0.5];
        Attribute.attackPowerArr = [0,0.1,0.2,0.3,0.4,0.5];
        Attribute.defenseArr = [0,0.1,0.2,0.3,0.4,0.5];
        Attribute.resumeBloodArr = [0,0.2,0.4,0.6,0.8,1];
        Attribute.addExpArr = [0,0.2,0.4,0.6,0.8,1];

        // this.arrowNum = 1;
        // this.range = 300;
        // this.power = 10;
        // this.level = 1;
        // this.hemophagia = false;
        // this.res = "game_title_rope_png";
    }

    /** 技能生效 */
    public enable(skill: SkillType)
    {
        switch(skill)
        {
            case SkillType.AttackPowerIntensive://攻击力
                this.AttackPowerLv++;
                this.AttackPowerLv = this.AttackPowerLv < Attribute.attackPowerArr.length -1 ? this.AttackPowerLv : Attribute.attackPowerArr.length -1;
                break;
            case SkillType.AttackTypeIntensive://武器等级
                this.AttackTypeLv++;
                this.AttackTypeLv = this.AttackTypeLv < Attribute.attackTypeArr.length - 1 ? this.AttackTypeLv : Attribute.attackTypeArr.length - 1;
                break;
            case SkillType.CriticalIntensive://暴击
                this.CriticalLv++;
                this.CriticalLv = this.CriticalLv < Attribute.criticalArr.length - 1 ? this.CriticalLv : Attribute.criticalArr.length - 1;
                break;
            case SkillType.DefenseIntensive://防御
                this.DefenseLv++;
                this.DefenseLv = this.DefenseLv < Attribute.defenseArr.length - 1 ? this.DefenseLv : Attribute.defenseArr.length - 1 ;
                break;
            case SkillType.AddExpIntensive://加经验
                this.AddExpLv++;
                this.AddExpLv = this.AddExpLv < Attribute.addExpArr.length - 1 ? this.AddExpLv : Attribute.addExpArr.length - 1;
                break;
            case SkillType.ResumeBloodIntensive://回血
                this.ResumeBloodLv++;
                this.ResumeBloodLv = this.ResumeBloodLv < Attribute.resumeBloodArr.length - 1 ? this.ResumeBloodLv : Attribute.resumeBloodArr.length - 1;
            case SkillType.Hemophagia://攻击吸血
                this.Hemophagia = true;
                break;
            case SkillType.SpeedIntensive://移动加速
                this.SpeedIntensive = true;
                break;
            case SkillType.KillOthenAddBlood://击杀回血
                this.KillOthenAddBlood = true;
                break;
        }
    }


//class end
}