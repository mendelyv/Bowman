// TypeScript file

/**
 * class name : Ability
 * description : 角色身上所挂的能力
 * time : 2018.12.29
 * @author : 杨浩然
 */
class Attribute extends BaseAttribute
{
    static criticalArr:Array<number>;
    static attackPowerArr:Array<number>;
    static defenseArr:Array<number>;
    static resumeBloodArr:Array<number>;
    static addExpArr:Array<number>;
    static addSpeedArr:Array<number>;
    static addHpMaxArr:Array<number>;

    public obj: Role;//挂载的玩家对象

    public CriticalLv:number;//暴击等级
    public AttackPowerLv:number;//攻击力等级(子弹等级)
    public DefenseLv:number;//防御等级
    public ResumeBloodLv:number;//回血等级
    public AddExpLv:number;//加经验等级
    public AddSpeedLv:number;//移速加强等级
    public AddHpMaxLv:number;//加最大血量等级

    public Hemophagia:boolean;//伤害吸血
    public KillOthenAddBlood:boolean;//击杀吸血
    public Rotary_darts:boolean;//旋转镖
    public Rotary_shield:boolean;//旋转盾

    public constructor(obj: Role)
    {
        super();

        this.obj = obj;

        this.totalExp = 0;//本局总经验

        this.clearAllSkills();

        Attribute.criticalArr = [0,0.1,0.2,0.3,0.4,0.5];
        Attribute.defenseArr = [0,0.1,0.2,0.3,0.4,0.5];
        Attribute.resumeBloodArr = [0,0.2,0.4,0.6,0.8,1];
        Attribute.addExpArr = [0,0.2,0.4,0.6,0.8,1];
        //数值
        Attribute.attackPowerArr = [0,20,40,60,80,100];
        Attribute.addSpeedArr = [0,50,100,150];
        Attribute.addHpMaxArr = [0,100,200,300];
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
            case SkillType.SpeedIntensive://移动加速
                this.AddSpeedLv++;
                this.AddSpeedLv = this.AddSpeedLv < Attribute.addSpeedArr.length - 1 ? this.AddSpeedLv : Attribute.addSpeedArr.length - 1;
                break;
            case SkillType.AddHpMax://增加最大血量
                this.AddHpMaxLv++;
                this.AddHpMaxLv = this.AddHpMaxLv < Attribute.addHpMaxArr.length - 1 ? this.AddHpMaxLv : Attribute.addHpMaxArr.length - 1;
                this.obj.resumeBlood(Attribute.addHpMaxArr[this.AddHpMaxLv],true);
                break;
            case SkillType.Hemophagia://攻击吸血
                this.Hemophagia = true;
                break;
            case SkillType.KillOthenAddBlood://击杀回血
                this.KillOthenAddBlood = true;
                break;
            case SkillType.ROTARY_DARTS://旋转镖
                this.Rotary_darts = true;
                this.obj.getCricleAttack();
                break;
            case SkillType.ROTARY_SHIELD://旋转盾
                this.Rotary_shield = true;
                this.obj.getCricleDefend();
                break;
        }
    }


    public clearAllSkills()
    {
        this.CriticalLv = 0;
        this.AttackPowerLv = 0;
        this.DefenseLv = 0;
        this.AddExpLv =  0;
        this.ResumeBloodLv = 0;
        this.AddSpeedLv = 0;
        this.AddHpMaxLv = 0;

        this.Hemophagia = false;
        this.KillOthenAddBlood = false;
        this.Rotary_darts = false;
        this.Rotary_shield = false;
    }

    public get HpMax()
    {
        let hpMax = this.hpMax + Attribute.addHpMaxArr[this.AddHpMaxLv];
        return hpMax;
    }

    public set HpMax(value:number)
    {
        this.hpMax = value;
    }

//class end
}