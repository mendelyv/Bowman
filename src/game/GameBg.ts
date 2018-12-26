/**
 * 游戏背景地图
 */
class GameBg extends eui.Component {
	public speed: number = 5;

	public movableX: boolean = true;//X轴是否可移动
	public movableY: boolean = true;//Y轴是否可移动
	/**障碍配置*/
	private obsMapName: string = "obs_block_png";

	private obstacalGroup: eui.Group;
	private propertyGroup: eui.Group;

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
	}
	//创建障碍
	public addObstacal(posX:number,posY:number)
	{
		let image = Util.createBitmap(this.obsMapName);
		image.anchorOffsetX = image.width * 0.5;
		image.anchorOffsetY = image.height * 0.5;
		image.x = posX;
		image.y = posY;
		this.obstacalGroup.addChild(image);
	}

	//创建道具
	public addProperty(posX:number,posY:number,propType:number)
	{
		let property = ObjectPool.instance.getObj("property");
		property.enable(propType);
		property.x = posX;
		property.y = posY;
		this.propertyGroup.addChild(property);
	}

	public destructor()
	{
		this.obstacalGroup.removeChildren();
		if(this.obstacalGroup.parent)
			this.obstacalGroup.parent.removeChild(this.obstacalGroup);
		this.obstacalGroup = null;
		this.propertyGroup.removeChildren();
		if(this.propertyGroup.parent)
			this.propertyGroup.parent.removeChild(this.propertyGroup);
		this.propertyGroup = null;
	}

}

window["GameBg"] = GameBg;