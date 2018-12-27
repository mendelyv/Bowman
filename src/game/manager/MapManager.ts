
//控制地图的生成，障碍物，道具等
class MapManager {
	/**格子行数*/
	static rowMax:number = 30;
	/**格子列数*/
	static colMax:number = 40;
	/**格子边长*/
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
		// this.createProperty();

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

	//第一次在全图随机刷新160个经验道具和40个血道具
	//暂定经验道具type = 2，血道具type = 3
	public createProperty()
	{
		//直接在地图里随机
		for(let i = 0;i < 160;++i)
		{
			let vec = MapManager.getEmptyItem();
			MapManager.mapItems[vec.row][vec.col] = 2;
		}
		for(let i = 0;i<40;++i)
		{
			let vec = MapManager.getEmptyItem();
			MapManager.mapItems[vec.row][vec.col] = 3;
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
					point = MapManager.getMapItemPos(i,j);
					Main.instance.gameView.gameBg.addObstacal(point.x,point.y);

				}
				else if(MapManager.mapItems[i][j] == 2 ||MapManager.mapItems[i][j] == 3)
				{
					Main.instance.gameView.gameBg.addProperty(i,j,MapManager.mapItems[i][j])
				}
			}
		}
	}
	/**获取地图块的位置*/
	public static getMapItemPos(row:number,col:number)
	{
		if(row<0||col<0) return;
		if(row>=MapManager.rowMax||col>=MapManager.colMax) return;
		let y = row * MapManager.cellPix + MapManager.cellPix*0.5 + MapManager.offsetY;
		let x = col * MapManager.cellPix + MapManager.cellPix*0.5 + MapManager.offsetX;
		return new egret.Point(x,y);
	}

	/** 根据坐标返回点所在地图格子的行列
	 * @param point ：位置坐标
	 * @param changeCoordinate ：是否需要转换坐标系
	 */
	public static getRowColOfMap(point: egret.Point, changeCoordinate: boolean = false): egret.Point
	{
		let bg = Main.instance.gameView.gameBg;
		if(changeCoordinate)
			point = bg.globalToLocal(point.x, point.y);
		let col = Math.floor(point.x / MapManager.cellPix);
		let row = Math.floor(point.y / MapManager.cellPix);
		return new egret.Point(row, col);
	}

	//第一次在全图随机刷新160个经验道具和40个血道具
	//暂定经验道具type = 2，血道具type = 3
	public createProperty()
	{
		let point = new egret.Point(obj.x,obj.y);
		if(obj.parent)
		{
			obj.parent.localToGlobal(obj.x,obj.y,point);
		}
		let posX = point.x - MapManager.offsetX;
		let posY = point.y - MapManager.offsetY;
		if(posX < 0 || posY < 0)
		{
			return null;
		}
		let row = Math.floor(posY / MapManager.cellPix);
		let col = Math.floor(posX / MapManager.cellPix);
		if(row > MapManager.rowMax || col > MapManager.colMax)
		{
			return null;
		}
		return new egret.Point(row,col);
	}

	//随机一个空白的位置
	public static getEmptyItem()
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

	//碰撞检测,找到最近的有物体的地图单元
	public static getHitItem(obj:egret.DisplayObject)
	{
		let hei = obj.height;
		let wid = obj.width;
		let radius = Math.sqrt(hei*hei + wid*wid);
		
		let objPoint = new egret.Point(obj.x,obj.y);
		if(obj.parent)
		{
			obj.parent.localToGlobal(obj.x,obj.y,objPoint);
		}
		let mapItem = MapManager.getMapItemRowCol(obj);
		if(!mapItem)
		{
			return null;
		}
		let count = Math.ceil(radius/MapManager.cellPix + 0.5);
		let beginX = Math.min(Math.max(0,mapItem.x - count),MapManager.rowMax);
		let beginY = Math.min(Math.max(0,mapItem.y - count),MapManager.colMax);
		let endX = Math.min(Math.max(0,mapItem.x + count),MapManager.rowMax);
		let endY = Math.min(Math.max(0,mapItem.y + count),MapManager.colMax);

		let minDistance:number;
		let target;
		for(let i = beginX ;i <= endX ;++i)
		{
			for(let j = beginY;j <= endY; ++j)
			{
				let mapItem = MapManager.mapItems[i][j];
				if(mapItem!= 0 && mapItem!=1)
				{
					let targetPoint = MapManager.getMapItemPos(i,j);
					let distance = egret.Point.distance(objPoint,targetPoint);
					if(!minDistance) minDistance = distance;
					if(distance < minDistance)
					{
						minDistance = distance;
						target = new egret.Point(i,j);
					}
				}
			}
		}
		return target;
	}
	// public static getAroundItems(point:egret.Point)
	// {
	// 	let row = point.x;
	// 	let col = point.y;
	// 	if(row>=0&&row<MapManager.rowMax&&col>=0&&col<MapManager.colMax)
	// 	{
	// 		//do nothing
	// 	}
	// 	else
	// 	{
	// 		return null;
	// 	}
	// 	let arr:Array<egret.Point>;
	// 	for(let i = -1;i < 2; ++i)
	// 	{
	// 		for(let j = -1;j < 2; ++j)
	// 		{
	// 			let x = row + i;
	// 			let y = col + j;
	// 			if(x>=0&&x<MapManager.rowMax&&y>=0&&y<MapManager.colMax)
	// 			{
	// 				let point = new egret.Point(x,y);
	// 				if(!arr)
	// 				{
	// 					arr = new Array<egret.Point>();
	// 				}
	// 				arr.push(point);
	// 			}
	// 		}
	// 	}
	// 	return arr;
	// }
}