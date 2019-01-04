// TypeScript file



enum EnemyState
{
    IDLE,//待机
    WALK,//移动
    CHASE,//追击玩家
    ATTACK,//攻击玩家
    RETURN,//超出追击范围返回
}

enum SceneState
{
    LOGIN,//登陆界面
    MAIN,//主界面
    GAMEING,//游戏界面
}

enum MapItemType
{
    NONE,//空
    OBSTACAL,//障碍物
    PROP_EXP,//经验道具
    PROP_BLOOD,//血道具
}

enum WhosArrow
{
    NONE,
    PLAYER,
    ENEMY
}

//技能
enum SkillType{
    NONE,//空
    AttackTypeIntensive,//攻击方式强化
    CriticalIntensive,//暴击强化
    AttackPowerIntensive,//攻击力强化
    DefenseIntensive,//防御强化
    SpeedIntensive,//移速强化
    Hemophagia,//攻击吸血
    KillOthenAddBlood,//击杀回血
}
