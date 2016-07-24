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
        LabelOutline:3.3
        ,
        lColor:{
            default:cc.color(255,255,255,255),
            type:cc.Color,
            notify:function(){
                this.setOutColor()
            }
        },
        string:{
            default:"1",
            notify:function(){
                this.updateString()
            }
        }
    },
    setOutColor: function(){
        var outline = this.node.getComponent(cc.LabelOutline);
        outline.color = this.lColor;
    }
    ,
    updateString: function(){
        this.node.removeAllChildren();
        
        var node = new cc.Node("New Label");
        var label = node.addComponent(cc.Label);
        var outline = node.addComponent(cc.LabelOutline);
        
        label.string = this.string;
        
        var oLabel = this.node.getComponent(cc.Label);
        oLabel.string = "1"
        label.font = oLabel.font;
        label.fontSize = oLabel.fontSize
        //label.horizontalAlign = oLabel.horizontalAlign
       // label.verticalAlign = oLabel.verticalAlign 
        label.lineHeight = oLabel.lineHeight
      //  label.overflow = oLabel.overflow
        //label.actualFontSize = oLabel.actualFontSize
        
        outline.color = this.lColor;
        outline.width = this.LabelOutline;
        
        node.parent = this.node;
        oLabel.string = ""
    }
    ,
    // use this for initialization
    onLoad: function () {
        this.updateString();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
