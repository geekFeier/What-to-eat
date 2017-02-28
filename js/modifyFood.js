var name, type, newname, newtype; //食物名称 食物类型
var oTypeUl = document.getElementById('type-ul');
var oTypeUl2 = document.getElementById('type-ul2');
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

document.getElementById('type-tips').onclick = function() {
	oTypeUl.style.display = "block";
}
var oLi = document.getElementById('type-ul').children;
for (var i = 0, len = oLi.length; i < len; i++) {
	oLi[i].onclick = function() {
		var typeName = this.innerHTML;
		document.getElementById('type-tips').innerHTML = typeName;
		for (var j in typeFood) {
			typeFood[j].name == typeName ? type = ++j : type == 0;
		}
		oTypeUl.style.display = "none";
	}
} 
function successSkip(txt) {
	document.getElementsByClassName('success-box')[0].style.zIndex = "block"; 
	document.getElementsByClassName('success-box')[0].innerHTML = txt;  
	var opacityVal = eval(document.getElementsByClassName('success-box')[0].getAttribute('style')); 
	document.getElementById('loading').style.display = 'none';
	document.getElementsByClassName('success-box')[0].style.opacity = 1;
	setTimeout('window.location.href = "index.html";', 1200);
}
 