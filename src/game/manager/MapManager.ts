
//控制地图的生成，
class MapManager {
	static rowMax:number = 40;
	static colMax:number = 40;
	static cellPix:number = 48;

	static mapItems:Array<Array<number>>;

	private anchorX:number;
	private anchorY:number;
	public constructor() {
	}

	public init(wid,hei)
	{
		MapManager.mapItems = new Array<Array<number>>();
		for(let i = 0;i<MapManager.rowMax;++i)
		{
			let tempArr = new Array<number>();
			for(let j =0 ;j < MapManager.colMax;++j)
			{
				tempArr.push(0);
			}
			MapManager.mapItems.push(tempArr);
		}

		this.anchorX = wid*0.5;
		this.anchorY = hei*0.5;
	}

	public createMapObstacal()
	{
		let config =  GameConfig.obstacalsConfig;
		let obstacal = config["9"];
		let data = obstacal.data as Array<Array<number>>;
		//x,y为障碍物数组在地图数组的起始位置
		let x = obstacal["x"];
		let y = obstacal["y"];
		for(let i = 0;i < MapManager.mapItems.length; ++i)
		{
			if(i-x>=data.length)
			{
				continue;
			}
			for(let j = 0 ;j<MapManager.mapItems[i].length; ++j)
			{
				if(i-x>=0&&i-x<data.length&&i-y>=0&&j-y<data[i].length)
					MapManager.mapItems[i][j] = data[i-x][j-y];
			}
		}
		this.showMapObstacal();
	}

	public showMapObstacal()
	{
		for(let i = 0;i < MapManager.mapItems.length; ++i)
		{
			for(let j = 0 ;j<MapManager.mapItems[i].length; ++j)
			{
				if(MapManager.mapItems[i][j]==1)
				{
					let point = this.getMapItemPos(i,j);
					Main.instance.gameView.bg.createObs(point.x,point.y);
				}
			}
		}
	}

	public getMapItemPos(row:number,col:number)
	{
		if(row<0||col<0) return;
		if(row>=MapManager.rowMax||col>=MapManager.colMax) return;
		let x = row * MapManager.cellPix + MapManager.cellPix*0.5 ;
		let y = col * MapManager.cellPix + MapManager.cellPix*0.5 ;
		return new egret.Point(x,y);
	}
}