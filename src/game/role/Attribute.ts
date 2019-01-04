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
    //AttackTypeIntensive,//攻击方式强化
    // CriticalIntensive,//暴击强化
    // AttackPowerIntensive,//攻击力强化
    // DefenseIntensive,//防御强化
    // SpeedIntensive,//移速强化
    // Hemophagia,//攻击吸血
    // KillOthenAddBlood,//击杀回血
    static attackTypeArr:Array<number>;
    static criticalArr:Array<number>;
    static attackPowerArr:Array<number>;
    static defenseArr:Array<number>;

    public obj: Role;//挂载的玩家对象
    public AttackTypeLv:number;//攻击方式等级（武器等级）
    public CriticalLv:number;//暴击等级
    public AttackPowerLv:number;//攻击力等级(子弹等级)
    public DefenseLv:number;//防御等级
    public SpeedIntensive:boolean;//移速加强
    public Hemophagia:boolean;//伤害吸血
    public KillOthenAddBlood:boolean;//击杀吸血

    public constructor(obj: Role)
    {
        super();

        this.obj = obj;
        this.hp = 50;
        this.hpMax = 50;
        this.level = 1;
        this.exp = 0;
        this.expMax = 10;
        this.speed = 100;
        
        this.AttackTypeLv = 0;
        this.CriticalLv = 0;
        this.AttackPowerLv = 0;
        this.DefenseLv = 0;
        this.SpeedIntensive = false;
        this.Hemophagia = false;
        this.KillOthenAddBlood = false;

        Attribute.attackTypeArr = [1,2,3,4,5];
        Attribute.criticalArr = [0.1,0.2,0.3,0.4,0.5];
        Attribute.attackPowerArr = [0.1,0.2,0.3,0.4,0.5];
        Attribute.defenseArr = [0.1,0.2,0.3,0.4,0.5];

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
            case SkillType.AttackPowerIntensive:
                this.AttackPowerLv++;
                break;
            case SkillType.AttackTypeIntensive:
                this.AttackTypeLv++;
                break;
            case SkillType.CriticalIntensive:
                this.CriticalLv++;
                break;
            case SkillType.DefenseIntensive:
                this.DefenseLv++;
                break;
            case SkillType.Hemophagia:
                this.Hemophagia = true;
                break;
            case SkillType.SpeedIntensive:
                this.SpeedIntensive = true;
                break;
            case SkillType.KillOthenAddBlood:
                this.KillOthenAddBlood = true;
                break;
        }
        //如果加血的属性不为0，即代表要提高血量和加血
        // if(skill.addMaxHpValue != 0 && skill.addHpValue != 0)
        // {
        //     this.hpMax += skill.addMaxHpValue;
		//     this.hp += skill.addHpValue;
        //     console.log(skill.addMaxHpValue);
        //     console.log(this.hpMax);
        //     this.obj.hpTube.updateHpLine(this.hpMax);
        // }
        // //根据配置文件给其他变量赋值
        // if(this.arrowNum < Attribute.MAX_ARROW_NUM)
        //     this.arrowNum += skill.addArrowNum;
        // if(!this.hemophagia)
        //     this.hemophagia = skill.hemophagia;
        // this.power += skill.addPowerValue;
        // this.range += skill.addRangeValue;
        // this.res = skill.changeRes;
    }


//class end
}