
// TypeScript file

/**
 * class name : BaseAttributesss
 * description : 角色基础属性
 * time : 2019.1.4
 * @author : 张国林
 */
class BaseAttribute {
	public hp:number;//当前血量
	public hpMax:number;//最大血量
	public power:number;//攻击力

	public speed:number;//移动速度
	public angle:number;//旋转角度

	public level:number;//当前等级

	public exp:number;//当前经验
	public expMax:number;//当前升级所需经验
	public totalExp: number;//本局获得总经验；
	public constructor() {
	}
}