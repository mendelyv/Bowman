// TypeScript file

/**
 * class name : Ability
 * description : 角色身上所挂的能力
 * time : 2018.12.29
 * @author : 杨浩然
 */
class Attribute
{
    public static MAX_ARROW_NUM = 7;

    public obj: Role;//挂载的玩家对象

    public arrowNum: number;//箭的数量
    public power: number;//箭的威力
    public range: number;//射程
    public hemophagia: boolean;//攻击是否吸血
    public res: string;//弓箭的资源
    //人物基础属性
    public hp: number;//当前血量
	public get HP() { return this.hp; }
	public maxHp: number;//最大血量
	public get MaxHP() { return this.maxHp; }
	public level: number;//当前等级
	public get Level() { return this.level; }
	public shieldPower: number;//护甲值，用于计算伤害
	public critRate: number//暴击率
	public exp: number;//当前经验值
	public expMax: number;//当前最大经验（升级所需经验）
	public role_img:eui.Image;
	public speed:number;//移动速度
	public angle:number

    public constructor(obj: Role)
    {
        this.obj = obj;
        this.arrowNum = 1;
        this.range = 300;
        this.power = 10;
        this.level = 1;
        this.hemophagia = false;
        this.res = "game_title_rope_png";
    }

    /** 技能生效 */
    public enable(skill: any)
    {
        //如果加血的属性不为0，即代表要提高血量和加血
        if(skill.addMaxHpValue != 0 && skill.addHpValue != 0)
        {
            this.maxHp += skill.addMaxHpValue;
		    this.hp += skill.addHpValue;
            this.obj.hpTube.showHp();
        }
        //根据配置文件给其他变量赋值
        if(this.arrowNum < Attribute.MAX_ARROW_NUM)
            this.arrowNum += skill.addArrowNum;
        if(!this.hemophagia)
            this.hemophagia = skill.hemophagia;
        this.power += skill.addPowerValue;
        this.range += skill.addRangeValue;
        this.res = skill.changeRes;
    }


//class end
}