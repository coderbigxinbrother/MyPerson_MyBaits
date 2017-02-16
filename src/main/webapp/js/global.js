$(function(){
	    	    $.ajax({
	    	        url : "person_findAllPerson",
	    	        type : "POST",
	    	        dataType:"json",
	    	        success : function(data){
	    	        	if(data.code==1){
	    	        		var s='';
		    	        	for(var i=0;i<data.obj.length;i++){
		    	        		var o=data.obj[i];
		    	        		var tr="<tr>";
		    	        		tr+="<td>"+o.pid+"</td><td>"+o.pname+"</td><td>"+o.pwd+"</td><td><a href='' onclick='toUpdate("+o.pid+");return false;'>编辑</a></td>";
		    	        		tr+="</tr>";
		    	        		s+=tr;
		    	        	}
		    	        	$("#content").html(s);
	    	        	}else{
	    	        		alert('查询失败...');
	    	        		return;
	    	        	}
	    	        }
	    	        //complete: function(XMLHttpRequest, textStatus){alert("加载结束")},//HideLoading()加载完成;
	    	       	//error:function(){alert("出错啦!!!");} //请求出错处理
	    	         
	    	   });
	    	    
	    	    $("#sub").click(function(){
	    	    	 $.ajax({
	 	    	        url : "person_updatePerson",
	 	    	        type : "POST",
	 	    	        data: $("#myform").serialize(),
	 	    	        dataType:"json",
	 	    	        success : function(data){
	 	    	        	if(data.code==1){
	 	    	        		$("#pid").val( '');
	 	    	        		$("#pname").val('');
	 	    	        		$("#pwd").val('');
	 	    	        		alert("更新成功");
	 	    	        	}else{
	 	    	        		alert('更新失败...');
	 	    	        		return;
	 	    	        	}
	 	    	        }
	 	    	        //complete: function(XMLHttpRequest, textStatus){alert("加载结束")},//HideLoading()加载完成;
	 	    	       	//error:function(){alert("出错啦!!!");} //请求出错处理
	 	    	         
	 	    	   });
	    	    });
})();


function toUpdate( pid ){
	 $.ajax({
	        url : "person_findPerson",
	        type : "POST",
	        data: "pid="+pid,
	        dataType:"json",
	        success : function(data){
	        	if(data.code==1){
	        		$("#pid").val( data.obj.pid);
	        		$("#pname").val( data.obj.pname);
	        		$("#pwd").val( data.obj.pwd);
	        		
	        	}else{
	        		alert('查询失败...');
	        		return;
	        	}
	        }
	        //complete: function(XMLHttpRequest, textStatus){alert("加载结束")},//HideLoading()加载完成;
	       	//error:function(){alert("出错啦!!!");} //请求出错处理
	         
	   });
}

//////////////////////////////////////////////////////////////////

/*
   使用  css3的新特性可以实现斑马线效果，但只有部分高版本浏览器支持, 所以这里采用了js来实现. 
   
   这种方案相比直接用  css中的伪类的对比: 
      css中的伪类:   xx:hover{}  这种用法不是每种浏览器都支持. 
	  我们现有的方案使用的是js的dom编程来实现的。 但这样做的缺点是: 用行为层(即js代码)做了"表示层"(即css功能)的事，不是一种理想的工作方式. 
	  
	  更进一步的方案是使用   className来进行指定. 
*/
function stripeTables(){
		if( !document.getElementsByTagName) return false;
		var tables=document.getElementsByTagName("table");
		var odd,rows;
		for( var i=0;i<tables.length;i++){
			odd=false;
			rows=tables[i].getElementsByTagName("tr");
			for( var j=0;j<rows.length;j++){
				if( odd==true){
					//rows[j].style.backgroundColor="#ffc";
					//不要象上面一样直接在js中更改背景颜色，而最好使用css来更改
					addClass( rows[j],"odd");
					odd=false;	
				}	else{
					odd=true;	
				}
			}	
		}
}

/*
 给每一行加入事件，以实现切换效果
*/
function highlightRows(){
	 if( !document.getElementsByTagName)return false;
	 var rows=document.getElementsByTagName("tr");
	 for( var i=0;i<rows.length;i++){
		 rows[i].oldClassName=rows[i].className;
		 rows[i].onmouseover=function(){
			addClass( this, "highlight");
		 }	 
		 rows[i].onmouseout=function(){
			this.className=this.oldClassName; 
		 }
	 }
}



addLoadEvent( stripeTables);
addLoadEvent( highlightRows);
