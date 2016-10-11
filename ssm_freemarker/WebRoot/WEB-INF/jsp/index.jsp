<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<title>清新的HTML5音乐播放器</title>
<meta name="description" content="描述">
<meta name="keywords" content="关键词">
<script src="./js/jquery-1.11.0.min.js"></script>
<style>
 rect {
  transform-origin: 50% 50%;
}
</style>      
</head>
<body>
<!-- <iframe width="500" height="500" frameborder="0" src="map.svg" ></iframe> -->
<div style="margin:0 auto;">
	<object data="data/-1.svg"   type="image/svg+xml">
		<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
   <circle cx="100" cy="50" r="10" stroke="black" stroke-width="0" fill="red" />
</svg> 
	 </object>
	
</div>
<div style="width: 100%;background: #fff;text-align: left;">
	<button style="width: 20%" > 按键01 </button>
	<button style="width: 20%"> 按键02 </button>
</div>
</body>
<script>
	$(function(){
		$("#HM").click(function(){
			alert("----");
		});
	});
</script>
</html>
