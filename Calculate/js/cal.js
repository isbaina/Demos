var _prev=0;
var _next="0";
var _operator="";//保存前一次运算符（+-*/=C）等几个特殊字符用；
var _result=null;//显示结果的文本框
var _flag=0;
// flag作用：保证不能同时执行两次计算，如果按下+-*／C=任意一个键，flag变为0：见51行；连续再次按下+-*/C=键后plus、subtract、multiplication、divide将不能执行if语句，等于没有执行任何代码
// 但是第52行保存了最后一次按下第+-*/C=中的最后一次操作的操作符；
// 然后_next如果被赋值，flag就等于1，见54行，在_next赋值前flag就被改成了1；下次再按下+-*/C=键在调用plus、subtract、multiplication、divide flag是等于1的，所以能执行if语句；
function plus(){
    if(_flag) {
        _result.value = _prev + Number(_next);
        _prev = Number(_result.value);
        _next = "0";
    }
}
function subtract(){
    if(_flag) {
        _result.value = _prev - Number(_next);
        _prev = Number(_result.value);
        _next = "0";
    }
}
function multiplication(){
    if(_flag) {
        _result.value = _prev * Number(_next);
        _prev = Number(_result.value);
        _next = "0";
    }
}
function divide(){
    if(_flag) {
        _result.value = _prev / Number(_next);
        _prev = Number(_result.value);
        _next = "0";
    }
}
function calculate(_target){
    if(Number.isNaN(Number(_target.value))){//表示按下的是非数字
        switch(_operator){
            case "+":plus();break;
            case "-":subtract();break;
            case "*":multiplication();break;
            case "/":divide();break;
            case "C":_result.value=0;_operator="";_prev=0;_next="0";break;
			case "=":"";break;
			
            default:
                _prev=Number(_next);
                _next="0";
                break;
        }
        _flag=0;
        _operator=(_target.value=="="?"":_target.value);
		
    }else{//表示按下的是数字
        _flag=1;
        _next+=_target.value;
        _result.value=Number(_next);
    }
}
function clickEvent(){
    var _calc=document.getElementById("calc");
    for(var i=0;i<_calc.children.length;i++){
        _calc.children[i].onclick=function(){
            calculate(this);
        }
    }
}

window.onload=function(){
    _result=document.getElementById("result");
    clickEvent();
}
