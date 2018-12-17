// TypeScript file

/**
 * class name : EnemyAI
 * description : 敌人AI
 * time : 2018.11.3
 * @author : 杨浩然
 */
class EnemyAI
{
    public state: EnemyState;//状态

    private obj: Role;//AI所挂对象
    private isOn: boolean;//AI是否启动
    public get ON(): boolean { return this.isOn; }

    private previousFramesTime: number;//上一帧的时间
    private actionTime: number;//动作计时
    private nextActionTime: number;//要发生动作的时间，当actionTime累加到 >= 这个值时就做动作
    
    public constructor(obj: Role)
    {
        this.obj = obj;
        this.isOn = false;
        this.state = EnemyState.IDLE;
    }

    public startAI()
    {
        this.isOn = true;
        // this.addEventListener(egret.Event.ENTER_FRAME, this.updateAI, this);
        // console.log(" ===== 打开" + this.player.nickName + "AI ===== ");
        this.previousFramesTime = egret.getTimer();
        // this.state = EnemyState.GET_QUESTION;
        this.nextActionTime = 0;
    }

    //帧更新函数
    private updateAI()
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
        this.previousFramesTime = egret.getTimer();//刷新上一帧时间
        // console.log(this.nextActionTime);
        if(this.actionTime < this.nextActionTime) return;

        this.actionTime = 0;
        //根据状态做事情
        switch(this.state)
        {

            default : console.warn(" ----- 未找到对应的 PlayerState ----- "); break;
        }
    }

    /** 重置 */
    public reset(EnemyState: EnemyState)
    {
        this.isOn = true;
        this.state = EnemyState;
        this.nextActionTime = 0;
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
        //静立不动
    }


    // ===== 对应状态的检查函数 end =====



    public dispose()
    {
        this.stop();
    }

//class end
}