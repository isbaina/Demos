function App(){
	var _me=this;//保存当前对象
	this.units={};//插件都放到安装到此处
	this.components=[];//所有组件都放到这里
	this.dom=function(_identify){
		return document.getElementById(_identify);
	}
	this.list=function(_tag){
		return document.getElementsByTagName(_tag);
	}
	function exchange(_target){//切换组件
		for(var n=0;n<_me.components.length;n++){
			if(_target.match(/\/#\w+(\/\w+)*/g)[0]===_me.components[n].url){//路由锚点与组件对应都url进行匹配
				window.history.pushState({
					"url":_target
				},'',_target);//匹配完成以后将锚点添加到历史记录中
				_me.dom(_me.components[n].target).innerHTML=_me.components[n].template;//将当前url对应到模板渲染到目标容器中
				for(var k in _me.components[n].methods){//循环遍历该组件所要执行的方法；
					_me.components[n].methods[k]();//执行组件对应到所有要处理到方法
				}
				break;//匹配到以后立即结束，提高执行效率；
			}
		}
	}
	function delegate(){
		var _body=_me.list("body")[0];//获取到body元素
		_body.onclick=function(e){//给body添加一个事件利用事件冒泡到原理进行委托。
			var _target;//申明一个普通变量保存当前元素
			e=e||window.event;//事件兼容
			e.preventDefault?e.preventDefault():e.returnValue=false;//阻止默认事件
			_target=e.target||e.srcElement;//鼠标点击到目标元素||srcElement兼容IE
			while(true){//做一个无限循环，从子节点向body元素无限返回
				if(_target.nodeName.toUpperCase()==="A" || _target===this){//如果当前对象是a元素，就直接渲染组件
					if(/#\w+(\/\w+)*/g.test(_target.href)){
						for(var k in _me.units){
							delete _me.units[k];
						}
						exchange(_target.href);
					}
					break;
				}else{//如果当前对象不是超链接就返回上一层，一直找到A为止，如果此次点击都不是A元素，那么就不会切换路由。到body对象截止
					_target=_target.parentNode;
				}
			}
		}
	}

	/**
	 * 初始化应用程序方法
	 * @param components 是所有页面到组件
	 */
	this.initApp=function(components){
		this.components=components;
		delegate();//先将所有a元素到点击事件委托给body
		if(window.history.state){//判断history.state是否为空，如果不为空，初始化的时候渲染state当前对应的url
			exchange(window.history.state.url);
		}else {
			exchange("/#default");//如果history.state为空，渲染默认路由对应的组件。
		}
	};
	window.onpopstate=function(e){//当点击浏览器向前向后当时候，会改变history.state，就会触发该事件。渲染对应当组件
		if (window.history.state){
			var _target=window.history.state.url.match(/\/#\w+(\/\w+)*/g)[0];
			for(var n=0;n<_me.components.length;n++){
				if(_target.match(/\/#\w+(\/\w+)*/g)[0]===_me.components[n].url){
					_me.dom(_me.components[n].target).innerHTML=_me.components[n].template;
					for(var k in _me.components[n].methods){
						_me.components[n].methods[k]();
					}
					break;
				}
			}
		}
	};
}
window.onload=function(){
	var _app=new App();
	_app.initApp([{
		"target":'main',//对应下面当模板，将下面的模板渲染到ID为main的容器中。如果这里制定容器ID为demo下面的模板自然会渲染到demo容器中
		"url":'/#default',//与路由地址匹配，校验通过就渲染该组件。
		"methods":{

		},
		"template":'<div>' +
		'<div><a href="#default">this is first component!</a></div>' +
		'<div><a href="#list">to list component!</a></div>' +
		'<div><a href="/#default/demo">更换二级路由</a></div>' +
		'</div><div id="demo">' +
		'</div>'
	},{
		"target":'main',
		"url":"/#list",
		"methods":{
			"abc":function(){//函数名随意，不用记
				window.setTimeout(function(){
					_app.dom("list").innerHTML="修改后的list模块的内容";//可以随意操作dom
				},600);
			}
		},
		"template":'<div id="list"></div>'
	},{
		"target":'demo',
		"url":"/#default/demo",
		"methods":{

		},
		"template":'<div>这是二级路由映射的内容</div>'
	}]);
};