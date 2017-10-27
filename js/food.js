	var foodBreakfast = foodLunch = foodSupper = [];

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

	var getTagName = (function(func) {
		return function() {
			return func.apply(document, arguments);
		}
	})(document.getElementsByTagName);


	var oMoodMessage = getId('mood-message'),
		oWrapperInner = getId('wrapper-inner'),
		oConfirmMsg = getId('confirm-message'),
		oConfirm = getId('confirm'),
		oMoodSad = getId('mood-sad'),
		oMoodHappy = getId('mood-happy'),
		oMoodBtn = getClass('mood-btn'),
		oFoodName = getId('food-name'),
		oFoodName2 = getId('food-name2'),
		oFood = getId('food'),
		oUl = getTagName('ul')[0],
		oLi = getTagName('li'),
		oBtns = getClass('button');

	function loadFood() {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "../api/GetFood.php", true);
		// xmlhttp.send();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				xmlDoc = JSON.parse(xmlhttp.responseText);
				[foodBreakfast, foodLunch, foodSupper] = [xmlDoc.breakfast, xmlDoc.lunch, xmlDoc.dinner];
				var timeTxtObj = [], // 早中晚的单词
					date = new Date(),
					hour = date.getHours(),
					foodBtnObj = getClass('food-btn'),
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
									getId('stop').style.display = 'block';
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

				document.addEventListener('click', function(e) {
					switch (e.target.id) {
						case 'stop':
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
							oFoodName2.innerHTML = foodNameTxt;
							break;
						case 'confirm-no':
							oMoodMessage.innerHTML = foodNameTxt + " 已黯然失色躲在角落检测身体营养指数哭到妆都花了还是会深思熟虑如何才能博君子一笑即使还是会痛定思痛。";
							oWrapperInner.style.display = 'none';
							oConfirm.style.display = 'none';
							oMoodSad.style.display = 'block';
							break;
						case 'confirm-yes':
							oMoodMessage.innerHTML = "做到最好只为博得君子莞尔一笑" + foodNameTxt + "此时正在犄角旮旯歇斯底里的狂笑并享受被君子翻牌的自豪感和即将被食用的快乐感。";
							oWrapperInner.style.display = 'none';
							oConfirm.style.display = 'none';
							oMoodHappy.style.display = 'block';
							oFoodName.innerHTML = foodNameTxt;
							break;
					}
				}, true);

				oMoodBtn[0].onclick = oMoodBtn[1].onclick = function() {
					oWrapperInner.style.display = 'block';
					oConfirm.style.display = 'none';
					oMoodSad.style.display = 'none';
					oMoodHappy.style.display = 'none';
				}
			}
		}
	}
	loadFood();