// TypeScript file

/**
 * class name : PopWindow
 * description : 弹窗类
 * time : 2018.12.18
 * @author : 杨浩然
 */
class PopWindow extends eui.Component {
    public message: eui.Label;//提示文本
    public confirmBtn: eui.Label;//确定按钮
    public cancelBtn: eui.Label;//取消按钮

    private _confirmCall: Function;//确定按钮回调
    private _cancelCall: Function;//取消按钮回调

    public constructor() {
        super();
    }


    protected createChildren() {
        this.skinName = "PopWindowSkin";
    }

    /** 激活弹窗
     * @param message ：提示信息
     * @param confirmEvent ：非取消按钮的事件
     * @param cancelEvent ：非取消按钮的事件
     * @param confirmTxt ：确定按钮替换文本(缺省)
     * @param cancelTxt ：取消按钮替换文本(缺省)
     */
    public enable(message: string, confirmEvent?: Function, cancelEvent?: Function, confirmTxt?: string, cancelTxt?: string) {
        this._confirmCall = confirmEvent;
        this._cancelCall = cancelEvent;
        this.message.text = message;
        if (confirmTxt) this.confirmBtn.text = confirmTxt;
        if (cancelTxt) this.cancelBtn.text = cancelTxt;
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
        this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancel, this);
    }
    private onConfirm(e: egret.TouchEvent): void {
        this.destructor();
        if (this._confirmCall) {
            this._confirmCall();
        }
    }
    private onCancel(e: egret.TouchEvent): void {
        this.destructor();
        if (this._cancelCall) {
            this._cancelCall();
        }
    }
    private destructor() {
        this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirm, this);
        this.cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancel, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    //class end
}