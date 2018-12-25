// TypeScript file

/**
 * class name : SkillComponent
 * description : 升级时玩家选择的技能
 * time : 2018.12.25
 * @author : 杨浩然
 */
class SkillComponent extends eui.Component
{
    public id: number = 0;//skill在配置文件中的编号

    public addMaxHpValue: number = 0;//增加血量上限值
    public addHpValue: number = 0;//增加血量
    public addPowerValue: number = 0;//增加威力
    public addRangeValue: number = 0;//增加射程
    public addArrowNum: number = 0;//增加箭的数量
    public hemophagia: boolean = false;//攻击吸血
    public changeRes: number = 0;//换弓箭资源

    public constructor()
    {
        super();
    }


    protected createChildren()
    {
        
    }

    public enable()
    {
        let config;
        this.addMaxHpValue = config.addMaxHpValue;
        this.addHpValue = config.addHpValue;
        this.addPowerValue = config.addPowerValue;
        this.addRangeValue = config.addRangeValue;
        this.addArrowNum = config.addArrowNum;
        this.hemophagia = config.hemophagia;
        this.changeRes = config.changeRes;

        let player = Main.instance.gameView.player;
        player.addSkillProperty(this);
    }

//class end
}