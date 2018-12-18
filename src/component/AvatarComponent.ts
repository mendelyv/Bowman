// TypeScript file

/**
 * class name : AvatarComponent
 * description : 头像组件
 * time : 2018.12.18
 * @author : 杨浩然
 */
class AvatarComponent extends eui.Component
{
    public nickName: eui.Label;

    private bg: eui.Image;
    
    public constructor()
    {
        super();
    }

    protected createChildren()
    {
        super.createChildren();
        this.skinName = "AvatarComponentSkin";
    }

//class end
}

window["AvatarComponent"] = AvatarComponent;