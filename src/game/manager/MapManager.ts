
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
		let obstacal = config[0];
		let data = obstacal.data as Array<Array<number>>;
		//假定此时的原定在【0,0】
		let x = 0;
		let y = 0;
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
					// let x = i * MapManager.cellPix + MapManager.cellPix * 0.5;
					// let y = j * MapManager.cellPix + MapManager.cellPix * 0.5;
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
		let halfCountX = Math.floor(MapManager.rowMax*0.5)-1;
		let halfCountY = Math.floor(MapManager.colMax*0.5)-1;
		let x = this.anchorX - (row-halfCountX) * MapManager.cellPix;
		let y = this.anchorY - (col-halfCountY) * MapManager.cellPix;
		return new egret.Point(x,y);
	}
}