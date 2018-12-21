/**
 * 游戏背景地图
 */
class GameBg extends eui.Component{

	public speed: number = 5;
	public player: Role;

	public movableX: boolean = true;//X轴是否可移动
	public movableY: boolean = true;//Y轴是否可移动

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

}
window["GameBg"] = GameBg;