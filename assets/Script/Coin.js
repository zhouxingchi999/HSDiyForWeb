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
            mvPic:{
                default:null,
                type:cc.Node
            },
            pic:{
                default:null,
                type:cc.Node
            },
            op_threshold: {
                default: 5,
                type: cc.Integer
            }
    },

    // use this for initialization
    onLoad: function () {
        var oScaleX = this.mvPic.scaleX;
        var oScaleY = this.mvPic.scaleY;
        var oDist = cc.pDistance(this.node.position,this.mvPic.position);
        var node = this.node

        var mvPic = this.mvPic
        var pic = this.pic
        //var mvPoint = node.convertToNodeSpace(this.mvPic.position)
        var isScale = false;//If true, operate scaling
        var accLength = 0;
        var op_threshold = this.op_threshold
        var oPoint
        var oRotation = this.mvPic.rotation;
        cc.log("mvPoint",node.position);
        cc.log("mvPosition",mvPic.position)
        var listener = {
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touches, event) {
                var point = touches.getLocation ( );
                var iPoint = node.parent.convertToNodeSpace(point)
                
                
                oPoint = iPoint;
                oDist = cc.pDistance(oPoint,mvPic.position);
                cc.log("iPoint:",iPoint);
                cc.log("point:",point);

                point = node.convertToNodeSpace(point)
                var x = point.x;
                var y = point.y;
                if(x>0&&y>0&&x<node.width&&y<node.height){
                    event.stopPropagation();
                    oScaleX = mvPic.scaleX;
                    oScaleY = mvPic.scaleY;

                    cc.log("Original scaleXY",oScaleX,oScaleY);
                    return true;
                }

                return false;
            },
            onTouchMoved: function (touches, event) {
                var delta = touches.getDelta()
                var point = node.parent.convertToNodeSpace(touches.getLocation());
                
                var dist = cc.pDistance(point, mvPic.position);
               
                var oVec = cc.v2(oPoint.x,oPoint.y).sub(mvPic.position)
                var nVec = cc.v2(point.x,point.y).sub(mvPic.position) 
                cc.log(oVec);
                cc.log(nVec);

                var cross = cc.pCross(nVec,oVec)
                var fact = cross>0?1:-1; 
                var r = cc.pAngle(oVec,nVec)   
                var theta = mvPic.rotation/180*Math.PI;    
                var height = mvPic.height/2;
                
                accLength+=cc.pLength(delta);
                //cc.log("acc",accLength);
                if(accLength<op_threshold){//within a short routine starting form initial touch point 
                     var v1 = cc.v2(point.x - oPoint.x, point.y - oPoint.y)//vec form oPoint to current touch point
                     var r2 = cc.pAngle(v1,cc.v2(node.x-mvPic.x,node.y-mvPic.y))*180/Math.PI;//Angle in degree
                     //cc.log(oPoint)
                     //cc.log("x,y off:",offX,offY);
                     //cc.log(r2)
                     if(r2>135||r2<45) isScale = true;
                     else
                        isScale = false;                   
                }else if(isScale){//scaling mode
                    var proj = Math.cos(r)*dist;
                    
                    var factor = proj/oDist;

                    mvPic.scaleX =factor*oScaleX;
                    mvPic.scaleY =factor*oScaleY;

                    pic.scaleX =factor*oScaleX;
                    pic.scaleY =factor*oScaleY;

                    node.x = mvPic.x - Math.sin(theta)*proj;
                    node.y = mvPic.y - Math.cos(theta)*proj;
                }else{//rotation mode
                    r*=fact;
                    //cc.log("Rotation f: ",r,fact)
                    //cc.log(cc.pCross(oVec,nVec))
                    //cc.log(cc.pCross(nVec,oVec))
                    mvPic.rotation  = r*180/Math.PI+oRotation;
                    pic.rotation  = r*180/Math.PI+oRotation;
                    
                    node.rotation = mvPic.rotation;
                    node.x = mvPic.x - Math.sin(mvPic.rotation/180*Math.PI)*height*mvPic.scaleY;
                    node.y = mvPic.y - Math.cos(mvPic.rotation/180*Math.PI)*height*mvPic.scaleY;
                }
                
            },
            onTouchEnded: function (touches, event) {
                accLength=0;
                oRotation = mvPic.rotation;
            },
            onTouchCancelled: function (touches, event) {
                cc.log('Touch Cancelled: ' + event);
            }
        }
        cc.eventManager.addListener(listener, this.node);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
