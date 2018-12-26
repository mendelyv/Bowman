
//地图的每一小格
class MapItem extends eui.Group
{
	//在地图上的行
	protected row:number;
	//在地图上的列
	protected col:number;
	//id 标记该地图片上的实物类型,用于渲染地图上的实物
	protected id:number;
	public get ID(){return this.id;}
	public constructor() 
	{
		super();
	}


}