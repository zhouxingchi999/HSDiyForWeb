//最近在撸creator html5开发，喜欢交流的加扣扣群427719099，各种资源各种技术应有尽有
var mime = {'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'bmp': 'image/bmp'};
var selectedHandler;
var bytesHandler;
var thisRef;
var MAX_HEIGHT = 300;
var spImg;
var mvImg;
var maxHeight = 512
var maxWid = 640
function loadLocalimg(uri)
{
     //创建一个div   
	var my = document.getElementById("divCreator");
	if(my==null)
    {   my = document.createElement("div");   
        document.body.appendChild(my);   
        my.style.position="absolute";   
	    my.id="divCreator";
        my.style.width=100;   
        my.style.height=100;   
        my.style.backgroundColor="#ffffcc";   
	}
	 my.innerHTML = '<img id=imghead>';
    var img = document.getElementById('imghead');
    img.onload = function(){
		var n=0;
		var spriteFrame=spImg.getComponent('cc.Sprite').spriteFrame;
		var texture=spriteFrame.getTexture();
		texture.initWithElement(this);
		texture.handleLoadedTexture();
	
        var sp = mvImg.getComponent('cc.Sprite').spriteFrame;
        var mvTex=sp.getTexture();
		mvTex.initWithElement(this);
		mvTex.handleLoadedTexture();

		var h = texture.pixelHeight
		var w = texture.pixelWidth
		
		cc.log("pwidth="+w);
		cc.log("pheight="+h);
		
		if(h>maxHeight || w>maxWid){
		    if(h/w>1){
		        w = w*maxHeight/h
		        h = maxHeight
		    }else{
		        h = h*maxWid/w
		        w = maxWid
		    }
		}

		spImg.scaleX = w/spImg.width
		spImg.scaleY = h/spImg.height
		
        mvImg.scaleX = w/spImg.width
		mvImg.scaleY = h/spImg.height

		cc.log("width="+spImg.width);
		cc.log("height="+spImg.height);
		n++;
    }
	img.src = uri;
	my.style.display='none';
	my.style.visibility = "hidden";
	
}
function tmpSelectFile(evt) {
    //console.log("image selected...");
    var file = evt.target.files[0];
    var type = file.type;
    if (!type) {
        type = mime[file.name.match(/\.([^\.]+)$/i)[1]];
    }
    var url = myCreateObjectURL(file);
    loadLocalimg(url);
    
}

function myCreateObjectURL(blob){
    if(window.URL != undefined)
        return window['URL']['createObjectURL'](blob);
    else
        return window['webkitURL']['createObjectURL'](blob);
}


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
        img:{
            default:null,type:cc.Node
        },
        mvPic:{
            default:null,type:cc.Node
        }
    },

    onUpload:function(activate)
    {
         var fileInput = document.getElementById("fileInput");
    if(fileInput==null){
        fileInput = document.createElement("input");
        fileInput.id = "fileInput";
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.style.height = "0px";
        fileInput.style.display = "block";
        fileInput.style.overflow = "hidden";
        document.body.insertBefore(fileInput,document.body.firstChild);
        fileInput.addEventListener('change', tmpSelectFile, false);
    }
    setTimeout(function(){fileInput.click()},100);
    },
    // use this for initialization
    onLoad: function () {
        
    spImg=this.img;
    mvImg=this.mvPic;
    var texture=spImg.getComponent('cc.Sprite').spriteFrame.getTexture();
    var n=0;
    n++;
    
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
