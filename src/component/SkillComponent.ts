// TypeScript file

/**
 * class name : SkillComponent
 * description : 升级时玩家选择的技能
 * time : 2018.12.25
 * @author : 杨浩然
 */
class SkillComponent extends eui.Component
{
    private bg: eui.Image;
    private skillType:WeaponType;//技能类型
    private skill:number;//具体技能

    public constructor(skillType:WeaponType,skill:number)
    {
        super();
        this.skillType = skillType;
        this.skill = skill;
    }

    protected createChildren()
    {
        this.skinName = "SkillComponentSkin";
        this.init();
    }

    public init()
    {
        if(this.skillType == WeaponType.NONE)
        {
            //通用技能skillCommom_9_jpg
            this.bg.source = "skillCommom_"+this.skill+"_jpg";
        }
        else
        {
            //武器技能
            this.bg.source = "skill_"+ this.skillType + "_" + this.skill +"_jpg";
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    }

    public onBtnClick()
    {
        Main.instance.gameView.playerAddSkill(this.skillType,this.skill);
    }



//class end
}

class Skill {
	public skillType:WeaponType;
	public skill:number;
	public constructor(skillType:WeaponType,skill:number) {
		this.skillType = skillType;
		this.skill = skill;
	}
}