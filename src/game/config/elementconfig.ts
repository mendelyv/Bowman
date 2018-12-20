/**
 * 基础元素配置（年货，道具）
 * Created by Administrator on 2016/1/8.
 */
class elementconfig{
    /**基础元素在单个区域内刷新的个数*/
    static sceneNumber:number;
    /**基础元素重量*/
    static basicWeight:Array<number>;
    /**基础元素被吞噬后刷新时间*/
    static refreshTime:number;
    /**年货配置*/
    static springcargo:any;
    /**道具配置*/
    static prop:any;

    /**初始化*/
    static WWinit():void{
        var json = GameConfig.elementConfig;
        this.sceneNumber = json.basic[0].sceneNumber;
        this.basicWeight = json.basic[1].basicWeight;
        this.refreshTime = json.basic[2].refreshTime;

        this.springcargo = json.nianh;
        this.prop = json.prop;
    }

    /**根据年货种类获取年货属性*/
    static WWgetSpringCargoDataById(id:number):any{
        var obj = {
            weight:-1,/*重量*/
            time:-1,/*生成间隔事件*/
            num:-1,/*每次生成的数量*/
            event:-1/*回调事件类型*/
        };
        var list:any;
        switch (id){
            case ELEMENT_ID.id_juzi://橘子
                list = this.springcargo[0]["itemList"][0];
                break;
            case ELEMENT_ID.id_guazi://瓜子
                list = this.springcargo[1]["itemList"][0];
                break;
            case ELEMENT_ID.id_common:
           let ele:ElementManger = new ElementManger();
                list = [];
                list["weight"] = ele.randomNum(this.basicWeight[0],this.basicWeight[1]);
                list["event"] = -1;
                list["number"] = 10;
                list["time"] = 10;
                break;
            case ELEMENT_ID.id_weight:
                list = this.prop[1]["itemList"][0];
                break;
        }
        obj.event = list["event"];
        obj.time = list["time"];
        obj.num = list["number"];
        //obj.weight = list["weight"];

        return obj;
    }
}


/**年货枚举*/
enum ELEMENT_ID{
    id_juzi,//橘子
    id_guazi,//瓜子
    id_common,//普通吞噬物
    id_weight,//体重道具
    id_penshe//喷射物
}

//事件枚举
enum WEIGHT_EVENT_ID{
    PROP_EVENT_add_fixed_weight = 1,//体重增加固定值
    PROP_EVENT_add_percent_weight = 2,//体重增加百分比
}