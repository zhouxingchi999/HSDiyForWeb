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
        string:{
            default:"没有合适的消息",
            multiline: true,
            notify:function(){
              this.massage.string = this.string;
            }
        },
        massage:{
            default:null,
            type:cc.Label
        }
    },
    close:function () {
        var anim = this.getComponent(cc.Animation);
        anim.play("JumpExit");
    },
    open:function () {
        var anim = this.getComponent(cc.Animation);
        anim.play("JumpEnter");
        this.node.x = -328;
    },
    closeAniCall:function(){
        this.node.x = -1343;
    }
    ,
    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
