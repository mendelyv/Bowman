// TypeScript file

//1.将怪物分为以下几种状态：
//待机状态（该状态有两种行为：原地呼吸，和游走，可通过权重配置待机状态下的两种行为的发生的比例）
//追击状态（怪物跑向玩家）
//攻击状态

//2.可以为怪物配置各项状态的数值
//自卫半径，当玩家与怪物之间距离小于自卫半径时进入追击状态
//追击半径，怪物追击玩家时，自身不会超过这个范围，超出后跑回出生点，可以理解为最大活动范围
//攻击距离，当玩家与怪物之间的距离小于攻击距离时攻击

//3.各项数值设定的关系如下
//比较合理的关系是：追击半径 > 自卫半径 > 攻击距离
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
    public wanderRadius: number = 200;//游走半径，移动状态下，如果超出游走半径会返回出生位置
    public defendRadius: number = 150;//自卫半径，玩家进入后怪物会追击玩家，当距离<攻击距离则会发动攻击
    public chaseRadius: number = 180;//追击半径，当怪物超出这个追击半径后放弃追击，返回初始位置
    public attackRadius: number = 100;//攻击半径，当玩家进入这个半径后就发起攻击
    // public player: Role;//主玩家对象
    
    private previousFramesTime: number;//上一帧的时间
    private actionTime: number = 0;//动作计时
    private nextActionTime: number = 2000;//要发生动作的时间，当actionTime累加到 >= 这个值时就做动作

    private obj: Enemy;//AI所挂对象
    private isOn: boolean;//AI是否启动
    public get ON(): boolean { return this.isOn; }
    private initialPoint: egret.Point;//出生的位置
    private actionWeight = [3000, 5000];//权重

    public constructor(obj: Enemy)
    {
        this.obj = obj;
        this.isOn = false;
        this.state = EnemyState.IDLE;
    }

    /** 打开AI，添加监听事件 */
    public start()
    {
        this.isOn = true;
        this.obj.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        // console.log(" ===== 打开" + this.player.nickName + "AI ===== ");
        this.previousFramesTime = egret.getTimer();
        this.state = EnemyState.IDLE;
        // this.nextActionTime = 0;
    }

    /** 停止AI，移除帧事件监听 */ 
    public stop()
    {
        if(!this.isOn) return;
        
        this.isOn = false;
        this.obj.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        console.log(" ===== 停止AI ===== ");
    }

    //帧更新函数
    private update()
    {
        if(!this.isOn) return;
        // 先看有没有死
        if(this.obj.die) 
        {
            return;
        }

        //先更新动作计时
        this.actionTime += (egret.getTimer() - this.previousFramesTime);

        //根据状态做事情
        switch(this.state)
        {
            case EnemyState.IDLE:
                //站立状态下要清除移动和目标
                this.obj.stopMove();

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
                if (this.actionTime > this.nextActionTime)//时间到再一次思考
                {
                    this.actionTime = 0;//更新计时器时间
                    this.randomState();//随机切换指令，随机思考干什么
                }
                //该状态下的检测指令
                this.walkCheck();
            break;

            //追击状态，朝着玩家跑去
            case EnemyState.CHASE:
                this.obj.follow();
                //该状态下的检测指令
                this.chaseCheck();
            break;

            case EnemyState.ATTACK:
                this.obj.stopMove(false);
                this.obj.attack();
                this.attackCheck();
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
        // this.nextActionTime = 0;
    }

    /** 获取与目标之间的距离 */
    private getTargetDistance(target: Role)
    {
        if(!target) return -1;
        let targetPoint = new egret.Point(target.x, target.y);
        if(target.parent != this.obj.parent)//判断对比双方是否在同一个坐标系中
        {
            targetPoint = this.obj.parent.globalToLocal(targetPoint.x, targetPoint.y);
        }
        return egret.Point.distance(new egret.Point(this.obj.x, this.obj.y), targetPoint);
    }

    /** 随机切换指令，随机思考干什么 */
    private randomState()
    {
        let random = Math.random() * 100000 % this.actionWeight[this.actionWeight.length - 1];
        if(random < this.actionWeight[0])//如果在静止的权重区间
        {
            this.state = EnemyState.IDLE;
        }
        else//在行走的权重区间
        {
            //Ran TODO ：随机一个点位移
            this.state = EnemyState.WALK;
            let x = Math.random() * 10000 % 1920;
            let y = Math.random() * 10000 % 1920;
            let point = new egret.Point(x, y);
            this.obj.gotoPoint(point);
        }
    }

    // ===== 对应状态的检查函数 start =====

    private idleCheck()
    {
        let target = this.findNearTarget();
        let dis = this.getTargetDistance(target);
        if(dis == -1) return;
        //如果距离可以攻击
        if(dis <= this.attackRadius)
        {
            //攻击
            this.state = EnemyState.ATTACK;
            this.obj.target = target;
        }
        //如果进入自卫半径
        else if(dis < this.defendRadius)
        {
            this.state = EnemyState.CHASE;
            this.obj.target = target;
        }
    }

    private walkCheck()
    {
        let target = this.findNearTarget();
        let dis = this.getTargetDistance(target);
        if(dis == -1) return;
        //如果距离可以攻击
        if(dis <= this.attackRadius)
        {
            //攻击
            this.state = EnemyState.ATTACK;
            this.obj.target = target;
        }
        //如果进入自卫半径
        else if(dis < this.defendRadius)
        {
            this.state = EnemyState.CHASE;
        }
    }


    private chaseCheck()
    {
        //如果是在追寻状态，就已经有target了，可以不用寻找
        let target = this.obj.target;
        if(!target)
        {
            this.randomState();
            return;
        }
        let dis = this.getTargetDistance(target);
        if(dis == -1) return;
        if(dis < this.attackRadius)
        {
            //攻击
            this.state = EnemyState.ATTACK;
            this.obj.target = target;
        }
        //如果超出追击范围就返回
        if(dis > this.chaseRadius)
        {
            // this.state = EnemyState.IDLE;
            this.randomState();
            this.obj.target = null;
        }
    }

    private attackCheck()
    {
        let target = this.obj.target;
        if(!target)
        {
            this.randomState();
            return;
        }
        let dis = this.getTargetDistance(target);
        if(dis == -1) return;
        if(target.die)
        {
            this.randomState();
            return;
        }
        if(dis > this.attackRadius)
        {
            this.state = EnemyState.CHASE;
        }
    }

    // ===== 对应状态的检查函数 end =====

    // ===== Test Code start =====
    /** 测试函数，使用不同颜色绘制圆形 */
    public drawCircle()
    {
        let shape = Util.drawCircle(this.defendRadius, Util.s_colors.yellow);
        this.obj.addChild(shape);
        shape.x = this.obj.width / 2;
        shape.y = this.obj.height / 2;
        shape = Util.drawCircle(this.chaseRadius, Util.s_colors.blue);
        this.obj.addChild(shape);
        shape.x = this.obj.width / 2;
        shape.y = this.obj.height / 2;
        shape = Util.drawCircle(this.attackRadius, Util.s_colors.red);
        this.obj.addChild(shape);
        shape.x = this.obj.width / 2;
        shape.y = this.obj.height / 2;
        // shape = Util.drawCircle(this.wanderRadius, Util.s_colors.green);
        // this.obj.addChild(shape);
        // shape.x = this.obj.width / 2;
        // shape.y = this.obj.height / 2;    
    }

    public removeCircle()
    {
        let i = 3;
        while(i > 0)
        {
            this.obj.removeChild(this.obj.getChildAt(this.obj.numChildren - 1));
            i--;
        }
    }
    // ===== Test Code end =====

    public findNearTarget(): Role
    {
        let dis = 0;
        let ret = 100000;
        let index = -1;
        let arr = this.obj.enemys;
        if(arr)
        {
            for(let i = 0; i < arr.length; i++)
            {
                let enemy = arr[i];
                if(!enemy) continue;
                if(enemy.die) continue;
                if(enemy == this.obj) continue;

                dis = this.getTargetDistance(enemy);
                if(dis < ret)
                {
                    index = i;
                    ret = dis;
                }
            }
        }
        let player = Main.instance.gameView.player;
        dis = this.getTargetDistance(player);
        if(dis < ret)
        {
            return player;
        }
        return arr[index];
    }

    public destructor()
    {
        this.stop();
    }


//class end
}
