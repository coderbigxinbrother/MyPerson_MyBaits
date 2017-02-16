//动画：定时移动元素
function moveElement( elementId, final_x, final_y, interval){
	if( !document.getElementById ) return false;
	if( !document.getElementById( elementId) ) return false;
	var elem=document.getElementById( elementId);
	
	if( elem.movement){
		clearTimeout( elem.movement);	
	}
	
	//为了防止 elem元素没有设定 left, top值，做容错处理
	if( !elem.style.left){
		elem.style.left="0px";	
	}
	if( !elem.style.top){
		elem.style.top="0px";	
	}
	
	var xpos=parseInt( elem.style.left);
	var ypos=parseInt( elem.style.top);
	//加入移动快慢的算法
	var dist=0;
	if( xpos==final_x && ypos==final_y ){
		return true;	
	}
	if( xpos<final_x){
		dist=Math.ceil(  (final_x-xpos)/10 );
		xpos=xpos+dist;
	}
	if( xpos>final_x){
		dist=Math.ceil(  (xpos-final_x)/10);
		xpos=xpos-dist;
	}
	if( ypos<final_y){
		dist=Math.ceil(   (final_y-ypos)/10);
		ypos=ypos+dist;
	}
	if( ypos>final_y){
		dist=Math.ceil(  (ypos-final_y)/10 );
		ypos=ypos-dist;
	}
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	var repeat="moveElement('"+elementId+"',"+final_x+","+final_y+","+interval+")";
	elem.movement=setTimeout(repeat, interval);
	
}




//多个函数共享onload事件
function addLoadEvent( func){
	//将现有的window.onload事件处理函数的值存入变量oldOnLoad
	var oldOnLoad=window.onload;
	//如果在这个处理函数上还没有绑定任何函数，就像平时那样把新函数添加给它. 
	if( typeof window.onload!='function'){
		window.onload=func;	
	}else{
		//如果在这个处理函数上已经绑定了一些函数，则将新函数追加到现有指令的尾部. 
		window.onload=function(){
			oldOnLoad();
			func();	
		}	
	}
}

//给元素增加样式而不是修改
function addClass( element, value){
	if( !element.className){
		element.className=value;	
	}else{
		newClassName=element.className;
		newClassName+=" ";
		newClassName+=value;
		element.className=newClassName;	
	}
}

function insertAfter( newElement, targetElement){
	var parent=targetElement.parentNode;
	if( parent.lastChild==targetElement ){
		parent.appendChild( newElement );	
	}else{
		parent.insertBefore( newElement, targetElement.nextSibling);	
	}
}


//获取一个节点的下一个元素节点
function getNextElement( node ){
	if(node.nodeType==1){
		return node;	
	}
	if( node.nextSibling){
		return getNextElement(node.nextSibling);	
	}
	return null;
}

//当在表单元素前点label时，焦点跳到label中的for指定的元素上. 
function focusLabels(){
	if(!document.getElementsByTagName) return false;
	var labels=document.getElementsByTagName("label");
	for( var i=0;i<labels.length;i++){
		if( !labels[i].getAttribute("for")) continue;
		labels[i].onclick=function(){
			var id=this.getAttribute("for");
			if(!document.getElementById(id) ) return false;
			var element=document.getElementById( id);
			element.focus();	
		}	
	}
}
//显示placeholder中的值到表元素中.
function resetFields(whichform){
	// if( Modernizr.input.placeholder)return;
	for(var i=0;i<whichform.elements.length;i++){
		var element=whichform.elements[i];
		if( element.type=="submit") continue;
		var check=element.placeholder||element.getAttribute("placeholder");
		if( !check) continue;
		element.onfocus=function(){
			var text=this.placeholder||this.getAttribute("placeholder");
			if( this.value==text){
				this.className='';
				this.value='';	
			}	
		}	
		element.onblur=function(){
			if( this.vlaue==""){
				this.className='placeholder';
				this.value=this.placeholder||this.getAttribute("placeholder");	
			}	
		}
		element.onblur();
	}
}

function prepareForms(){
		for( var i=0;i<document.forms.length;i++){
			var thisform=document.forms[i];
			resetFields(thisform);	
			thisform.onsubmit=function(){
				return validateForm(this);	
			}
		}
}

function validateForm( whichform){
	for( var i=0;i<whichform.elements.length;i++){
		var element=whichform.elements[i];
		if( element.required=='required'){
			if( !isFilled(element)){
				alert("please fill in the "+elemenet.name+"field.");
				return false;	
			}	
		}
		if( element.type=='email'){
			if( !isEmail(element) ){
				alert("the "+element.name+" field must be a valid email address.");
				return false;	
			}	
		}	
	}
	return true;
}

//验证表单元素是否填写好了
function isFilled(field){
	 if( field.value.replace(' ','').length==0) return false;
	 var placeholder=field.placeholder|| field.getAttribute('placeholder');
	 return (field.value!=placeholder);
}
//验证表单元素是否为email
function isEmail( field){
		return (field.value.indexOf("@")!=-1 && field.value.indexOf(".")!=-1 );
}

//需求: 完成高级版 getElementsByClassName的功能.
	 //要求: 1. getElementsByClassName要求在  ie5.5也能支持. 
	 //      2.  可以获取多个类名
	 //      3. 参数可以指定  类名, 标签名, 要查找的元素
	
	 
	 var getElementsByClassName = function (className, tag, elm){
			if (document.getElementsByClassName) {
				getElementsByClassName = function (className, tag, elm) {
					elm = elm || document;
					var elements = elm.getElementsByClassName(className),
					nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
					returnElements = [],
					current;
					for(var i=0, il=elements.length; i<il; i+=1){
						current = elements[i];
						if(!nodeName || nodeName.test(current.nodeName)) {
							returnElements.push(current);
						}
					}
					return returnElements;
				};
			}else if (document.evaluate) {
				getElementsByClassName = function (className, tag, elm) {
					tag = tag || "*";
					elm = elm || document;
					var classes = className.split(" "),
					classesToCheck = "",
					xhtmlNamespace = "http://www.w3.org/1999/xhtml",
					namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
					returnElements = [],
					elements,
					node;
					for(var j=0, jl=classes.length; j<jl; j+=1){
						classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
					}
					try {
						elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
					}catch (e) {
						elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
					}
					while ((node = elements.iterateNext())) {
						returnElements.push(node);
					}
					return returnElements;
				};
			}else {
				getElementsByClassName = function (className, tag, elm) {
					tag = tag || "*";
					elm = elm || document;
					var classes = className.split(" "),
					classesToCheck = [],
					elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
					current,
					returnElements = [],
					match;
					for(var k=0, kl=classes.length; k<kl; k+=1){
						classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
					}
					for(var l=0, ll=elements.length; l<ll; l+=1){
						current = elements[l];
						match = false;
						for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
							match = classesToCheck[m].test(current.className);
							if (!match) {
								break;
							}
						}
						if (match) {
							return Elements.push(current);
						}
					}
					return returnElements;
				};
			}
			return getElementsByClassName(className, tag, elm);
	};
