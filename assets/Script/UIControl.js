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

        var wName = cardControl.cardType.EN+"w_"+WMS.ExNameStr.EN[WMS.cur];
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
    close: function () {
        this.Mask.opacity = 0;
        switch (this.curUI){
            case this.WMSelector: 
                var WMS = this.WMSelector.getComponent("WMSelector");
                WMS.close();break;
            default: break;
        }
    },
    // use this for initialization
    onLoad: function () {
        //cc._canvas.style.cursor = 'pointer'
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
