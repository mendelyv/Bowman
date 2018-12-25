/**
 * 游戏背景地图
 */
class GameBg extends eui.Component {
	public speed: number = 5;
	public player: Role;

	public movableX: boolean = true;//X轴是否可移动
	public movableY: boolean = true;//Y轴是否可移动
	/**生成障碍的X位置*/
	private obstacalX: number;
	/**生成障碍的Y位置*/
	private obstacalY: number;
	/**障碍的宽*/
	private obstacalW: number;
	/**障碍的高*/
	private obstacalH: number;
	/**障碍配置*/
	private resourcesName: string;
	/**障碍贴图*/
	private obsBitmap: egret.Bitmap;
	static gg: GameBg = null;
	public gp_obs: eui.Group;

	static GbInstance(): GameBg {
		if (!this.gg) {
			this.gg = new GameBg;
		}
		return this.gg;
	}
	public constructor() {
		super();
	}
	/** 检测是否到边缘 */
	private verifyLimit()
	{
		// let x = Math.abs(this.x);
		// let y = Math.abs(this.y);

		if(this.x > 0)
		{
			this.x = 0;
			this.movableX = false;
		}
		if(-this.x + StageUtils.WIN_WIDTH >= this.width)
		{
			this.x = -(this.width - StageUtils.WIN_WIDTH);
			this.movableX = false;
		}
		if(this.y > 0)
		{
			this.y = 0;
			this.movableY = false;
		}
		if(-this.y + StageUtils.WIN_HEIGHT >= this.height)
		{
			this.y = -(this.height - StageUtils.WIN_HEIGHT);
			this.movableY = false;
		}
	}

	/** 移动
	 * @param xAxis : x轴偏移量
	 * @param yAxis : y轴偏移量
	 */
	public move(xAxis: number, yAxis: number)
	{
		this.x -= xAxis * this.speed;
		this.y += yAxis * this.speed;
		// this.movableX = this.movableY = true;

		this.verifyLimit();
	}
	protected createChildren() {
		this.skinName = "GameBGSkin";
	//	this.createObs();
	}
	//创建障碍
	public createObs(): void {
		let json = GameConfig.obstacalsConfig;
		for (let i: number = 0; i < json.zhangai.length; i++) {
			let zhangai:Array<any> = json.zhangai;
			let obj:any = zhangai[i];
			this.obstacalX = obj.x;
			this.obstacalY = obj.y;
			this.obstacalW = obj.W;
			this.obstacalH = obj.H;
			this.resourcesName = obj.resourcesName;

			this.obsBitmap = Util.createBitmap(this.resourcesName);
			this.obsBitmap.x = this.obstacalX;
			this.obsBitmap.y = this.obstacalY;
			this.obsBitmap.width = this.obstacalW;
			this.obsBitmap.height = this.obstacalH;
			console.log(this.obsBitmap.x + "  " + this.obsBitmap.y + "  " + this.obsBitmap.width);
			this.gp_obs.addChild(this.obsBitmap);
		}
	}
}

window["GameBg"] = GameBg;