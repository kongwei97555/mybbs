<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'test.jsp' starting page</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	 <META http-equiv=Content-Style-Type content=text/css>
    <script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
    <script>
    	 $(function(){
    		getMapData();
    		function getMapData(){
    			$.ajax({
				     type: 'GET',
				     url: 'adminController/getMapData.action' ,
				     success:function(data) { 
				      var html =''; 
				       if(data.success){
				       		console.log(data.list);
				       		html+='<svg width="100%" height="100%" version="1.1"xmlns="http://www.w3.org/2000/svg">';
				       		for(var i=0;i<data.list.length;i++){
				       		html+=''+data.list[i].data+'';
				       		}
				       		html+='</svg>';
				       		$("#box").html(html);
				       }
				       else{
				       		alert("失败了");
				       }
			      	}  
				});
    		}
    	}); 
    </script>
    <script>
    	$(function(){
    		$("#box svg path").click(function(evt){
    			var imageTarget = evt.target;
				//imageTarget.style.fill = "red";
				alert(imageTarget.id);
    		});
    		$("#box svg path").blur(function(evt){
    		
    			var imageTarget = evt.target;
				//imageTarget.style.fill = "none";
    		});
    	});
    </script>
    </head>
    <body>
        <div style="margin:0 auto;" id="box">
			

			
		</div>
    </body>
</html>
