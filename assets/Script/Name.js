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
        nameChar:{
            default:null,
            type: cc.Prefab
        },
        padding : 0,
        fontSize:40,
        nameStr:{
            default:"无名",
            notify:function(){
                this.updateString()
            }
        }
    },
    updateString:function(){
        this.node.removeAllChildren()
        var s = this.nameStr
        
        
        var words = [];
        for(var i=0;i<s.length;i++){
            words.push(String.fromCharCode(s.charCodeAt(i)))//Split nameStr into seperated words
        }

        var start = 0===s.length%2?-s.length/2+0.5:-(s.length-1)/2;
        
        var posXs = [];
        var wid = 0;
    
        for(i=0;i<s.length;i++){
            var c = s.charAt(i);
            var code = s.charCodeAt(i);
            var charWid = 0
            if(code>255) charWid = this.fontSize;
            if((code>47&&code<58)||(code>96&&code<123)) charWid = this.fontSize*0.5568;
            if(code>64&&code<91) charWid = this.fontSize*0.6681;
            
            if(c=='+') charWid = this.fontSize*0.5841;
            if("-()".indexOf(c)!=-1) charWid= this.fontSize*0.3321;
            if("/,.;:".indexOf(c)!=-1) charWid= this.fontSize*0.2775;
            
            if(charWid===0) charWid = 32;
            
            posXs[i] = wid+charWid/2
            wid+=charWid
        }
        
        for(i=0;i<s.length;i++){
            var name = cc.instantiate(this.nameChar)
            var label = name.getComponent(cc.Label)
            label.string = words[i]
            label.fontSize = this.fontSize
            
            var a = 14
            var b = Math.PI/280
            var ox = 80
            var oy = 0
           
            var posX = this.padding*(start+i)+posXs[i]-wid/2
            var posY = a*Math.sin(b*(posX+ox))+oy
                        
            name.setPositionX(posX)
            name.setPositionY(posY)
            
            var k = a*b*Math.cos(b*(posX+ox))
            var rotation = -180/Math.PI*Math.atan(k)
            
            name.setRotation(rotation)
            
            this.node.addChild(name);
        }
        cc.log("Name module update over");
    }
    ,
    // use this for initialization
    onLoad: function () {
        this.updateString()
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
