
//控制地图的生成，障碍物，道具等
class MapManager {
	static rowMax:number = 40;
	static colMax:number = 40;
	static cellPix:number = 48;

	static offsetX = 0;
	static offsetY = 0;
	//地图所有小格子的数组，用来做显示，碰撞检测
	//数组值的暂时定义：0，没有东西，1，障碍物 ,经验道具type = 2，血道具type = 3
	static mapItems:Array<Array<number>>; 
	public constructor() {
		this.init();
	}

	public init()
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
		this.createMapObstacal();
		this.createProperty();

		this.showMap();
	}

	public createMapObstacal()
	{
		let config =  GameConfig.obstacalsConfig;
		let num = 0;
		while(config[num.toString()])
		{
			let obstacal = config[num.toString()];
			//let obstacal = config["11"]
			let data = obstacal.data as Array<Array<number>>;
			//x,y为障碍物数组在地图数组的起始位置
			let x = obstacal["x"];
			let y = obstacal["y"];
			for(let i = 0; i<data.length;++i)
			{
				for(let j = 0;j<data[i].length;++j)
				{
					if(i+x>=0&&i+x<MapManager.mapItems.length&&j+y>=0&&j+y<MapManager.mapItems[i+x].length)
						MapManager.mapItems[i+x][j+y] = data[i][j];
				}
			}
			num++;
		}
		
	}

	public showMap()
	{
		for(let i = 0;i < MapManager.mapItems.length; ++i)
		{
			for(let j = 0 ;j<MapManager.mapItems[i].length; ++j)
			{
				let point;
				if(MapManager.mapItems[i][j] == 1)
				{
					point = this.getMapItemPos(i,j);
					Main.instance.gameView.gameBg.addObstacal(point.x,point.y);
				}
				else if(MapManager.mapItems[i][j] == 2 ||MapManager.mapItems[i][j] == 3)
				{
					point = this.getMapItemPos(i,j);
					Main.instance.gameView.gameBg.addProperty(point.x,point.y,MapManager.mapItems[i][j])
				}
			}
		}
	}

	public getMapItemPos(row:number,col:number)
	{
		if(row<0||col<0) return;
		if(row>=MapManager.rowMax||col>=MapManager.colMax) return;
		let y = row * MapManager.cellPix + MapManager.cellPix*0.5 + MapManager.offsetY;
		let x = col * MapManager.cellPix + MapManager.cellPix*0.5 + MapManager.offsetX;
		return new egret.Point(x,y);
	}

	//第一次在全图随机刷新160个经验道具和40个血道具
	//暂定经验道具type = 2，血道具type = 3
	public createProperty()
	{
		//直接在地图里随机
		for(let i = 0;i < 160;++i)
		{
			let vec = this.getEmptyItem();
			MapManager.mapItems[vec.row][vec.col] = 2;
		}
		for(let i = 0;i<40;++i)
		{
			let vec = this.getEmptyItem();
			MapManager.mapItems[vec.row][vec.col] = 3;
		}
	}


	//随机一个空白的位置
	public getEmptyItem()
	{
		let row,col;
		while(true)
		{
			row = Util.getRandomRange(0,MapManager.rowMax-1);
			col = Util.getRandomRange(0,MapManager.colMax-1);
			if(MapManager.mapItems[row][col]==0)//找到一个空白的
			{
				break;
			}
		}
		return {row:row,col:col};
	}
}