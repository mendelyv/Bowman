// TypeScript file

/**
 * class name : BattleManager
 * description : 战斗管理
 * time : 2018.12.26
 * @author : 杨浩然
 */
class BattleManager
{
    //弓箭数组
    public arrows: Array<Arrow>;
    //敌人数组
    public enemys: Array<Enemy>;
    //玩家
    public player: Player;

    public constructor(player: Player)
    {
        this.arrows = new Array<Arrow>();
        this.enemys = new Array<Enemy>();
        this.player = player;
    }

    public update()
    {
        //战斗更新逻辑
        
    }

//class end
}