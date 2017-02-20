var foodBreakfast = [],
	foodLunch = [],
	foodSupper = [],
	timeTxtObj = [], // 早中晚的单词
	date = new Date(),
	hour = date.getHours(),
	foodBtnObj = document.getElementsByClassName('food-btn'),
	flag = true;

function loadFood() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "./api/GetFood.php", true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			xmlDoc = JSON.parse(xmlhttp.responseText);
			[foodBreakfast, foodLunch, foodSupper] = [xmlDoc.breakfast, xmlDoc.lunch, xmlDoc.dinner];
		}
	}
}
loadFood();
//在页面中动态添加菜名
var appendCon = function(timeTxt) { //timeTxt：点击的文字  
	document.getElementById('food').innerHTML = '';
	var timeFoodIndex = timeTxtObj.indexOf(timeTxt), //当前点击的btn的索引
		timeFoodThis = [foodBreakfast, foodLunch, foodSupper][timeFoodIndex];
	for (var i in timeFoodThis) {
		document.getElementById('food').innerHTML += '<li>' + timeFoodThis[i] + '</li>'
	}
	var oUl = document.getElementsByTagName('ul')[0];
	var oLi = document.getElementsByTagName('li');
	oUl.innerHTML = oUl.innerHTML + oUl.innerHTML;
	oUl.style.height = oLi[0].offsetHeight * oLi.length + 'px';
	timer = setInterval(move, 50);
}

/*function timeEvent(timeTxt) {
	if (hour >= 6 && hour <= 9) {
		appendCon(timeTxt)
		chooseFood(foodBreakfast);
	} else if (hour >= 10 && hour <= 13) {
		appendCon(timeTxt)
		chooseFood(foodLunch);
	} else if (hour >= 17 && hour <= 20) {
		appendCon(timeTxt)
		chooseFood(foodSupper);
	} else if (hour > 23 && hour < 24 || hour > 0 && hour < 6) {
		alert('宝宝好好睡觉吧，不能熬夜，不能吃宵夜，也不能梦游。安安');
	} else {
		alert('专心工作，想啥吃的！想想的话就想想大月月！吃饭点再来找我！');
	}
} */

// 点击事件
for (var i = 0, len = foodBtnObj.length; i < len; i++) {
	timeTxtObj.push(foodBtnObj[i].innerHTML);
	foodBtnObj[i].onclick = function() {
		if (flag) {
			this.parentNode.className = 'sim-button button btn-on'
			var timeTxt = this.innerHTML;
			appendCon(timeTxt, this);
			document.getElementById('stop').style.display = 'block';
			flag = false;
		}
	}
}

function chooseFood(timeFood) {
	do {
		var random = Math.floor(Math.random() * 100);
		if (random < timeFood.length) {
			var bool = confirm('可以吃' + timeFood[random] + '哦！不满意可以点击取消再来一次哦~~');
			if (bool) break;
		}
	} while (1);
}

//无缝滚动菜单
function move() {
	var oUl = document.getElementsByTagName('ul')[0],
		oUlHeightAbs = Math.abs(oUl.offsetTop),
		oUlH = oUl.offsetHeight / 2;
	if (oUlHeightAbs > oUlH) {
		oUl.style.top = '0';
	}
	oUl.style.top = oUl.offsetTop + (-45) + 'px';
}
//停止事件
document.getElementById('stop').onclick = function() {

	for (var i = 0, len = foodBtnObj.length; i < len; i++) {
		document.getElementsByClassName('button')[i].className = 'sim-button button';
	}
	window.clearInterval(timer);
	flag = true;
	var index = (parseInt(document.getElementById('food').style.top) / 45 - 1).toString().slice(1);
	foodNameTxt = document.getElementsByTagName('li')[index - 1].innerHTML;
	document.getElementById('confirm-message').innerHTML = '咱今天就吃"' + foodNameTxt + '"???';
	document.getElementById('wrapper-inner').style.display = 'none';
	document.getElementById('confirm').style.display = 'block';
};
// 显示隐藏的dom
var moodMessage = document.getElementById('mood-message'),
	wrapperInner = document.getElementById('wrapper-inner'),
	confirm = document.getElementById('confirm'),
	moodSad = document.getElementById('mood-sad'),
	moodHappy = document.getElementById('mood-happy'),
	confirmNo = document.getElementById('confirm-no'),
	confirmYes = document.getElementById('confirm-yes'),
	moodBtn = document.getElementsByClassName('mood-btn'),
	foodName = document.getElementById('food-name');

confirmNo.onclick = function() {
	moodMessage.innerHTML = foodNameTxt + " 已黯然失色躲在角落检测身体营养指数哭到妆都花了还是会深思熟虑如何才能博君子一笑即使还是会痛定思痛。";
	wrapperInner.style.display = 'none';
	confirm.style.display = 'none';
	moodSad.style.display = 'block';
}

confirmYes.onclick = function() {
	moodMessage.innerHTML = "做到最好只为博得君子莞尔一笑" + foodNameTxt + "此时正在犄角旮旯歇斯底里的狂笑并享受被君子翻牌的自豪感和即将被食用的快乐感。";
	wrapperInner.style.display = 'none';
	confirm.style.display = 'none';
	moodHappy.style.display = 'block';
	foodName.innerHTML = foodNameTxt;
}
moodBtn[0].onclick = moodBtn[1].onclick = function() {
	wrapperInner.style.display = 'block';
	confirm.style.display = 'none';
	moodSad.style.display = 'none';
	moodHappy.style.display = 'none';
}