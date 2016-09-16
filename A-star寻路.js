<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>无标题文档</title>
<style>
*{ margin:0; padding:0;}
li{ list-style:none;}
#ul1{ height:auto; overflow:hidden; margin:20px auto; border:1px #000 solid; border-bottom:none; border-right:none;}
#ul1 li{border:1px #000 solid; border-top:none; border-left:none; float:left;}
#ul1 li.sty1{ background:red;}
#ul1 li.sty2{ background:green;}
#ul1 li.sty3{ background:blue;}
#input1{ width:100px; position:absolute; left:50%; margin-left:-50px;}
</style>
</head>

<body>
<ul id="ul1">
</ul>
<input type="button" value="开始寻路" id="input1">
<script>

var oUl = document.getElementById('ul1');
var aLi = oUl.getElementsByTagName('li');
var oInput = document.getElementById('input1');
var beginLi = oUl.getElementsByClassName('sty1');
var endLi = oUl.getElementsByClassName('sty2');

var map = [
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,1,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,2,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
];

var cols = Math.sqrt(map.length);
var sizeGird = 20;
var openArr = [];
var closeArr = [];

init();

function init(){
	createMap();
	oInput.onclick = function(){
		openFn();
	};
}

function createMap(){
	
	oUl.style.width = cols * (sizeGird + 1) + 'px';
	
	for(var i=0;i<map.length;i++){
		var oLi = document.createElement('li');
		oLi.style.width = sizeGird + 'px';
		oLi.style.height = sizeGird + 'px';
		oUl.appendChild(oLi);
		
		if( map[i] == 1 ){
			oLi.className = 'sty1';
			openArr.push(oLi);
		}
		else if(map[i] == 2){
			oLi.className = 'sty2';
		}
		else if(map[i] == 3){
			oLi.className = 'sty3';
			closeArr.push(oLi);
		}
		
	}
}

function openFn(){
	
	var nowLi = openArr.shift();
	
	if( nowLi == endLi[0] ){
		showLine();
		return;
	}
	
	closeFn(nowLi);
	
	findLi(nowLi);
	
	//console.log( openArr );
	
	openArr.sort(function(li1,li2){
		return li1.num - li2.num;
	});
	
	//console.log( openArr );
	
	openFn();
	
}
function closeFn(nowLi){
	closeArr.push( nowLi );
}

function findLi(nowLi){
	var result = [];
	for(var i=0;i<aLi.length;i++){
		if( filter(aLi[i]) ){
			result.push( aLi[i] );
		}
	}
	function filter(li){
		for(var i=0;i<closeArr.length;i++){
			if( closeArr[i] == li ){
				return false;
			}
		}
		for(var i=0;i<openArr.length;i++){
			if( openArr[i] == li ){
				return false;
			}
		}
		return true;
	}
	
	for(var i=0;i<result.length;i++){
		if( (Math.abs(nowLi.offsetLeft - result[i].offsetLeft)<= sizeGird + 1) && (Math.abs(nowLi.offsetTop - result[i].offsetTop)<= sizeGird + 1) ){
			result[i].num = f(result[i]);
			result[i].parent = nowLi;
			openArr.push( result[i] );
		}
	}
	console.log(closeArr);
}

function showLine(){
	var result = [];
	var lastLi = closeArr.pop();
	var iNow = 0;
	findParent(lastLi);
	function findParent(li){
		result.unshift(li);
		if( li.parent == beginLi[0] ){
			return;
		}
		findParent(li.parent);
	}
	
	var timer = setInterval(function(){
		
		result[iNow].style.background = 'red';
		iNow++;
		if(iNow == result.length){
			clearInterval(timer);
		}
	},500);
	
}

function f(nodeLi){
	return g(nodeLi) + h(nodeLi);
}
function g(nodeLi){
	var a = beginLi[0].offsetLeft - nodeLi.offsetLeft;
	var b = beginLi[0].offsetTop - nodeLi.offsetTop;
	return Math.sqrt(a*a + b*b);
}
function h(nodeLi){
	var a = endLi[0].offsetLeft - nodeLi.offsetLeft;
	var b = endLi[0].offsetTop - nodeLi.offsetTop;
	return Math.sqrt(a*a + b*b);
}

</script>
</body>
</html>
