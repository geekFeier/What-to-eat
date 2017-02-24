//添加食物页面
var name, type; //食物名称 食物类型
var oTypeUl = document.getElementById('type-ul');
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
		typeName = this.innerHTML;
		document.getElementById('type-tips').innerHTML = typeName;
		console.log(typeName);
		for (var j in typeFood) {
			typeFood[j].name == typeName ? type = ++j : type == 0;
		}
		oTypeUl.style.display = "none";
	}
}

document.getElementById('add-food-btn').onclick = function() {
	var name = document.getElementsByName('name')[0].value;
	var verifyVal = function(name, msg) {
		if (!name) {
			alert(msg);
			return false;
		}
	}
	if (!name) {
		alert('请输入食物名称');
		return false;
	}
	if (!type) {
		alert('请选择食物类型');
		return false;
	}
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "./api/SetFood.php?name=" + name + "&type=" + type, true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			alert('添加成功！');
		}
	}
}