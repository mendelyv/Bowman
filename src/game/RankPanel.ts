// TypeScript file
//主界面排行榜
class RankPanel extends egret.DisplayObjectContainer 
{
    private _listSp: egret.DisplayObjectContainer;
    private _listMask:egret.Rectangle;
    private _listView: egret.ScrollView = new egret.ScrollView;

    public constructor() {
        super();
        this.updateView();
    }

    //初始化排行
    public updateView(){
        let rank_bg:egret.Bitmap = Util.createBitmap("com_rank_bg_png");
        rank_bg.width = StageUtils.WIN_WIDTH * 0.55;
        rank_bg.height = StageUtils.WIN_HEIGHT * 0.35;
        rank_bg.alpha = 0.3;
        let list_w:number = rank_bg.width;
        let list_h:number = rank_bg.height * 0.8;
        //遮罩
        var rankMask:egret.Shape = Util.createStageMask(0,0.5,rank_bg.width,rank_bg.height);
        rankMask.x = rank_bg.x;
        rankMask.y  = rank_bg.y;
        rankMask.visible = false;
        rankMask.alpha = 0.1;
        this.addChild(rankMask);
        this.addChild(rank_bg);
        this._listSp = new egret.DisplayObjectContainer();
        //
        this._listView.width = list_w;
        this._listView.height = list_h;
        this._listView.x = rank_bg.x;
        this._listView.y = rank_bg.y;
        let role = Main.instance.gameView.battleMgr.roleArray;
       // console.log(role.length);
        role.sort(function (x, y){
           return y.attribute.totalExp - x.attribute.totalExp;
        });
        for(let i = 0; i<role.length;i++){
            if(role[i] == null){
               // Main.instance.gameView.battleMgr.roleArray[i] =null;
                continue;
            }
            let rankItem: RankItem = new RankItem(this,list_w,i,role[i].nickName,role[i].attribute.totalExp);
            rankItem.name = i.toString();
            if(role[i].id == 0){
                let myRankTxt:egret.TextField = Util.createText("#1",rank_bg.width*0.01,rank_bg.height - 38,30,Util.s_colors.red,false,egret.HorizontalAlign.LEFT);
                let myExpTxt: egret.TextField = Util.createText(role[i].nickName+"   "+ role[i].attribute.totalExp,myRankTxt.x + 48,myRankTxt.y,30,Util.s_colors.red,false,egret.HorizontalAlign.LEFT);
                this.addChild(myRankTxt);
                this.addChild(myExpTxt);
            }
             this.addList(rankItem);
           
        }
        this._listView.setContent(this._listSp);
        this.addChild(this._listView);
        Main.instance.gameView.battleMgr.roleArray.filter(function(ele){return ele});
    }
    //把一条条的信息添加到对象里面去
    private addList(item:RankItem){
        var heiValue: number = this._listSp.height;
        this._listSp.addChild(item);
        if(heiValue == 0){
            item.y = heiValue;
        }
        else{
            item.y = heiValue + 13;
        }
    }
}
//排行榜单元格
class RankItem extends egret.DisplayObjectContainer{
    private _comRankTxt: egret.TextField; //排行文字
    private _comNickNameTxt: egret.TextField; //玩家昵称
    private _comExpTxt: egret.TextField;//玩家经验
    private _rankPanel: RankPanel;
    //
    private _itemW: number;
    private _itemH: number = 48;

    public constructor(rankPanel: RankPanel,item_w:number,flag:number,name:string,totalExp:number){
        super();
        this._rankPanel = rankPanel;
        this._itemW = item_w;
        this.width = this._itemW;
        this.height = this._itemH;
        this.drawSelf(item_w,flag,name,totalExp);
        
    }

    private drawSelf(item_w:number,flag:number,name:string,totalExp:number){
      this._comRankTxt = Util.createText("#"+(flag+1),item_w*0.01,this._itemH - 38,30,Util.s_colors.black,false,egret.HorizontalAlign.LEFT); 
      this._comRankTxt.textColor = Util.s_colors.black;
      this._comRankTxt.textAlign = egret.HorizontalAlign.LEFT;
      this.addChild(this._comRankTxt);
      this._comNickNameTxt = Util.createText(name + "    "+totalExp,this._comRankTxt.x + 38,this._itemH - 38,30,Util.s_colors.black,false,egret.HorizontalAlign.LEFT); 
      this._comNickNameTxt.textColor = Util.s_colors.black;
      this._comNickNameTxt.textAlign = egret.HorizontalAlign.LEFT;
      this.addChild(this._comNickNameTxt);
    }
}