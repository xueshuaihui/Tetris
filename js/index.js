var width=document.documentElement.clientWidth;
var height=document.documentElement.clientHeight;
init(60,"mylegend",width,height,main);
var layer,gamelayer,timelayer,gmlayer,endlayer;
var gmap,basic_style,basic_color,field;
var initx,inity;
var gmaplen,gmaplength,stlen,stlength;
var imglist=[];
var newarr;
var style,color;
var moveDown_t;
var grade=0;
var data=new Array(
    {name:'one',path:"images/1.png"},
    {name:"background",path:"images/background.png"},
    {name:"gbg",path:"images/gbg.jpg"},
    {name:"djs_one",path:"images/one1.png"},
    {name:"djs_two",path:"images/two1.png"},
    {name:"djs_three",path:"images/three1.png"},
    {name:"title",path:"images/title.png"},
    {name:"begin_music",path:"audio/begin_music.ogg"}
)
function main(){
    layer=new LSprite();
    addChild(layer);
    var loadinglayer=new LoadingSample3();
        layer.addChild(loadinglayer);
    LLoadManage.load(data,function(progress){
        loadinglayer.setProgress(progress);
    },function(result){
        imglist=result;
        layer.removeAllChild();
        loadinglayer=null;
        gameinit(game);
        ginit();
        key_dir();
        touch();
    })
}
function gameinit(bacfun){
    /*加载大背景*/
    var bitmapdata=new LBitmapData(imglist.background);
    var bitmap=new LBitmap(bitmapdata);
    bitmap.scaleX=width/bitmap.width;
    bitmap.scaleY=height/bitmap.height;
    layer.addChild(bitmap);
    /*加载游戏背景*/
    var gamebitmapdata=new LBitmapData(imglist.gbg);
    var gamebitmap=new LBitmap(gamebitmapdata);
    initx=(width-gamebitmap.width)/2;
    inity=(height-gamebitmap.height)/2;
    gamebitmap.x=initx;
    gamebitmap.y=inity;
    layer.addChild(gamebitmap);
    /*加载记分牌*/
    var titlebitmapdata=new LBitmapData(imglist.title);
    var titlebitmap=new LBitmap(titlebitmapdata);
    titlebitmap.x=0;
    titlebitmap.y=inity;
    titlebitmap.scaleX=initx/titlebitmap.width;
    titlebitmap.scaleY=initx/titlebitmap.width;
    layer.addChild(titlebitmap);
    /*加载分数*/
    field=new LTextField();
    field.x=initx/5;
    field.y=inity+titlebitmap.height/2;
    field.text="0";
    field.size=100;
    field.color="#4d85c5";
    field.weight="bolder";
    field.font="microsoft yahei";
    layer.addChild(field);
    /*加载倒计时*/
    timelayer=new LSprite();
    timelayer.graphics.drawRect(0,"",[0,0,width,height],true,"rgba(0,0,0,0.9)");
    layer.addChild(timelayer);
    var time=4;
    var t=setInterval(function(){
        time--;
        switch (time){
            case 3:countdown(imglist.djs_three);break;
            case 2:countdown(imglist.djs_two);break;
            case 1:countdown(imglist.djs_one);break;
            default:timelayer.remove();clearInterval(t);gamelayer=new LSprite();layer.addChild(gamelayer);gmlayer=new LSprite();layer.addChild(gmlayer);bacfun();
        }
    },1000)
}
/*倒计时*/
function countdown(timedata){
    var time_bitmapdata=new LBitmapData(timedata);
    var time_bitmap=new LBitmap(time_bitmapdata);
    time_bitmap.scaleX=2;
    time_bitmap.scaleY=2;
    time_bitmap.x=(width-time_bitmap.width*2)/2;
    time_bitmap.y=(height-time_bitmap.height*2)/2;
    timelayer.removeAllChild();
    timelayer.addChild(time_bitmap);
    /*音频*/
    if(LSound.webAudioEnabled){
        LGlobal.webAudio = true;
    }else{
        LGlobal.webAudio = false;
    }
    var sound=new LSound();
    sound.load("audio/begin_music.ogg");
    sound.addEventListener(LEvent.COMPLETE,play);
    function play(){
        sound.play();
        sound.addEventListener(LEvent.SOUND_COMPLETE,function(){
            sound.stop();
        })
    }
}
/*游戏初始化*/
function ginit(){
    gmap=[
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ]
    /*基础样式*/
    basic_style=[
        [
            [1,1,1,1],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ],[
            [0,1,1,0],
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0]
        ],[
            [0,0,1,0],
            [1,1,1,0],
            [0,0,0,0],
            [0,0,0,0]
        ],[
            [0,1,0,0],
            [1,1,1,0],
            [0,0,0,0],
            [0,0,0,0]
        ],[
            [0,1,0,0],
            [0,1,1,1],
            [0,0,0,0],
            [0,0,0,0]
        ],[
            [1,1,0,0],
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0]
        ],[
            [0,0,1,1],
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0]
        ]
    ]
    /*基础颜色*/
    basic_color=[imglist.one];
}
/*抽取随机样式和颜色*/
function Random(){
    var random=Math.floor(Math.random()*7);
    return random;
}
/*游戏开始*/
function game(){
    /*获取随机数*/
    var random=Random();
    /*获取基础样式*/
    style=basic_style[random];
    /*获取基础颜色*/
    color=basic_color[0];
    /*map*/
    gmaplen=gmap.length;/*行数*/
    gmaplength=gmap[0].length;/*列数*/
    /*style*/
    stlen=style.length;/*行数*/
    stlength=style.length;/*列数*/
    /*计算方块应该显示的位置*/
    var start=Math.floor(gmaplength-stlength)/2;/*中间位置*/
    newarr=[];
    for(var i in style){
        for(var j in style[i]){
            if(style[i][j]==1){
                var x=Number(i);
                var y=start+Number(j);
                var arr=[x,y];
                newarr.push(arr);
            }
        }
    }
    /*渲染 newarr*/
    load_arr();
    moveDown_t=setInterval(function(){
        move_down();
        /*判断是否满层*/
        del();
    },500)
}
/*渲染*/
function load_arr(){
    for(var i in newarr) {
        var bitmapdata=new LBitmapData(color);
        var bitmap=new LBitmap(bitmapdata);
        var width=414/gmaplength;
        var height=839/gmaplen;
        bitmap.x=initx+26+width*newarr[i][1];
        bitmap.y=inity+27+height*newarr[i][0];
        bitmap.scaleX=width/bitmap.width;
        bitmap.scaleY=height/bitmap.height;
        gamelayer.addChild(bitmap);
    }
}
function load_map(){
    gamelayer.removeAllChild();
    clearInterval(moveDown_t);
    /*赋值*/
    for(var i in newarr){
        var x=parseInt(newarr[i][0]);
        var y=parseInt(newarr[i][1]);
        gmap[x][y]=1;
    }
    /*渲染map*/
    for(var i=0 in gmap){
        for(var j in gmap[i]){
            if(gmap[i][j]==1){
                var bitmapdata=new LBitmapData(color);
                var bitmap=new LBitmap(bitmapdata);
                var width=414/gmaplength;
                var height=839/gmaplen;
                bitmap.x=initx+26+width*j;
                bitmap.y=inity+27+height*i;
                bitmap.scaleX=width/bitmap.width;
                bitmap.scaleY=height/bitmap.height;
                gmlayer.addChild(bitmap);
            }
        }
    }
    /*如果第一层里面有为1的值，说明游戏结束*/
    for(j in gmap[0]){
        if(gmap[1][j]==1){
            /*游戏结束*/
            clearInterval(moveDown_t);
            end();
            return;
        }
    }
    /*重新调用*/
    game();
}
/*下移*/
function move_down(){
    gamelayer.removeAllChild();
    for(var i in newarr){
        newarr[i][0]++;
    }
    /*下边界和阻碍判定*/
    if(lower_boundary()){
        load_arr();
    }else{
        load_map();
        return;
    }
    if(hinder()){
        load_arr();
    }else{
        load_map();
        return;
    }
}
/*左右移动 direction值为left right*/
function move_left_right(direction){
    for(var i in newarr){
        if(direction=="left"){
            newarr[i][1]--;
        }else if(direction=="right"){
            newarr[i][1]++;
        }
    }
    if(direction=="left"){
        left_boundary();
    }else if(direction=="right"){
        right_boundary();
    }
    gamelayer.removeAllChild();
    load_arr();
}
/*键盘事件*/
function key_dir(){
  LGlobal.window.addEventListener(LKeyboardEvent.KEY_UP,function(event){
      switch (event.keyCode){
          case 37:move_left_right("left");break;
          case 39:move_left_right("right");break;
          case 40:move_down();break;
          case 38:deformation();break;
      }
  })
}
/*触屏事件*/
function touch(){
    //LGlobal.window.addEventListener(LMouseEvent.TOUCH_START,touchstart);
    //LGlobal.window.addEventListener(LMouseEvent.TOUCH_MOVE,touchmove);
    //LGlobal.window.addEventListener(LMouseEvent.TOUCH_END,touchend);
    //function touchstart(event){
    //    console.log(event);
    //};
    //function touchmove(event){
    //    console.log(event);
    //};
    //function touchend(event){
    //    console.log(event);
    //};
    window.addEventListener("touchstart",touchstart);
    window.addEventListener("touchmove",touchmove);
    window.addEventListener("touchend",touchend);
    var startx=0,starty=0;
    var movex=0,movey=0;
    var endx=0,endy=0;
    var direcx=0,direcy=0;
    function touchstart(event){
        startx=event.changedTouches[0].screenX;
        starty=event.changedTouches[0].screenY;
    }
    function touchmove(event){
        movex=event.changedTouches[0].screenX;
        movey=event.changedTouches[0].screenY;
    }
    function touchend(event){
        endx=event.changedTouches[0].screenX;
        endy=event.changedTouches[0].screenY;
        direcx=endx-startx;
        direcy=endy-starty;
        if(direcx<-10){
            /*左移*/
            move_left_right("left");
        }else if(direcx>10){
            /*右移*/
            move_left_right("right");
        }else if(direcy>20){
            /*下移*/
            move_down();
        }else if(Math.abs(direcx)<5&&Math.abs(direcy)<5){
            /*变形*/
            deformation();
        }
    }
}
/*左边界判定*/
function left_boundary(){
    var miny=newarr[0][1];
    for(var i in newarr){
        miny=miny<newarr[i][1]?miny:newarr[i][1];
    }
    if(miny==0){
        return false;
    }
    if(miny<0){
        var x=0-miny;
        for(var j in newarr){
            newarr[j][1]=newarr[j][1]+x;
        }
    }
    /*左边有阻碍*/
    for(j in newarr){
        var x=newarr[j][0];
        var y=newarr[j][1];
        if(gmap[x][y]==1){
            move_left_right("right");
        }
    }
}
/*右边界判定*/
function right_boundary(){
    var maxy=newarr[0][1];
    for(var i in newarr){
        maxy=maxy>newarr[i][1]?maxy:newarr[i][1];
    }
    if(maxy==gmaplength-1){
        return false;
    }
    if(maxy>gmaplength-1){
        var x=maxy-gmaplength+1;
        for(var j in newarr){
            newarr[j][1]=newarr[j][1]-x;
        }
    }
    /*右边有阻碍*/
    for(j in newarr){
        var x=newarr[j][0];
        var y=newarr[j][1];
        if(gmap[x][y]==1){
            move_left_right("left");
        }
    }
}
/*下边界判定*/
function lower_boundary(){
    var maxx=newarr[0][0];
    for(var i in newarr){
        maxx=maxx<=newarr[i][0]?newarr[i][0]:maxx;
    }
    if(maxx>=gmaplen-1){
        /*边界*/
        return false;
    }else{
        return true;
    }
}
/*判断下一层是否有物体*/
function hinder(){
    /*获取最下面一层*/
    var maxx=newarr[0][0];
    for(var i in newarr){
        maxx=maxx<=newarr[i][0]?newarr[i][0]:maxx;
    }
    /*判断最后一层是否有阻碍*/
    for(var j in newarr){
        if(newarr[j][0]==maxx){
            var y=Number(newarr[j][1]);
            var x=Number(newarr[j][0])+1;
            if(gmap[x][y]==1){
                /*有阻碍*/
                return false;
            }else{
                return true;
            }
        }
    }
}
/*变形*/
function deformation(){
    gamelayer.removeAllChild();
    var minx=newarr[0][0],miny=newarr[0][1],blarr=[];
    for(var i in newarr){
        minx=minx<newarr[i][0]?minx:newarr[i][0];
        miny=miny<newarr[i][1]?miny:newarr[i][1];
    }
    /*获取四个点的基础比例*/
    /*触发后进行比例变换*/
    for(var j in newarr){
        var data;
        var x=3/2-(newarr[j][0]-minx);
        var y=3/2-(newarr[j][1]-miny);
        data=-x;
        x=y;
        y=data;
        newarr[j][0]=3/2-x+minx;
        newarr[j][1]=3/2-y+miny-2;
    }
    /*判断变形后是否超出左右边界*/
    right_boundary();
    left_boundary();
    load_arr();
}
/*消除满层 num为落地是的层数*/
function del(){
    outloop:
    for(var i=gmaplen-1;i>=0;i--){
        for(var j=0;j<gmaplength;j++){
            if(gmap[i][j]!=1){
                break;
            }else if(j==gmaplength-1){
                /*消除该行*/
                eliminate(i);
                /*分数加*/
                grade=grade+10;
                /*显示*/
                field.text=grade;
                break outloop;
            }
        }
    }
}
function eliminate(num){
    var num=Number(num);
    for(i in gmap[num]){
        gmap[num][i]=0;
    }
    /*上层全往下移*/
    for(var j=num;j>=0;j--){
        for(k in gmap[j]){
            if(j>0){
                gmap[j][k]=gmap[j-1][k];
            }else if(j=0){
                gmap[0][k]==0;
            }
        }
    }
    /*渲染map*/
    gmlayer.removeAllChild();
    for(var i=0 in gmap){
        for(var j in gmap[i]){
            if(gmap[i][j]==1){
                var bitmapdata=new LBitmapData(color);
                var bitmap=new LBitmap(bitmapdata);
                var width=414/gmaplength;
                var height=839/gmaplen;
                bitmap.x=initx+26+width*j;
                bitmap.y=inity+27+height*i;
                bitmap.scaleX=width/bitmap.width;
                bitmap.scaleY=height/bitmap.height;
                gmlayer.addChild(bitmap);
            }
        }
    }
}
/*游戏结束*/
function end(){
    endlayer=new LSprite();
    layer.addChild(endlayer);
    endlayer.graphics.drawRect(0,"black",[0,0,width,height],true,"rgba(0,0,0,0.7)");
    var field=new LTextField();
    field.htmlText="<font face='microsoft yahei' color='#ffffff' size='80'><p>游戏结束！</p></font><font face='microsoft yahei' color='#ffffff' size='50'><p>您的最终得分：</p></font><font color='#4d85c5' size='100'><b >"+grade+"</b></font>";
    field.x=100;
    field.y=100;
    field.textBaseline = "alphabetic";
    endlayer.addChild(field);
}