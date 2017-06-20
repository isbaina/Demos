/**
 * Created by Evil on 2017/1/5.
 */
function Stage(_stage){
    this.stage=document.getElementById(_stage);
    this.height=document.documentElement.clientHeight||document.body.clientHeight;
    this.width=document.documentElement.clientWidth||document.body.clientWidth;
    this.timer=0;
    var _self=this;
    this.top=0;
    this.mine=new Mine("me");
    this.main=function(){
        this.stage.style.height=this.height+"px";
        this.stage.style.width=this.height/853*480+"px";
        this.moveStage();//调用让背景动起来
        this.mine.main();
        this.eventHandle();
        var _enemy=new Enemy();
        _enemy.container=this.stage;
        _enemy.moveEnemy();
        var _judge=new Judge();
        _judge.container=this.stage;
        _judge.judge();
    }
    this.moveStage=function(){
        window.clearTimeout(_self.timer);
        _self.stage.style.backgroundPosition="0px "+(_self.top+=20)+"px";
        _self.timer=window.setTimeout(_self.moveStage,60);
    }
    this.eventHandle=function(){
        this.stage.onmousemove=function(e){
            e=e||window.event;
            if(e.clientX-(_self.width-_self.stage.clientWidth)/2>0 && e.clientX-(_self.width-_self.stage.clientWidth)/2<_self.stage.clientWidth-_self.mine.mine.clientWidth) {
                _self.mine.mine.style.left = e.clientX - (_self.width - _self.stage.clientWidth) / 2 + "px";
            }
        }
    }
}