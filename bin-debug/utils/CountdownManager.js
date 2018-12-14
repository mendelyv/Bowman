// /**
//  * 倒计时管理器
//  */
// class CountdownManager{
//     private timer:egret.Timer;//倒计时控制器
//     private num:number=0;//倒计时时间
//     private curnum:number=0;//当前倒计时时间
//     private timertype:number=0;//属于哪一种倒计时
//     /**
//      * 构造函数
//      * 
//      */
//     public constructor(num:number,timertype:number) {
//         this.initWating(num,timertype);
//     }
//      private initWating(num:number,timertype:number){
//          this.num= num;
//          this.timertype = timertype;
//          this.curnum=this.num;
//     }
//     public timeStart()
//     {//每次重新创建 ，没有使用reset 是因为没办法 监听到 jitimercurFunc timerCompleteFunc到这两个方法
//        this.curnum=this.num;
//        this.timer=new egret.Timer(1000,this.num);
//                  //注册事件侦听器
//        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timercurFunc,this);
//        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerCompleteFunc,this);
//        this.timer.start();
//     }
//     public timeStop()
//     {
//        //结束计时
//          this.timer.stop();
//     }
//     private timercurFunc(){
//         this.curnum--;
//         //  QMGameMainFrame.qmgmf.timercurFunc(this.curnum,this.timertype);
//     }
//     private timerCompleteFunc(){
//          //注册事件侦听器
//          this.timer.removeEventListener(egret.TimerEvent.TIMER,this.timercurFunc,this);
//          this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerCompleteFunc,this);
//         //  QMGameMainFrame.qmgmf.timerCompleteFunc(this.timertype);
//     }
// } 
