cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        card:{
            default:null,
            type:cc.Node
        },
        WMSelector:{
            default:null,
            type:cc.Node
        },
        Mask:{
            default:null,
            type:cc.Node
        },
        messageBox:{
            default: null,
            type: cc.Node
        }
    },
    changeCardClass: function(event){
        var node = event.target;
        var cSel = node.getComponent("ClassSel");
        var b = node.getComponent(cc.Button);
        var cardControl = this.card.getComponent("cardControl");
        
        if(this.curCSel != node){            
            node.x+=30;
            b.normalColor  = new cc.Color(255, 255, 255, 255);
            cardControl.changeClass(cSel.classID);

            if(this.curCSel!=null){
                this.curCSel.x -= 30;
                this.curCSel.getComponent(cc.Button).normalColor = new cc.Color(187, 187, 187);
            }
            this.curCSel = node;
        }
        
       // cc.log("event:",event)
       // for(var e in event)
       //     cc.log(e)
    }
    ,
    changeWaterMark:function () {
        var cardControl = this.card.getComponent("cardControl");
        var waterMark = cardControl.waterMark;
        var WMS = this.WMSelector.getComponent("WMSelector");

        var wName = cardControl.cardTypeStr[cardControl.typeID].EN+"w_"+WMS.ExNameStr.EN[WMS.cur];
        waterMark.name = "w_"+WMS.ExNameStr.EN[WMS.cur];
        cc.loader.loadRes("water", cc.SpriteAtlas, function (err, SpriteAtlas) {
            //cc.log("SpriteAtlas:", SpriteAtlas)
            //cc.log(spName,spr);
            waterMark.spriteFrame = SpriteAtlas.getSpriteFrame(wName);
        })
        this.close();
    }
    ,
    openWM: function () {
       this.Mask.opacity = 128;
       this.curUI = this.WMSelector;
       var WMS = this.WMSelector.getComponent("WMSelector");
       var CCS = this.card.getComponent("cardControl");
       WMS.open();
       CCS.releaseControl(this)
    },
    openMessage: function (event) {
       var node = event.target; 
       this.Mask.opacity = 128;
       this.curUI = this.messageBox;
       var MSG = this.messageBox.getComponent("MessageBox");
       var CCS = this.card.getComponent("cardControl");

       switch (node.name){
           case "Info": MSG.string = "首发 炉石diy吧\n 素材提供:@J0000KER @芬里厄的安魂曲 @太阳很茫\n 制作人:@醉酒逝流年";
                        break;
           case "WebWarn": MSG.string = "网络状况差的情况下,部分资源加载可能会较慢，请多刷新几次\n 由于本程序使用的游戏引擎尚在开发阶段，可能会出现各种意想不到的情况，一般来说，都能刷新解决";
                        break;
           default: break;
       }

       MSG.open();
       CCS.releaseControl(this)
    },
    close: function () {
        this.Mask.opacity = 0;
        
        switch (this.curUI){
            case this.WMSelector: 
                var WMS = this.WMSelector.getComponent("WMSelector");
                WMS.close();break;
            case this.messageBox:
                var MSG = this.messageBox.getComponent("MessageBox");
                MSG.close();break;
            default: break;
        }
    },
    // use this for initialization
    onLoad: function () {
        this.openMessage({target:{name:"WebWarn"}})
        //cc._canvas.style.cursor = 'pointer'
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
