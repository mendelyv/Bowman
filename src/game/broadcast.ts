/**
 * 广播界面
 */
class Broadcast extends egret.DisplayObjectContainer {
    /*最大消息数*/
    public static MaxMsgCount: number = 5;

    /*消息列表*/
    private msglist: Array<BroadcastMsg>;

    public constructor() {
        super();

        this.msglist = [];
    }

    /*添加消息*/
    public addMsg(msg: string): void {
        var msglabel: BroadcastMsg = new BroadcastMsg();
        msglabel.alpha = 1;
        msglabel.setMsg(msg);
        this.addChild(msglabel);
        this.msglist.push(msglabel);
        var that:Broadcast = this;
        egret.Tween.get(msglabel).wait(2000).to({ alpha: 0 }, 91000).call(function () {
            egret.Tween.removeTweens(msglabel);
            that.delOneMsg(msglabel);
        }, this, [msg]);
        this.setPos();
    }

    /*重新排列位置*/
    private setPos(): void {
        //删除多余消息
        while (this.msglist.length > Broadcast.MaxMsgCount) {
            this.delSafe(this.msglist[0]);
            this.msglist.splice(0, 1);
        }

        //排序位置
        for (var i: number = this.msglist.length - 1; i >= 0; i--) {
            this.msglist[i].y = (this.msglist.length - 1 - i) * this.msglist[i].height;
        }
    }

    //安全删除对象
    public delSafe(object: egret.DisplayObject): void {
        if (object) {
            if (object.parent) {
                object.parent.removeChild(object);
            }
        }
    }

    /*清空所有消息*/
    public clearAllMsg(): void {
        while (this.msglist.length > 0) {
            this.delSafe(this.msglist[0]);
            this.msglist.splice(0, 1);
        }
    }

    /*删除单条消息*/
    private delOneMsg(msg: BroadcastMsg): void {
        for (var i: number = 0; i < this.msglist.length; i++) {
            if (this.msglist[i] == msg) {
                this.delSafe(this.msglist[i]);
                this.msglist.splice(i, 1);
                break;
            }
        }
        this.setPos();
    }
}

//消息类
class BroadcastMsg extends egret.DisplayObjectContainer {
    private _msgtext: egret.TextField;
    public constructor() {
        super();
        var bg: egret.Bitmap = Util.createBitmap("game_broadcast_bg_png");
        bg.width = StageUtils.WIN_WIDTH * 0.5;
        this.addChild(bg);
        this._msgtext = Util.createText("", 0, 0, 20,Util.s_colors.green);
        this._msgtext.x = 5;
        this._msgtext.y = this.height * 0.5;
        this.addChild(this._msgtext);
    }
    public setMsg(msg: string): void {
        this._msgtext.text = msg;
        Util.setAnchor(this._msgtext, 0, 0.5);
    }
}