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
        ribbon:{
            default:null,
            type:cc.Sprite
        }
        ,
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
        },
        picMask:{
            default:null,
            type:cc.Node
        }
    },
    changeClass:function(classID){
        var sp = this.cardBack
        
        var cardType = this.cardTypeStr[this.typeID]
        var loadName = cardType.EN+this.cClassesStr[classID].EN;
        var atlasName = cardType.RAW;
        var wpCore = this.node.getChildByName("WeaponCore").getComponent(cc.Sprite);

        if(this.typeID!=2){
            cc.loader.loadRes(atlasName, cc.SpriteAtlas, function (err, SpriteAtlas) {
            sp.spriteFrame = SpriteAtlas.getSpriteFrame(loadName);
            });
        }else{
            cc.loader.loadRes(atlasName, cc.SpriteAtlas, function (err, SpriteAtlas) {
            wpCore.spriteFrame = SpriteAtlas.getSpriteFrame(loadName+"_core");
            });         
        }

        this.classID = classID
    },
    changeCardType(typeID){
        this.typeID = typeID;
        var cardType = this.cardTypeStr[this.typeID]
        var classID = this.classID;

        var cardBack = this.cardBack;
        var ribbon = this.ribbon;
        var gem = this.gem;
        var raceTag = this.raceTag;
        var dragon = this.dragon;
        var waterMark = this.waterMark;
        var picMask = this.picMask.getComponent(cc.Mask);
        var picFrame = this.picMask.parent.getChildByName("frame");
        var nameL = this.nameL;
        var nameJS = this.nameL.node.getComponent("Name");
        var desJS = this.des.getComponent('resizeBoldLabel')
        var dragon = this.dragon;
        //Reload cardBack
        var atlasName = cardType.RAW;
        var loadName = cardType.EN+this.cClassesStr[classID].EN;
        var des = this.des
        
        this.dragon.node.active = false;
        this.node.getChildByName("WeaponCore").active = false;
        desJS.color = new cc.Color(0, 0, 0);
        des.node.color = new cc.Color(0, 0, 0);                 
        this.desEdit.fontColor = new cc.Color(0, 0, 0);

        if(typeID != 2){
            cc.loader.loadRes(atlasName, cc.SpriteAtlas, function (err, SpriteAtlas) {
                //cc.log("SpriteAtlas:", SpriteAtlas)
                //cc.log(spName,spr);
                cc.log(SpriteAtlas,loadName)
                cardBack.spriteFrame = SpriteAtlas.getSpriteFrame(loadName);
               
            });
        }    
        else{
            this.node.getChildByName("WeaponCore").active = true;
            cc.loader.loadRes("weaponBk", cc.SpriteFrame, function (err, spriteFrame) {
                //cc.log("SpriteAtlas:", SpriteAtlas)
                //cc.log(spName,spr);
                cc.log(spriteFrame,"weaponBk")
                cardBack.spriteFrame = spriteFrame;
            });
        }

        //Reload Ribbon
        cc.loader.loadRes("first", cc.SpriteAtlas, function (err, SpriteAtlas) {
            ribbon.spriteFrame = SpriteAtlas.getSpriteFrame(cardType.EN+"ribbon");
        })

        //Reload GemStone
        if(this.rarityID != 0){
            var gemName = this.rarityStr[this.rarityID]
            cc.loader.loadRes(atlasName, cc.SpriteAtlas, function (err, SpriteAtlas) {
                gem.spriteFrame = SpriteAtlas.getSpriteFrame(cardType.EN+gemName.EN);
            })
        }

        //Reload Watermark
        cc.loader.loadRes("water", cc.SpriteAtlas, function (err, SpriteAtlas) {
            waterMark.spriteFrame = SpriteAtlas.getSpriteFrame(cardType.EN+waterMark.name);
        })
 
        if(typeID == 0){
            this.ack.node.opacity = 255;
            this.health.node.opacity = 255;
            this.AHCControl.getChildByName("AckHealthControl").active = true;

            this.raceEdit.node.active = true;

            waterMark.node.position = cc.v2(297.2, 248);
            ribbon.node.position = cc.v2(293.1, 398);
            gem.node.parent.position = cc.v2(297.4, 370.7);
            this.node.getChildByName("AHC").position = cc.v2(997, 0);

            picMask.type = 1;
            picMask.node.setContentSize(262.4,378.2);
            picFrame.position = cc.v2(296,592);
            picFrame.setContentSize(261,292.3);

            nameL.node.position = cc.v2(298, 398.2);
            nameJS.cardType = 0;
            nameJS.updateString();

            desJS.lineWidths = "290,290,290,260,250,240,240";
            desJS.updateString();

            dragon.node.active = true;
        }

        if(typeID == 1){
            //Close ack and health adjust module
            this.ack.node.opacity = 0;
            this.health.node.opacity = 0;
            this.AHCControl.getChildByName("AckHealthControl").active = false;
            
            //Close raceTag
            this.raceEdit.node.active = false;

            waterMark.node.position = cc.v2(288.5, 263.6);
            ribbon.node.position = cc.v2(286.4, 404.7);
            gem.node.parent.position = cc.v2(281.6, 372.9);
            this.node.getChildByName("AHC").position = cc.v2(997, 11);

            picMask.type = 0;
            picMask.node.setContentSize(360,300);
            picFrame.position = cc.v2(288.8,574.5);
            picFrame.setContentSize(328.6,245.5);

            nameL.node.position = cc.v2(284.6, 434.2);
            nameJS.cardType = 1;
            nameJS.updateString();

            desJS.lineWidths = "180,250,280,280,280,280,280";
            desJS.updateString();
        }

      
        if( typeID == 2 ){
            this.ack.node.opacity = 255;
            this.health.node.opacity = 255;
            this.AHCControl.getChildByName("AckHealthControl").active = true;

            this.raceEdit.node.active = false;

            waterMark.node.position = cc.v2(297.8, 260.3);
            ribbon.node.position = cc.v2(285.5, 412.4);
            gem.node.parent.position = cc.v2(274.8, 389.7);
            this.node.getChildByName("AHC").position = cc.v2(977, 3);

            picMask.type = 1;
            picMask.node.setContentSize(320,320);
            picFrame.position = cc.v2(285,584);
            picFrame.setContentSize(312,270);

            nameL.node.position = cc.v2(284.6, 421.2);
            nameJS.cardType = 2;
            nameJS.updateString();



            desJS.lineWidths = "260,260,260,240,220,220,220";
            desJS.color = new cc.Color(255, 255, 255);
            des.node.color = new cc.Color(255, 255, 255);
            desJS.updateString();
            
            this.desEdit.fontColor = new cc.Color(255, 255, 255);
        }
    }
    ,
    backGroundCallback:function(){
        cc.log("Background release control")
        this.releaseControl(null);
    }
    ,
    test:function(){
        this.typeID = (this.typeID+1)%3
    this.changeCardType(this.typeID);
    //this.captureScreen();
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
        //var proxyL = label.getComponent("LabelProxy")
        var val = parseInt(label.string) 
        if(isNaN(val)) return;
        val+=num
        if(val>max||val<min) return
        
        label.string = ""+val
        //cc.audioEngine.setEffectsVolume(0.25)
        //cc.audioEngine.playEffect(this.increAudio,false)
        
        var labelLine = label.getComponent("LabelLine")
        labelLine.updateString();
    },
    activeAHCControlCCall:function(){
        this.releaseControl(this.AHCControl);
        //this.AHCControl.opacity = 255;
        this.AHCControl.setPositionX(-987)
    },
    inactiveAHCControl:function(){
        //this.AHCControl.opacity = 0;
        this.AHCControl.setPositionX(0)
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
        
        //this.message.string += "Description text begin\n";
        cc.log("Description text begin");
    },
    descriptionDidChange:function(text){
        //this.message.string += "Description text Change\n";
        
    }
    ,
    descriptionDidEnd:function(){
        cc.log("Description text end, text:",this.desEdit.string);
        //this.message.string += "Description text end\n";
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
        this.rarityID = (this.rarityID+1)%7
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
        //this.gem.node.setScale(2);
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
        {EN:"monk",CN:"武僧"},
        {EN:"DK",CN:"死骑"},
        {EN:"neutral",CN:"中立"},
        ]
        this.cardTypeStr = [
            {EN:"m_",CN:"随从",RAW:"minion"},
            {EN:"s_",CN:"法术",RAW:"spell"},
            {EN:"w_",CN:"武器",RAW:"weapon"},
        ]
        
        this.rarityStr = [
            {EN:"basic",CN:"基础"},
            {EN:"normal",CN:"普通"},
            {EN:"rare",CN:"稀有"},
            {EN:"epic",CN:"史诗"},
            {EN:"legend",CN:"传说"},
            {EN:"awesome",CN:"奇迹"},
            {EN:"splendid",CN:"伟大"}
        ]
        
        this.classID = 4
        this.rarityID = 3
        this.typeID = 0
        this.waterMark.name = "w_PRO"
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
