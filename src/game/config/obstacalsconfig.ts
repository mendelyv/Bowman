/**
 * 障碍配置表
 */
 class obstacalsconfig{
     static json:any;
    static WWinit():void{
         this.json = GameConfig.obstacalsConfig;
   //     console.log(this.json);
    }
    static getJsonData(){
        if(this.json){
            return this.json;
        }
    }
}