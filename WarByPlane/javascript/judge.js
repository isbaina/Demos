/**
 * Created by Evil on 2017/1/6.
 */
function Judge(){
    this.bullets=null;
    this.planes=null;
    this.hurt={
        "small":1,
        "middle":5,
        "huge":100
    }//不同机种所能承受的伤害
    this.container=null;
    this.timer=0;
    var _self=this;
    this.judge=function(){
        window.clearTimeout(_self.timer);
        _self.bullets=document.getElementsByTagName("span");
        _self.planes=document.getElementsByTagName("div");
        for(var i=0;i<_self.bullets.length;i++){
            for(var n=0;n<_self.planes.length;n++){
                if(_self.planes[n].className=="small" || _self.planes[n].className=="middle" || _self.planes[n].className=="huge"){
                    if(_self.bullets[i].offsetTop<_self.planes[n].offsetTop+_self.planes[n].clientHeight && _self.bullets[i].offsetTop>=_self.planes[n].offsetTop && _self.bullets[i].offsetLeft>_self.planes[n].offsetLeft && _self.bullets[i].offsetLeft<_self.planes[n].offsetLeft+_self.planes[n].clientWidth){
                        _self.planes[n].hurt=parseInt(_self.planes[n].hurt)+1;
                        _self.container.removeChild(_self.bullets[i]);
                        break;
                    }
                }
                if(parseInt(_self.planes[n].hurt)>=_self.hurt[_self.planes[n].className]){

                    _self.container.removeChild(_self.planes[n]);
                }
            }
        }
        _self.timer=window.setTimeout(_self.judge,30);
    }
}