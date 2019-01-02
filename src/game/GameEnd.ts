
//游戏结束
class GameEnd extends eui.Component{
	private title:eui.Label;//标题
	private btn_close:eui.Button;//关闭按钮
	private score:eui.Label;//得分
	private btn_share:eui.Button;
	private btn_reStart:eui.Button;
	private panel_gameEnd:eui.Panel;

	private reLife_btnClose:eui.Button;
	private reLife_btnCharge:eui.Button;
	private reLife_btnFree:eui.Button;
	private panel_reLife:eui.Panel;

	public relifeTimer: egret.Timer//复活倒计时时间控制器
	public constructor() 
	{
		super();
	}
	protected createChildren()
	{
		this.skinName = "GameEndSkin";
	}

	public showRelifePanel()
	{
		this.panel_reLife.visible = true;
		this.panel_gameEnd.visible = false;
		this._lifeCount = 9;
		Main.instance.gameView.addMsg("'你被别人干死了");
		// let reliveHint: string = Util.getWordBySign('reliveHint');
		// let reliveWord: string = Util.getWordBySign('reliveWord');
		// let freeRelive: string = Util.getWordBySign('freeRelive');
		if(!this.reLife_btnClose.hasEventListener(egret.TouchEvent.TOUCH_TAP))
		{
			this.reLife_btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onReLifePanelBtnClose,this);
		}
		if(!this.reLife_btnCharge.hasEventListener(egret.TouchEvent.TOUCH_TAP))
		{
			this.reLife_btnCharge.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onReLife_btnChargeClick,this);
		}
		if(!this.reLife_btnFree.hasEventListener(egret.TouchEvent.TOUCH_TAP))
		{
			this.reLife_btnFree.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onReLife_btnFreeClick,this);
		}
		this.creTimer();
	}

	private creTimer(): void {
		if(!this.lifeNum)
		{
			this.lifeNum = new egret.Bitmap(RES.getRes('red_num' + this._lifeCount))
			this.lifeNum.x = (this.panel_reLife.width - this.lifeNum.width) * 0.5;
			this.lifeNum.y = this.panel_reLife.height * 0.2;
			this.panel_reLife.addChild(this.lifeNum)
		}
		this.lifeNum.texture = RES.getRes('red_num' + this._lifeCount);
		//倒计时
		this.relifeTimer = new egret.Timer(1000, 10)
		this.relifeTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this)
		this.relifeTimer.once(egret.TimerEvent.TIMER_COMPLETE,this.onTimeEnd, this)
		this.relifeTimer.start()
	}

	private onTimeEnd()
	{
    	this.onReLifePanelBtnClose();
	}

	private onReLife_btnChargeClick()
	{
		//有偿复活
		this.removeTimer();
		this.visible = false;
		Main.instance.gameView.playerReLife();
	}

	private onReLife_btnFreeClick()
	{
		//免费复活
		this.removeTimer();
		this.visible = false;
		Main.instance.gameView.playerReLife();
	}
	private lifeNum: egret.Bitmap;
	private _lifeCount: number = 9;
	private onTimer(e: egret.TimerEvent): void {
		this._lifeCount--;
		this.lifeNum.texture = RES.getRes('red_num' + this._lifeCount);
	}

	private removeTimer(): void {
		if (this.relifeTimer) 
		{
			if(this.relifeTimer.hasEventListener(egret.TimerEvent.TIMER))
			{
				this.relifeTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this)
			}
			if(this.relifeTimer.hasEventListener(egret.TimerEvent.TIMER_COMPLETE))
			{
				this.relifeTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimeEnd,this);
			}
			this.relifeTimer = null;
		}
	}

	private onReLifePanelBtnClose()
	{
		this.removeTimer();
		this.panel_reLife.visible = false;
		this.panel_gameEnd.visible = true;
		this.showGameEnd();
	}

	public showGameEnd()
	{

		this.score.text = "1212";
		if(!this.btn_close.hasEventListener(egret.TouchEvent.TOUCH_TAP))
		{
			this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGameendBtnCloseClick,this);
		}
		if(!this.btn_reStart.hasEventListener(egret.TouchEvent.TOUCH_TAP))
		{
			this.btn_reStart.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGameendBtnReStartClick,this);
		}
		if(!this.btn_share.hasEventListener(egret.TouchEvent.TOUCH_TAP))
		{
			this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGameendBtnShareClick,this);
		}
	}

	private onGameendBtnCloseClick()
	{
		this.visible = false;
		Main.instance.changeToMain();
	}

	private onGameendBtnShareClick()
	{
		//分享
	}

	private onGameendBtnReStartClick()
	{
		Main.instance.changeToMain();
	}

	public destructor()
	{
		this.removeTimer();
		this.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onGameendBtnCloseClick,this);
		this.btn_reStart.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onGameendBtnReStartClick,this);
		this.btn_share.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onGameendBtnShareClick,this);

		this.reLife_btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onReLifePanelBtnClose,this);
		this.reLife_btnFree.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onReLife_btnFreeClick,this);
		this.reLife_btnCharge.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onReLife_btnChargeClick,this);
	}
}