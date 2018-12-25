/**
 * 地图配置
 * Created by Administrator on 2016/1/8.
 */
class sceneconfig{
    /**地图大小*/
    static mapwidth:number;
    static mapheight:number;

    static scenewidth:number;
    static sceneheight:number;

    static WWinit():void{
        var json = GameConfig.scenceConfig;
        this.mapwidth = json.size[0];
        this.mapheight = json.size[1];

        this.scenewidth = json.sceneSize[0];
        this.sceneheight = json.sceneSize[1];
    }
}