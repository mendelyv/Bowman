// TypeScript file

/**
 * class name : PopWindow
 * description : 弹窗类
 * time : 2018.12.18
 * @author : 杨浩然
 */
class PopWindow extends eui.Component
{
    public message: eui.Label;//提示文本
    public confirmBtn: eui.Label;//确定按钮
    public cancelBtn: eui.Label;//取消按钮

    protected bg: eui.Image;
    
    public constructor()
    {
        super();
    }


    protected createChildren()
    {
        this.skinName = "PopWindowSkin";
    }

    /** 激活弹窗
     * @param message ：提示信息
     * @param confirmEvent ：非取消按钮的事件
     * @param confirmTxt ：确定按钮替换文本(缺省)
     */
    public enable(message: string, confirmEvent: Function, confirmTxt?: string)
    {
        this.message.text = message;
        if(confirmTxt) this.confirmBtn.text = confirmTxt;
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, confirmEvent, this);
        this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.destructor, this);
    }

    public destructor()
    {
        if(this.parent)
            this.parent.removeChild(this);
    }

//class end
}