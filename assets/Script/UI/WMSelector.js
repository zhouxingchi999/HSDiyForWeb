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
        ExName:{
            default:null,
            type:cc.Label
        },
        Mark:{
            default:null,
            type:cc.Node
        }
    },
    changeIcon: function (a) {
        this.cur = (this.cur+a);
        this.cur = this.cur<0?this.cur+10:(this.cur>9?this.cur-10:this.cur)
        cc.log(this.cur)
        
        this.ExName.getComponent("LabelProxy").string = this.ExNameStr.CN[this.cur];

        var spName = this.ExNameStr.EN[this.cur]+"Icon";//+".png";
        var spr = this.Mark.getComponent(cc.Sprite);
        cc.loader.loadRes("water", cc.SpriteAtlas, function (err, SpriteAtlas) {
            //cc.log("SpriteAtlas:", SpriteAtlas)
            //cc.log(spName,spr);
            spr.spriteFrame = SpriteAtlas.getSpriteFrame(spName);
        })
    },
    
    nextIcon:function(){
        this.changeIcon(1);
    },
    preIcon:function(){
        this.changeIcon(-1);
    }
    ,
    open:function(){
        var anim = this.getComponent(cc.Animation);
        anim.play("JumpEnter");
        this.node.x = -357
    },
    close:function(){
        var anim = this.getComponent(cc.Animation);
        anim.play("JumpExit");
    },
    closeAniCall:function(){
        this.node.x = 1000;
    }
    ,
    // use this for initialization
    onLoad: function () {
        this.ExNameStr = {
            EN:["PRO","NAXX","GVG","BRM","TGT","LOE","WOG","TOC","HOT","Xicon"],
            CN:["专家级","纳克萨玛斯","地精大战侏儒","黑石山的火焰","冠军的试炼","探险者协会","上古之神的低语","∞","@芬里厄的安魂曲","无水印"]
        }
        this.cur = 0;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
