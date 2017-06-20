/**
 * Created by Evil on 2017/1/5.
 */
function Bullet(){
    this.bullet=null;
    this.timer=0;
    this.ms=60;
    this.bullets=null;
    this.stage=null;
    var _self=this;
    this.createBullet=function(){
        this.bullet=document.createElement("span");
        this.bullet.className="bullet";
        return this.bullet;
    }
    this.moveBullet=function(){
        window.clearTimeout(_self.timer);
        for(var i=0;i<_self.bullets.length;i++){
            if(_self.bullets[i].className=="bullet"){
                if(_self.bullets[i].offsetTop>-_self.bullets[i].clientHeight) {
                    _self.bullets[i].style.top = _self.bullets[i].offsetTop - 18 + "px";
                }else{
                    _self.stage.removeChild(_self.bullets[i]);
                }
            }
        }
        _self.timer=window.setTimeout(_self.moveBullet,_self.ms);
    }
}