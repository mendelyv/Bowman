/**
 * 游戏背景地图
 */
class MapBG extends eui.Component {
	/**地图块数组*/
	private mapArray:Array<any>;
	public mapBG:eui.Image;
	protected createChildren() {
		this.skinName = "GameBGSkin";
	}
	public constructor() {
		super();
	}

	
}
