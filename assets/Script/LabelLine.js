cc.Class({
    extends: cc.Component,

    properties: {
        xo: 1,
        yo: 1,
        color:{
            default:cc.color(0,0,0,255),
            type:cc.Color
        },
        lColor:{
            default:cc.color(255,255,255,255),
            type:cc.Color
        }
    },

    onLoad: function () {
        this.updateString();
    },
    syncLabel: function(l1,l2){
        l1.string = l2.string
        l1.font = l2.font
        l1.lineHeight = l2.lineHeight
        l1.overflow = l2.overflow
        l1.fontSize = l2.fontSize
        l1.horizontalAlign = l2.horizontalAlign
        l1.verticalAlign = l2.verticalAlign
        l1.enableWrapText = l2.enableWrapText
    }
    ,
    labelNode:function(str,label,xo,yo,color){
        var node = new cc.Node(str);
        var l1 = node.addComponent(cc.Label);
        this.syncLabel(l1, label)
        node.color = color;
        this.node.addChild(node)
        this._realign( node, xo, yo );
    },

    updateString: function()
    {
        this.node.removeAllChildren();
        
        var xo = this.xo
        var yo = this.yo
        var color = this.color
        //var color = cc.color(255, 255, 255, 255)
        var label = this.getComponent(cc.Label);
        
        if( "" === label.string )
        {
            return;
        }
        
        this.labelNode('label1', label, xo, 0, color)
        this.labelNode('label2', label, -xo, 0, color)
        this.labelNode('label3', label, 0, -yo, color)
        this.labelNode('label4', label, 0, yo, color)
        
        this.labelNode('label6', label, xo, yo, color)
        this.labelNode('label7', label, -xo, -yo, color)
        this.labelNode('label8', label, xo, -yo, color)
        this.labelNode('label9', label, -xo, yo, color)

        this.labelNode('label5', label, 0, 0, this.lColor)

        
        // var node2 = new cc.Node( 'label2' );
        // var l2 = node2.addComponent(cc.Label);
        // this.syncLabel(l2, label)
        // node2.color = color;
        // this.node.addChild(node2,-1)
        // this._realign( node2, xo, -yo );
        
        // var node3 = new cc.Node( 'label3' );
        // var l3 = node3.addComponent(cc.Label);
        // this.syncLabel(l3, label)
        // node3.color = color;
        // this.node.addChild(node3,-1)
        // this._realign( node3, -xo, yo );
        
        // var node4 = new cc.Node( 'label4' );
        // var l4 = node4.addComponent(cc.Label);
        // this.syncLabel(l4, label)
        // node4.color = color;
        // this.node.addChild(node4,-1)
        // this._realign( node4, -xo, -yo );


    },
    
    _round: function( num )
    {
        var _floorNum = Math.floor( num );
        var _remainder = num %  _floorNum;
        
        if( 0.5 > _remainder )
        {
            return Math.floor( num );
        }
        else
        {
            return Math.ceil( num );
        }
    },
    
    _realign: function( _obj, _x, _y )
    {
        //var _w, _h = this.node.getContentSize();
        _obj.setPosition(  _x , _y );
        
        /*
        var _type = this.horizontalAlign;
        
        if( _type == cc.TextAlignment.LEFT )
        {
            _obj.setPosition( this._round( _x + 3 ), _y );
        }
        else if( _type == cc.TextAlignment.RIGHT )
        {
            _obj.setPosition( this._round( _w / 2 ), _y );
        }
        else
        {
            _obj.setPosition( _x, _y );
        }
        */
    }
 });

