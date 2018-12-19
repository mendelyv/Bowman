// TypeScript file

//AI v2.0
//AI效果如下：

//1.将怪物分为以下几种状态：
//待机状态（该状态有两种行为：原地呼吸，和游走，可通过权重配置待机状态下的两种行为的发生的比例）
//警戒状态（怪物向玩家发出警告，并盯着玩家）
//追击状态（怪物跑向玩家）
//返回状态（跑回出生位置，该状态下不再理会玩家）

//2.可以为怪物配置各项状态的数值
//游走半径，待机状态下，怪物游走时不会超过这个范围，根据出生点计算
//警戒半径，当玩家与怪物之间距离小于警戒半径时进入警戒状态，根据怪物实时位置计算
//自卫半径，当玩家与怪物之间距离小于自卫半径时进入追击状态
//追击半径，怪物追击玩家时，自身不会超过这个范围，超出后跑回出生点，可以理解为最大活动范围
//攻击距离，当玩家与怪物之间的距离小于攻击距离时攻击

//3.各项数值设定的关系如下
//比较合理的关系是：追击半径 > 警戒半径 > 自卫半径 > 攻击距离，游走半径只需要小于追击半径即可
// 1）自卫半径不建议大于警戒半径，否则就无法触发警戒状态，直接开始追击了
// 2）攻击距离不建议大于自卫半径，否则就无法触发追击状态，直接开始战斗了
// 3）游走半径不建议大于追击半径，否则怪物可能刚刚开始追击就返回出生点

/**
 * class name : EnemyAI
 * description : 敌人AI
 * time : 2018.12.18
 * @author : 杨浩然
 */
class EnemyAI
{
    public state: EnemyState;//状态
    public wanderRadius;//游走半径，移动状态下，如果超出游走半径会返回出生位置
    public alertRadius;//警戒半径，玩家进入后怪物会发出警告，并一直朝向玩家
    public defendRadius;//自卫半径，玩家进入后怪物会追击玩家，当距离<攻击距离则会发动攻击
    public chaseRadius;//追击半径，当怪物超出这个追击半径后放弃追击，返回初始位置
    public attackRadius;//攻击半径，当玩家进入这个半径后就发起攻击
    public player: Role;//主玩家对象
    
    private previousFramesTime: number;//上一帧的时间
    private actionTime: number;//动作计时
    private nextActionTime: number;//要发生动作的时间，当actionTime累加到 >= 这个值时就做动作

    private obj: Role;//AI所挂对象
    private isOn: boolean;//AI是否启动
    public get ON(): boolean { return this.isOn; }
    private initialPoint: egret.Point;//出生的位置

    public constructor(obj: Role)
    {
        this.obj = obj;
        this.isOn = false;
        this.state = EnemyState.IDLE;
    }

    public startAI()
    {
        this.isOn = true;
        // this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        // console.log(" ===== 打开" + this.player.nickName + "AI ===== ");
        this.previousFramesTime = egret.getTimer();
        this.state = EnemyState.IDLE;
        this.nextActionTime = 0;
    }

    //帧更新函数
    private update()
    {
        if(!this.isOn) return;
        //先看淘汰了没
        // if(this.obj.isWeedOut) 
        // {
        //     this.stop();
        //     return;
        // }

        //先更新动作计时
        this.actionTime += (egret.getTimer() - this.previousFramesTime);

        // if(this.actionTime < this.nextActionTime) return;

        this.actionTime = 0;
        //根据状态做事情
        switch(this.state)
        {
            case EnemyState.IDLE :
            break;

            case EnemyState.IDLE:
                // anim.SetInteger("State", animID["Idle"]);
                // anim.SetBool("canAttack", false);

                // //导航在站立状态下要停止
                // if (!nav.isStopped)
                //     nav.Stop();
                if (this.actionTime > this.nextActionTime)//时间到再一次思考
                {
                    this.actionTime = 0;//更新计时器时间
                    this.randomState();//随机切换指令，随机思考干什么
                }
                //该状态下的检测指令
                this.idleCheck();
            break;

            //游走状态，根据状态随机时生成的目标位置修改朝向，并向前移动
            case EnemyState.WALK:
                // anim.SetInteger("State", animID["Walk"]);

                // //要行走开启导航
                // if (nav.isStopped)
                //     nav.isStopped = false;
                // nav.speed = walkSpeed;

                if (this.actionTime > this.nextActionTime)//时间到再一次思考
                {
                    this.actionTime = 0;//更新计时器时间
                    this.randomState();//随机切换指令，随机思考干什么
                }
                //该状态下的检测指令
                this.walkCheck();
            break;

            //警戒状态，播放一次动画和声音，并持续朝向玩家位置
            case EnemyState.WARN:
                // if (!isWarned)
                // {
                //     //警戒状态下导航停止
                //     nav.Stop();
                //     anim.SetInteger("State", animID["Warn"]);
                //     isWarned = true;
                // }

                // //持续朝向玩家位置
                // playerRotation = Quaternion.LookRotation(player.transform.position - transform.position, Vector3.up);
                // transform.rotation = Quaternion.Slerp(transform.rotation, playerRotation, turnSpeed);

                //该状态下检测指令
                this.warnCheck();
            break;

            //追击状态，朝着玩家跑去
            case EnemyState.CHASE:
                // if (!isRunning)
                // {
                //     anim.SetInteger("State", animID["Run"]);
                //     anim.SetBool("canAttack", false);
                //     isRunning = true;
                // }
                // if (nav.isStopped)
                //     nav.isStopped = false;
                // nav.speed = runSpeed;
                // nav.SetDestination(player.transform.position);

                // //持续朝向玩家位置
                // playerRotation = Quaternion.LookRotation(player.transform.position - transform.position, Vector3.up);
                // transform.rotation = Quaternion.Slerp(transform.rotation, playerRotation, turnSpeed);
                //该状态下的检测指令
                this.chaseCheck();
            break;

            case EnemyState.ATTACK:
                // //攻击动画播放由攻击脚本控制，伤害函数由动画帧调用
                // if (!attackScript.canAttackPlayer)
                //     attackScript.canAttackPlayer = true;

                this.attackCheck();
            break;

            //返回状态，超出追击范围后返回出生位置
            case EnemyState.RETURN:
                // //朝向初始位置移动
                // if (nav.isStopped)
                //     nav.isStopped = false;
                // nav.speed = walkSpeed;
                // nav.SetDestination(initialPosition);

                // //播放步行动画
                // anim.SetInteger("State", animID["Walk"]);

                //该状态下的检测指令
                this.returnCheck();
            break;
        
            default : console.warn(" ----- 未找到对应的 EnemyState ----- "); break;
        }

        this.previousFramesTime = egret.getTimer();//刷新上一帧时间
    }

