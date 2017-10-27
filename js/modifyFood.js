var name, type, newname, newtype; //食物名称 食物类型
var getId = (function(func) {
	return function() {
		return func.apply(document, arguments);
	}
})(document.getElementById);

var getClass = (function(func) {
	return function() {
		return func.apply(document, arguments);
	}
})(document.getElementsByClassName);

var oTypeUl = getId('type-ul');
var oTypeUl2 = getId('type-ul2');
var typeFood = [{
	name: "Breakfast",
	type: 1
}, {
	name: "Lunch",
	type: 2
}, {
	name: "Supper",
	type: 3
}];

getId('type-tips').onclick = function() {
	oTypeUl.style.display = "block";
}
var oLi = getId('type-ul').children;
for (var i = 0, len = oLi.length; i < len; i++) {
	oLi[i].onclick = function() {
		var typeName = this.innerHTML;
		getId('type-tips').innerHTML = typeName;
		for (var j in typeFood) {
			typeFood[j].name == typeName ? type = ++j : type == 0;
		}
		oTypeUl.style.display = "none";
	}
} 
function successSkip(txt) {
	getClass('success-box')[0].style.zIndex = "block"; 
	getClass('success-box')[0].innerHTML = txt;  
	var opacityVal = eval(getClass('success-box')[0].getAttribute('style')); 
	getId('loading').style.display = 'none';
	getClass('success-box')[0].style.opacity = 1;
	setTimeout('window.location.href = "index.html";', 1200);
}
 