/**
 * Created by Evil on 2017/1/5.
 */
function Enemy(){
    this.time=0;//计算总时长，10s出boss,4s出中型战机，120ms出小战机
    this.timer=0;
    this.height=document.documentElement.clientHeight||document.body.clientHeight;
    this.container=null;//添加敌机的容器。实例化对象后初始化。
    this.plane=null;
    var _self=this;
    this.createPlane=function(_type){
        var _plane=document.createElement("div");
        switch(_type){
            case "small":
                _plane.className="small";
                _plane.hurt=0;
                _plane.style.width=853/this.height*59+"px";
                _plane.style.height=853/this.height*36+"px";
                _plane.style.left=(this.container.clientWidth-853/this.height*59)*Math.random()+"px";
                _plane.style.top="0px";
                break;
            case "middle":
                _plane.className="middle";
                _plane.hurt=0;
                _plane.style.width=853/this.height*70+"px";
                _plane.style.height=853/this.height*92+"px";
                _plane.style.left=(this.container.clientWidth-853/this.height*92)*Math.random()+"px";
                _plane.style.top="0px";
                break;
            case "huge":
                _plane.className="huge";
                _plane.hurt=0;
                _plane.style.width=853/this.height*165+"px";
                _plane.style.height=853/this.height*256+"px";
                _plane.style.left=(this.container.clientWidth-853/this.height*256)*Math.random()+"px";
                _plane.style.top="0px";
                break;
        }
        return _plane;
    }
    this.moveEnemy=function(){
        window.clearTimeout(_self.timer);
        _self.time+=50;
        _self.container.appendChild(_self.createPlane("small"));
        if(_self.time%1000==0){
            _self.container.appendChild(_self.createPlane("middle"));
        }
        if(_self.time%5000==0){
            _self.container.appendChild(_self.createPlane("huge"));
            _self.time=0;
        }
        _self.plane=_self.container.getElementsByTagName("div");
        for(var i=0;i<_self.plane.length;i++){
            switch(_self.plane[i].className){
                case "small":
                    _self.plane[i].style.top=_self.plane[i].offsetTop+100+"px";
                    break;
                case "middle":
                    _self.plane[i].style.top=_self.plane[i].offsetTop+5+"px";
                    break;
                case "huge":
                    _self.plane[i].style.top=_self.plane[i].offsetTop+4+"px";
                    break;
            }
        }
        _self.timer=window.setTimeout(_self.moveEnemy,500);
    }
}