var foodBreakfast = [],
	foodLunch = [],
	foodSupper = [];
// 重复使用的dom
var oStop = document.getElementById('stop'),
	oMoodMessage = document.getElementById('mood-message'),
	oWrapperInner = document.getElementById('wrapper-inner'),
	oConfirmMsg = document.getElementById('confirm-message'),
	oConfirm = document.getElementById('confirm'),
	oMoodSad = document.getElementById('mood-sad'),
	oMoodHappy = document.getElementById('mood-happy'),
	oConfirmNo = document.getElementById('confirm-no'),
	oConfirmYes = document.getElementById('confirm-yes'),
	oMoodBtn = document.getElementsByClassName('mood-btn'),
	oFoodName = document.getElementById('food-name'),
	oFood = document.getElementById('food'),
	oUl = document.getElementsByTagName('ul')[0],
	oLi = document.getElementsByTagName('li'),
	oBtns = document.getElementsByClassName('button');

function loadFood() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "./api/GetFood.php", true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			xmlDoc = JSON.parse(xmlhttp.responseText);
			[foodBreakfast, foodLunch, foodSupper] = [xmlDoc.breakfast, xmlDoc.lunch, xmlDoc.dinner];
			var timeTxtObj = [], // 早中晚的单词
				date = new Date(),
				hour = date.getHours(),
				foodBtnObj = document.getElementsByClassName('food-btn'),
				flag = true;
			//在页面中动态添加菜名
			var appendCon = function(timeTxt) { //timeTxt：点击的文字  
				oFood.innerHTML = '';
				var timeFoodIndex = timeTxtObj.indexOf(timeTxt), //当前点击的btn的索引
					timeFoodThis = [foodBreakfast, foodLunch, foodSupper][timeFoodIndex];
				for (var i in timeFoodThis) {
					oFood.innerHTML += '<li>' + timeFoodThis[i] + '</li>'
				}
				oUl.innerHTML = oUl.innerHTML + oUl.innerHTML;
				oUl.style.height = oLi[0].offsetHeight * oLi.length + 'px';
				timer = setInterval(move, 50);
			}


			// 点击早中午btn
			for (var i = 0, len = foodBtnObj.length; i < len; i++) {
				timeTxtObj.push(foodBtnObj[i].innerHTML);
				foodBtnObj[i].onclick = function() {
					switch (this.innerHTML) {
						case timeTxtObj[0]:
							showNode(foodBreakfast, 0)
							break;
						case timeTxtObj[1]:
							showNode(foodLunch, 1)
							break;
						case timeTxtObj[2]:
							showNode(foodSupper, 2)
							break;
						default:
							break;
					}

					function showNode(foodArr, i) {
						if (foodArr.length) {
							if (flag) {
								foodBtnObj[i].parentNode.className = 'sim-button button btn-on'
								var timeTxt = foodBtnObj[i].innerHTML;
								appendCon(timeTxt);
								document.getElementById('stop').style.display = 'block';
								flag = false;
							} else {
								alert("正在摇啊摇，请先Duang！")
							}
						} else {
							alert(timeTxtObj[i] + " 还未准备好，你可以手动添加哦")
						}
					}
				}
			}
			//无缝滚动菜单
			function move() {
				var oUlHeightAbs = Math.abs(oUl.offsetTop),
					oUlH = oUl.offsetHeight / 2;
				if (oUlHeightAbs > oUlH) {
					oUl.style.top = '0';
				}
				oUl.style.top = oUl.offsetTop + (-45) + 'px';
			}


			//停止事件
			oStop.onclick = function() {
				for (var i = 0, len = foodBtnObj.length; i < len; i++) {
					oBtns[i].className = 'sim-button button';
				}
				window.clearInterval(timer);
				flag = true;
				var index = (parseInt(oFood.style.top) / 45 - 1).toString().slice(1);
				foodNameTxt = oLi[index - 1].innerHTML;
				oConfirmMsginnerHTML = '咱今天就吃"' + foodNameTxt + '"???';
				oWrapperInner.style.display = 'none';
				oConfirm.style.display = 'block';
			};
			oConfirmNo.onclick = function() {
				oMoodMessage.innerHTML = foodNameTxt + " 已黯然失色躲在角落检测身体营养指数哭到妆都花了还是会深思熟虑如何才能博君子一笑即使还是会痛定思痛。";
				oWrapperInner.style.display = 'none';
				confirm.style.display = 'none';
				oMoodSad.style.display = 'block';
			}
			oConfirmYes.onclick = function() {
				oMoodMessage.innerHTML = "做到最好只为博得君子莞尔一笑" + foodNameTxt + "此时正在犄角旮旯歇斯底里的狂笑并享受被君子翻牌的自豪感和即将被食用的快乐感。";
				oWrapperInner.style.display = 'none';
				confirm.style.display = 'none';
				oMoodHappy.style.display = 'block';
				oFoodName.innerHTML = foodNameTxt;
			}
			oMoodBtn[0].onclick = oMoodBtn[1].onclick = function() {
				oWrapperInner.style.display = 'block';
				confirm.style.display = 'none';
				oMoodSad.style.display = 'none';
				oMoodHappy.style.display = 'none';
			}
		}
	}
}
loadFood();