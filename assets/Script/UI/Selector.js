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
        mainPic:{
            default: null,
            type:cc.Sprite
        },
        bars:{
            default: null,
            type:cc.Node
        },
        text:{
            default: null,
            type:cc.Label
        },
        card:{
            default:null,
            type:cc.Node
        }
    },
    showItems: function(){
        if(this.bars.x>=1000)
            this.bars.x = -4;
        else
            this.close();
    },
    close: function(){
        this.bars.x = 1000;
    }
    ,
    changeMainPic: function(event){
        var node = event.target;
        var srcSp = cc.find("Mask/pic", node).getComponent(cc.Sprite)
        var cardJS = this.card.getComponent("cardControl");

        if(node.name =="minion") {
            //this.mainPic.node.position = cc.v2(31,-100)
            //this.mainPic.node.rotation = 0;
            this.text.string = "随从"
            cardJS.changeCardType(0)
        }
        if(node.name =="spell") {
            //this.mainPic.node.position = cc.v2(64.5,7)
            //this.mainPic.node.rotation = 33;
            this.text.string = "法术"
            cardJS.changeCardType(1)
        }
        if(node.name =="weapon") {
            //this.mainPic.node.position = cc.v2(6,57)
            //this.mainPic.node.rotation = 0;
            this.text.string = "武器"
            cardJS.changeCardType(2)
        }
        this.mainPic.spriteFrame = srcSp.spriteFrame;
        
        this.close();
    }
    ,
    // use this for initialization
    onLoad: function () {
        this.typeID = 0;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
