// TypeScript file

/**
 * class name : Ability
 * description : 角色身上所挂的能力
 * time : 2018.12.29
 * @author : 杨浩然
 */
class Ability
{
    public static MAX_ARROW_NUM = 7;

    public obj: Role;//挂载的玩家对象

    public arrowNum: number;//箭的数量
    public power: number;//箭的威力
    public range: number;//射程
    public hemophagia: boolean;//攻击是否吸血
    public res: string;//弓箭的资源

    public constructor(obj: Role)
    {
        this.obj = obj;
        this.arrowNum = 1;
        this.range = 300;
        this.power = 10;
        this.hemophagia = false;
        this.res = "game_title_rope_png";
    }

    /** 技能生效 */
    public enable(skill: SkillComponent)
    {
        //如果加血的属性不为0，即代表要提高血量和加血
        if(skill.addMaxHpValue != 0 && skill.addHpValue != 0)
        {
            this.obj.addHPMaxAndResumeBlood(skill.addMaxHpValue, skill.addHpValue);
        }

        //根据配置文件给其他变量赋值
        if(this.arrowNum < Ability.MAX_ARROW_NUM)
            this.arrowNum += skill.addArrowNum;
        if(!this.hemophagia)
            this.hemophagia = skill.hemophagia;
        this.power += skill.addPowerValue;
        this.range += skill.addRangeValue;
        this.res = skill.changeRes;
    }


//class end
}