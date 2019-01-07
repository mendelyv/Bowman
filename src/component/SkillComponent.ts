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
    private skillType:SkillType;//技能类型

    public constructor(skillType)
    {
        super();
        this.skillType = skillType;
    }

    protected createChildren()
    {
        this.skinName = "SkillComponentSkin";
        this.init();
    }

    public init()
    {
        let index = this.skillType as number;
        this.bg.source = "skill_"+index+"_jpg";
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    }

    public onBtnClick()
    {
        Main.instance.gameView.playerAddSkill(this.skillType);
    }



//class end
}