    /** 重置 */
    public reset(EnemyState: EnemyState)
    {
        this.isOn = true;
        this.state = EnemyState;
        this.nextActionTime = 0;
    }

    /** 随机切换指令，随机思考干什么 */
    private randomState()
    {

    }

    /** 停止，移除帧事件监听 */ 
    public stop()
    {
        if(!this.isOn) return;
        
        this.isOn = false;
        // this.removeEventListener(egret.Event.ENTER_FRAME, this.updateAI, this);
        // console.log(" ===== 停止" + this.player.nickName + "AI ===== ");
    }


    // ===== 对应状态的检查函数 start =====
    private idleCheck()
    {
        if(!this.player) return;
        let distancePlayer = egret.Point.distance(new egret.Point(this.obj.x, this.obj.y), new egret.Point(this.player.x, this.player.y));
        //如果距离可以攻击
        if(distancePlayer <= this.attackRadius)
        {
            //攻击
        }
        //如果进入自卫半径
        else if(distancePlayer < this.defendRadius)
        {
            this.state = EnemyState.CHASE;
        }
        //如果进入警戒半径
        else if(distancePlayer < this.alertRadius)
        {
            this.state = EnemyState.WARN;
        }
    }

    private walkCheck()
    {
        if(!this.player) return;

        let distancePlayer = egret.Point.distance(new egret.Point(this.obj.x, this.obj.y), new egret.Point(this.player.x, this.player.y));
        //如果距离可以攻击
        if(distancePlayer <= this.attackRadius)
        {
            //攻击
        }
        //如果进入自卫半径
        else if(distancePlayer < this.defendRadius)
        {
            this.state = EnemyState.CHASE;
        }
        //如果进入警戒半径
        else if(distancePlayer < this.alertRadius)
        {
            this.state = EnemyState.WARN;
        }
        //如果超出活动半径
    }

    private warnCheck()
    {
        if(!this.player) return;

        let distancePlayer = egret.Point.distance(new egret.Point(this.obj.x, this.obj.y), new egret.Point(this.player.x, this.player.y));
        //如果进入自卫半径，取消警戒状态，进入追击状态
        if(distancePlayer < this.defendRadius)
        {
            this.state = EnemyState.CHASE;
        }
        //如果超出警戒半径，取消警戒状态，然后继续思考
        if(distancePlayer > this.alertRadius)
        {
            this.randomState();
        }
    }

    private chaseCheck()
    {
        if(!this.player) return;

        let distancePlayer = egret.Point.distance(new egret.Point(this.obj.x, this.obj.y), new egret.Point(this.player.x, this.player.y));
        if(distancePlayer < this.attackRadius)
        {
            //攻击
        }
        //如果超出追击范围或者敌人的距离超出警戒距离就返回
        if(distancePlayer > this.chaseRadius || distancePlayer > this.alertRadius)
        {
            this.state = EnemyState.RETURN;
        }
    }

    private attackCheck()
    {
        if(!this.player) return;

        let distancePlayer = egret.Point.distance(new egret.Point(this.obj.x, this.obj.y), new egret.Point(this.player.x, this.player.y));
        if(distancePlayer > this.attackRadius)
        {
            this.state = EnemyState.CHASE;
        }
        
    }

    private returnCheck()
    {
        if(!this.player) return;

        let distancePlayer = egret.Point.distance(new egret.Point(this.obj.x, this.obj.y), new egret.Point(this.player.x, this.player.y));
    }
    // ===== 对应状态的检查函数 end =====



    public destructor()
    {
        this.stop();
    }

//class end
}