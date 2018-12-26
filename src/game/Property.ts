
//地图上的道具
class Property extends MapItem
{
	//
	private propertyName_0:string = "element_common_0_png";
	private propertyName_1:string = "element_common_1_png";
	private bitMap:egret.Bitmap;

	public constructor() 
	{
		super();
	}

	public enable(id,row,col)
	{
		this.id = id;
		if(this.id == 2)
			this.bitMap = Util.createBitmap(this.propertyName_0);
		else if (this.id == 3)
			this.bitMap = Util.createBitmap(this.propertyName_1);
		this.row = row;
		this.col = col;
		this.width = this.bitMap.width;
		this.height = this.bitMap.height;
		this.anchorOffsetX = this.width*0.5;
		this.anchorOffsetY = this.height * 0.5;
		this.addChild(this.bitMap);
	}

	public recycle()
	{
		this.bitMap = null;
	}

	public destroy()
	{
		//this.bitMap = null;
		ObjectPool.instance.pushObj("property",this);
	}
}