// TypeScript file



enum EnemyState
{
    IDLE,//待机
    WALK,//移动
    CHASE,//追击玩家
    ATTACK,//攻击玩家
    RUNAWAY,//逃跑
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
/**谁的子弹*/
enum WhosBullet
{
    NONE,
    PLAYER,
    ENEMY
}
/**谁的防御盾*/
enum WhosShield{
    NONE,
    PLAYER,
    ENEMY
}

enum WeaponType
{
    NONE = -1,
    BOW = 0,//弓箭
    SHOTGUN = 1,//散弹枪
    ROTARY_DARTS = 2,//旋转镖
    GRENADEBAG=3,
    ROTARY_SHIELD = 4,//旋转盾
    MAX_COUNT//最大数
 
}

enum BowSkillType
{
    NONE,
    AttackTypeIntensive,//攻击方式强化
    AddArrowNum,//箭的数量+1
    BackAttack,//后放箭
}

enum ShotgunSkillType
{
    NONE,
    AttackTypeIntensive,//攻击方式强化
}

//技能
enum SkillType{
    NONE,//空
    CriticalIntensive,//暴击强化
    AttackPowerIntensive,//攻击力强化
    DefenseIntensive,//防御强化
    ResumeBloodIntensive,//回血加强
    AddExpIntensive,//加经验加强
    SpeedIntensive,//移速强化
    Hemophagia,//攻击吸血
    KillOthenAddBlood,//击杀回血
    AddHpMax,//增加最大血量
}
