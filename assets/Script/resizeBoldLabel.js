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
        boldChar:{
            default:null,
            type:cc.Prefab
        },
        fontSize:{
            default:32,
            visible:false
        },
        description:{
            default:"*战吼：*消灭一只卡巴内",
            multiline: true,
            notify:function(){
              this.updateString()
            }
        },
        lineWidths:{
            default:"290,290,290,260,250,240"
        }
    },
    getLines: function(desStr,lineWidths,boldWords){
        var j = 0;
        var k = 0;
        var wid = 0;
        var lines = [];
        var pLineWids = [];
        var l = "";
        for(var i=0;i<desStr.length;i++){
            var c = desStr.charAt(i);
            var code = desStr.charCodeAt(i);
            var charWid = 0;
            if(code>255) charWid = this.fontSize;
            if((code>47&&code<58)||(code>96&&code<123)) charWid = this.fontSize*0.5698;
            if(code>64&&code<91) charWid = this.fontSize*0.6681;
            
            if("+<>=".indexOf(c)!=-1) charWid = this.fontSize*0.5981;
            if("-(){}\"".indexOf(c)!=-1) charWid= this.fontSize*0.3461;
            if("/,.;:[]".indexOf(c)!=-1) charWid= this.fontSize*0.2875;
            
            if("，".indexOf(c)!=-1) charWid = this.fontSize*0.9858;
            
            /* Chinese symbols are treated like words in browser
            if("。：，；、".indexOf(c)!=-1&&i===desStr.length-1){
                if("：；".indexOf(c)!=-1){
                    charWid = this.fontSize*0.65625;
                }else{
                    charWid = this.fontSize*0.40625;
                }
            }*/
            
            if(charWid===0&&code!=10) continue;        
            
            
            if(i==boldWords[k]){//当前字符需要加粗
                var f = this.fontSize

             /* special handling for simulator and native palform 
               if("：；".indexOf(c)!=-1)
                    boldWords[k]=cc.v2(wid+charWid/2-f/9,j);
                else
                    if("。，、".indexOf(c)!=-1)
                        boldWords[k]=cc.v2(wid+charWid/2-f/3,j);
                    else*/
                        boldWords[k]=cc.v2(wid+charWid/2,j);
                
                k++;
            }
            
            //cc.log("i,lines:",i,lines)
            if(wid+charWid>lineWidths[j]||(code===10)){
                //cc.log("code:",code)
                /*if("。：，；、".indexOf(c)!=-1){
                    if("：；".indexOf(c)!=-1){
                        charWid = this.fontSize*0.65625;
                    }else{
                        charWid = this.fontSize*0.40625;
                    }
                }*/
                if(wid == 0&&code==10) continue
                if(code != 10)
                    l+=c+'\n';
                else
                    l+=c;
                lines[j] = l.toString();
                l = "";
                //cc.log(charWid)
                pLineWids[j] = wid+charWid;
                wid = 0;
                j++;
            }else{
                l+=c;
                wid +=charWid;
            }
            
        }
        lines[j] = l;
        pLineWids[j] = wid;
        var lineNums = j+1;
        
        var lineHeight = this.fontSize + 4;
        for(i=0;i<boldWords.length;i++){
            var v = boldWords[i];
            boldWords[i] = cc.v2(v.x-pLineWids[v.y]/2,(lineNums/2-v.y-0.5)*lineHeight)  ;  
        }
   
        return lines;
    },
    concatStrArr:function(strArr){
        var s = "";
        for(var i=0;i<strArr.length;i++)
            s+= strArr[i];
            
        return s;
    }
    ,
    pushSeq:function(arr,start,end){
        for(var i=0;i<end-start;i++)
            arr.push(start+i);
    }
    ,
    updateString:function(){
        this.node.removeAllChildren();
        var label = this.getComponent(cc.Label);
        var star = true;
        var description = this.description;
        
        this.fontSize = label.fontSize;
        
        var words = description.split('*');
        var desConcat = "";
        var records = [];
        var lines = [];
        var lineWidths = this.lineWidths.split(",");

        for(var i=0;i<lineWidths.length;i++){
            lineWidths[i] = parseInt(lineWidths[i]);
        }
        //cc.log(lineWidths);
        
        desConcat = this.concatStrArr(words);
        for( i=0;i<words.length;i++){
            records[i] = i===0? words[i].length:words[i].length+records[i-1];
        }
        //cc.log("records:",records);
        if(records[0]===0) star = true;
        if(records[records.length-2]===records[records.length-1]) star = true 
        var boldWords = [];
        var boldChars = [];
        for(i=0;i<records.length;i++){
            if(star){
                this.pushSeq(boldWords,records[i],records[i+1]);
            }
            star = !star;
        }
        //cc.log("aaaa",boldWords);
        for(i = 0;i<boldWords.length;i++)
            boldChars[i] = desConcat.charAt(boldWords[i])
        
        this.fontSize = 34
        //根据字数改变字体大小
        var boldPoses
        var temp = []
        do{
            for(i=0;i<boldWords.length;i++)temp[i] = boldWords[i]
            this.fontSize = this.fontSize-2
            
            lines = this.getLines(desConcat,lineWidths,temp);
            //cc.log("lines:",lines)
        }while(lines.length*(this.fontSize+4)>150);
        boldWords = temp
        
        
        
        label.string = this.concatStrArr(lines);
        label.fontSize = this.fontSize
        label.lineHeight = this.fontSize+4
        
        for(i=0;i<boldWords.length;i++){
            var char = cc.instantiate(this.boldChar)
            var l = char.getComponent(cc.Label)
            //var line = char.getComponent("LabelLine")
            
            l.fontSize = this.fontSize
            l.lineHeight = this.fontSize + 4
            l.string = boldChars[i]
            //line.updateString();
            
           // cc.log(typeof char)
            char.setPosition(boldWords[i])
            
            this.node.addChild(char);
            
        }
        cc.log("resizeBoldLabel update over")
    }
    ,
    // use this for initialization
    onLoad: function () {
        this.updateString();
    },

    // // called every frame, uncomment this function to activate update callback
    //  update: function (dt) {

    //  },
});
