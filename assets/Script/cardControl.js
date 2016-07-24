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
        /*clipPic:{
            default:null,
            type:cc.Node
        },*/
        dragon:{
            default:null,
            type:cc.Sprite
        }
        ,
        pic:{
            default:null,
            type:cc.Node
        }
        ,
        cardBack:{
            default:null,
            type:cc.Sprite
        },
        nameL:{
            default:null,
            type:cc.Label
        },
        gem:{
            default:null,
            type:cc.Sprite
        },
        tag:{
            default:null,
            type:cc.Sprite
        },
        race:{
            default:null,
            type:cc.Label
        },
        raceEdit:{
            default:null,
            type:cc.EditBox
        },
        nameEdit:{
            default:null,
            type:cc.EditBox
        },
        AHCControl:{
            default:null,
            type:cc.Node
        },
        cost:{
            default:null,
            type:cc.Label
        },
        ack:{
            default:null,
            type:cc.Label
        },
        health:{
            default:null,
            type:cc.Label
        },
        message:{
            default:null,
            type:cc.Label
        },
        des:{
            default:null,
            type:cc.Label
        },
        desEdit:{
            default:null,
            type:cc.EditBox
        },
        increAudio: {
            default: null,
            url: cc.AudioClip
        },
        waterMark:{
            default: null,
            type:cc.Sprite
        }
    },
    changeCardType(typeID){
        
    }
    ,
    backGroundCallback:function(){
        cc.log("Background release control")
        this.releaseControl(null);
    }
    ,
    test:function(){
  
    this.captureScreen();
    //    cc.loader.load({id: 'D:\\HelloWorld.png', type: 'png'}, function (err, tex) {
    //cc.log('Should load a texture from RESTful API by specify the type: ' + (tex instanceof cc.Texture2D));
//});

    /*
        var msg = jsb.fileUtils.getWritablePath();
        var pic = this.pic
        this.message.string = msg;
        var url = cc.url.raw(" ")
        
        this.message.string += "\n"+url;
        cc.loader.loadRes("ProIcon", cc.SpriteFrame, function (err, spriteFrame) {
            pic.getComponent(cc.Sprite).spriteFrame = spriteFrame;
});     
        jsb.fileUtils.addSearchPath(msg,true)
        jsb.fileUtils.addSearchPath(url,true)
        cc.log(jsb.fileUtils.getSearchPaths())
        this.message.string +="\n HelloWorld path:"+jsb.fileUtils.fullPathForFilename("HelloWorld.png");
         cc.log("WriteablePath:",msg);*/
    }
    ,
    releaseControl:function(obj){
        if(this.control == obj) return
        switch (this.control){
            case this.AHCControl:  this.inactiveAHCControl(); break;
            case this.pic   : this.picClose(); break;
            default: 
                if(this.control!=null&&this.control.close!=null) this.control.close(); break;
        }
        this.control = obj
    }
    ,
    picClose:function(){
           var picSet = this.pic.getComponent("picSet");
           var mvPic = picSet.mvPic;
           var posFrame = picSet.posFrame;
           var coin = picSet.coin;
           coin.opacity = 0;
           mvPic.opacity = 0;
            cc.log("Pic closed")
            
    }
    ,
    incrementLabel:function(label,num,min,max){
        var proxyL = label.getComponent("LabelProxy")
        var val = parseInt(proxyL.string) 
        if(isNaN(val)) return;
        val+=num
        if(val>max||val<min) return
        
        proxyL.string = ""+val
        cc.audioEngine.setEffectsVolume(0.25)
        cc.audioEngine.playEffect(this.increAudio,false)
        
        //var labelLine = label.getComponent("LabelLine")
        //labelLine.updateString();
    },
    activeAHCControlCCall:function(){
        this.releaseControl(this.AHCControl);
        //this.AHCControl.opacity = 255;
        this.AHCControl.setPositionX(0)
    },
    inactiveAHCControl:function(){
        //this.AHCControl.opacity = 0;
        this.AHCControl.setPositionX(1000)
    }
    ,    
    increAck:function(){
        this.incrementLabel(this.ack,1,0,99);
    },
    decreAck:function(){
        this.incrementLabel(this.ack,-1,0,99);
    },
    increHealth:function(){
        this.incrementLabel(this.health,1,0,99);
    },
    decreHealth:function(){
        this.incrementLabel(this.health,-1,1,99);
    },
    increCost:function(){
        this.incrementLabel(this.cost,1,0,99);
    },
    decreCost:function(){
        this.incrementLabel(this.cost,-1,0,99);
    },
    descriptionDidBegin:function(){
        this.releaseControl(this.desEdit);
        
        this.des.node.removeAllChildren();
        this.des.node.opacity = 0;
        
        this.desEdit.string = this.des.getComponent("resizeBoldLabel").description  ;
        this.desEdit.fontSize = this.des.fontSize;
        
        this.message.string += "Description text begin\n";
        cc.log("Description text begin");
    },
    descriptionDidChange:function(text){
        this.message.string += "Description text Change\n";
        
    }
    ,
    descriptionDidEnd:function(){
        cc.log("Description text end, text:",this.desEdit.string);
        this.message.string += "Description text end\n";
        this.des.node.opacity = 255;

        this.des.getComponent("resizeBoldLabel").description = this.desEdit.string;
    }
    ,
    nameDidBegin:function(){
        this.releaseControl(this.nameEdit);
        //this.message.string += "name text begin\n"
        // this.nameL.node.removeAllChildren()
        // this.nameL.string = this.nameEdit.string
        this.nameL.node.opacity = 0;
        this.nameEdit.string = this.nameL.getComponent("Name").nameStr;
        cc.log("Description text begin");
    },
    nameDidChange:function(text){
        
    }
    ,
    nameDidEnd:function(){
        this.nameL.node.opacity = 255;
        //this.message.string += "name text end\n"
        this.nameL.getComponent("Name").nameStr = this.nameEdit.string;
        //this.nameL.getComponent("Name").nameStr = this.nameEdit.string;
    },
    raceDidBegin:function(){
        this.releaseControl(this.raceEdit);
        this.race.node.opacity = 0;
        this.raceEdit.string = this.race.getComponent("LabelProxy").string;
        //this.message.string += "race text begin\n"
        cc.log("Description text begin");
        
    },
    raceDidChange:function(text){
        
    }
    ,
    raceDidEnd:function(){
        this.race.node.opacity = 255;
        
        
        var lp = this.race.getComponent("LabelProxy")
        lp.string = this.raceEdit.string;
        
        
        this.tag.node.opacity = lp.string.length<1? 0:255;
        //this.message.string += "race text end\n"
        //this.desEdit.string = this.des.getComponent("resizeBoldLabel").description
    },
    loadSPFToSpr:function(spr,uri,spriteName){
        cc.loader.loadRes(uri, cc.SpriteAtlas, function (err, SpriteAtlas) {
            cc.log("SpriteAtlas:", SpriteAtlas)
            spr.spriteFrame = SpriteAtlas.getSpriteFrame(spriteName);
        })
    }
    ,
    changeRarity:function(){
        this.rarityID = (this.rarityID+1)%5
        var cardType = this.cardTypeStr[this.typeID]
        this.releaseControl(this.gem)

        var rarityStr = this.rarityStr[this.rarityID]
    
        //cc.log("change gem:",cardType.RAW+"/"+cardType.EN+rarityStr.EN)//+".plist/"+this.cardType.EN+pre.EN)
        if(this.rarityID != 0){
            this.gem.node.opacity = 255
            this.loadSPFToSpr(this.gem,cardType.RAW,cardType.EN+rarityStr.EN)//+".plist/"+this.cardType.EN+pre.EN)
        }
        else
            this.gem.node.opacity = 0
        if(this.rarityID == 4)
            this.dragon.node.opacity = 255;
        else   
            this.dragon.node.opacity = 0;
 
    },
    captureScreen: function(){
        var renderTexture = cc.RenderTexture.create(599,599);
        renderTexture.begin();
        this.node._sgNode.visit();
        renderTexture.end();
        
        renderTexture. saveToFile("d:\\demo.png","PNG"); 
        //this.node._sgNode.addChild( renderTexture , 9999 );
        
       // this.node.addChild( renderTexture , 9999 );
    }
    ,
    changeClass:function(classID){
        var sp = this.cardBack
        var cardType = this.cardTypeStr[this.typeID]
        var loadName = cardType.EN+this.cClassesStr[classID].EN;
        var atlasName = cardType.RAW;

        cc.loader.loadRes(atlasName, cc.SpriteAtlas, function (err, SpriteAtlas) {
            //cc.log("SpriteAtlas:", SpriteAtlas)
            //cc.log(spName,spr);
            cc.log(SpriteAtlas,loadName)
            sp.spriteFrame = SpriteAtlas.getSpriteFrame(loadName);
        })

        this.classID = classID
    }
    ,
    // use this for initialization
    onLoad: function () {
    
        this.cClassesStr = [{EN:"warrior",CN:"战士"},
        {EN:"priest",CN:"牧师"},
        {EN:"warlock",CN:"术士"},
        {EN:"hunter",CN:"猎人"},
        {EN:"mage",CN:"法师"},
        {EN:"paladin",CN:"圣骑士"},
        {EN:"druid",CN:"德鲁伊"},
        {EN:"shaman",CN:"萨满"},
        {EN:"rouge",CN:"盗贼"},
        {EN:"neutral",CN:"中立"},
        ]
        this.cardTypeStr = [
            {EN:"m_",CN:"随从",RAW:"minion"},
            {EN:"s_",CN:"法术",RAW:"spell"},
            {EN:"w_",CN:"武器",RAW:"w"},
        ]
        
        this.rarityStr = [
            {EN:"basic",CN:"基础"},
            {EN:"normal",CN:"普通"},
            {EN:"rare",CN:"稀有"},
            {EN:"epic",CN:"史诗"},
            {EN:"legend",CN:"传说"},
        ]
        
        this.classID = 4
        this.rarityID = 3
        this.typeID = 0
        
        //     this.desEdit.enabled = true
        //     this.raceEdit.enabled = true
        //     this.nameEdit.enabled = true
        
        // this.node.runAction(cc.sequence(cc.delayTime(3),cc.callFunc(function(){

        //     this.des.node.opacity = 255
        //     this.nameL.node.opacity = 255
        //     this.race.node.opacity = 255
        // },this)
        // ))
        
        cc.log(this.classID)
        cc.log("RenderTexture:",cc.RenderTexture)
    },  

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
