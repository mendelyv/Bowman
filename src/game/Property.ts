
//地图上的道具
class Property extends MapItem
{
	//
	private propertyExp:string = "element_common_0_png";
	private propertyBlood:string = "element_common_1_png";
	private bitMap:egret.Bitmap;

	public get propertyType(){return this.id;};
	public constructor() 
	{
		super();
	}

	public enable(id:number,row:number,col:number)
	{
		this.id = id;
		if(this.id == MapItemType.PROP_EXP)
			this.bitMap = Util.createBitmap(this.propertyExp);
		else if (this.id == MapItemType.PROP_BLOOD)
			this.bitMap = Util.createBitmap(this.propertyBlood);
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
		this.removeChild(this.bitMap);
		this.bitMap = null;
	}

	public destroy()
	{
		//this.bitMap = null;
		//ObjectPool.instance.pushObj("property",this);
	}
}