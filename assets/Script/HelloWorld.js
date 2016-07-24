cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        text: '2 2'
    },
    modString: function(){
        this.label.string = "2"
    }
    ,

    // use this for initialization
    onLoad: function () {
        cc.log(cc.RenderTexture)
        this.label.string = this.text;
    },

    // called every frame
    update: function (dt) {

    },
});
