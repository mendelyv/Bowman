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