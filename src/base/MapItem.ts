
//地图的每一小格
class MapItem extends egret.DisplayObject
{
	//在地图上的行
	private row:number;
	//在地图上的列
	private col:number;
	//id 标记该地图片上的实物类型,用于渲染地图上的实物
	private id:number;
	public get ID(){return this.id;}
	
	public hei:number = 48;
	public wid:number = 48;
	public constructor(row_:number,col_:number) 
	{
		super();
		this.row = row_;
		this.col = col_;
	}

}