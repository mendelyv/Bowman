/**
 * 游戏背景地图
 */
class GameBg extends eui.Component {

	public gameView:GameView;
	// public speed: number = 5;
	public movableX: boolean = true;//X轴是否可移动
	public movableY: boolean = true;//Y轴是否可移动
	/**障碍图片名字*/
	private obsMapName: string = "obs_block_png";

	public 	arrowGroup:eui.Group;
	public obstacalGroup: eui.Group;
	private propertyGroup: eui.Group;
	private enemyGroup: eui.Group;
	private mapBG:eui.Image;//背景图片
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
		let player = Main.instance.gameView.player;
		let speed = player.getSpeed();
		speed *= (25 / 1000);//使用一个系数降低速度，现在人物无法移动，全部移动效果均靠背景实现
		this.x -= xAxis * speed;
		this.y += yAxis * speed;
		// this.movableX = this.movableY = true;

		this.verifyLimit();
	}
	protected createChildren() {
		this.skinName = "GameBGSkin";
		this.initBgWidthHeight();
	}

	private initBgWidthHeight()
	{
		//先加上视口的宽高
		this.width = MapManager.cellPix * MapManager.colMax + StageUtils.WIN_WIDTH;
		this.height = MapManager.cellPix * MapManager.rowMax + StageUtils.WIN_HEIGHT;
		MapManager.offsetX = StageUtils.WIN_WIDTH * 0.5;
		MapManager.offsetY = StageUtils.WIN_HEIGHT * 0.5;
		this.mapBG.width = this.width;
		this.mapBG.height = this.height;
	}

	/**创建障碍*/
	public addObstacal(posX:number,posY:number)
	{
		let image = Util.createBitmap(this.obsMapName);
		image.anchorOffsetX = image.width * 0.5;
		image.anchorOffsetY = image.height * 0.5;
		image.x = posX;
		image.y = posY;
		this.obstacalGroup.addChild(image);
	}

	/**创建道具*/
	public addProperty(row:number,col:number,propType:number)
	{
		let property:Property = ObjectPool.instance.getObj("property");
		property.enable(propType,row,col);
		let point = MapManager.getMapItemPos(row,col);
		property.x = point.x;
		property.y = point.y;
		this.propertyGroup.addChild(property);
		this.gameView.battleMgr.addProperty(property);
	}

	/**生成敌人*/
	public addEnemy(enemy:Enemy){
			this.enemyGroup.addChild(enemy);
			// ===== Test Code start =====
			// enemy.AI.drawCircle();
			// ===== Test Code end =====
			this.gameView.battleMgr.addEnemy(enemy);
		
	}

	/** 添加子弹
	 * @param bullet ：子弹
	 * @param whos ：谁的子弹  0玩家的，1敌人的
	 */
	public addBullet(bullet: Bullet): number
	{
		this.arrowGroup.addChild(bullet);
		return this.gameView.battleMgr.addBullet(bullet);
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