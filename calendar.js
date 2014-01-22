//size = width/100 + 11px;
//起始日期:1980年1月1日星期二 至 2020年 （公历）
var calendar = function() {

	var object = undefined;
	var calendarObj = undefined;
	var headerCenterObj = undefined;
	var headerCenterYearObj = undefined;
	var headerCenterMonthObj = undefined;
	var headerLeftObj = undefined;
	var headerRightObj = undefined;
	var dateTableBoxObj = undefined;
	
	var minCalendarWidth = 155;
	var minCalendarHeight = 155;

	var allCalendarDates = new Array();
		
	var currentYear = 0;
	var currentMonth = 0;
	var currentDate = 0;
	var theMonth = 0;
	var basicDay = ["Su", "Mo", "Tu", "We", "Th", "Fr", "St"];
	var basicMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var basicMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var isLeapYear = 0;

	var headerIdArrs = ["calendar_header", "calendar_header_left", "calendar_header_center", "calendar_header_center_year", "calendar_header_center_month", "calendar_header_right"];
	var bodierIdArrs = ["calendar_bodier", "calendar_bodier_day_table", "calendar_bodier_date_table_box", "calendar_bodier_date_table"];
	var btnSrcArrs = ["img/header_left_icon2.png", "img/header_right_icon2.png"];

	var returnFunctionName = undefined;

	var C = function() {
		var tdStyleArr = ["normal","other","theCurrent"];
		return {
			set : function(){
				dateTableBoxObj.innerHTML = this.createDateTable();
			},
			createHeader : function() {
				var htmlText = "<div id='" + headerIdArrs[0] + "'>";
				htmlText += "<div id='" + headerIdArrs[1] + "'>";
				htmlText += "<img src='" + btnSrcArrs[0] + "' width='100%' height='100%'/>";
				htmlText += "</div>";
				htmlText += "<div id='" + headerIdArrs[2] + "'>";
				htmlText += "<span id='" + headerIdArrs[3] + "'>" + currentYear + "</span>";
				htmlText += "<span>年</span>";
				htmlText += "<span id='" + headerIdArrs[4] + "'>" + (theMonth + 1) + "</span>";
				htmlText += "<span>月</span>";
				htmlText += "</div>";
				htmlText += "<div id='" + headerIdArrs[5] + "'>";
				htmlText += "<img src='" + btnSrcArrs[1] + "' width='100%' height='100%' />";
				htmlText += "</div>";
				htmlText += "</div>";
				return htmlText;
			},
			createBodier : function() {
				var htmlText = "<div id='" + bodierIdArrs[0] + "'>";
				htmlText += "<table id='" + bodierIdArrs[1] + "'><tbody>";
				htmlText += "<tr class='t1'>";
				htmlText += "<td>" + basicDay[0] + "</td>";
				htmlText += "<td>" + basicDay[1] + "</td>";
				htmlText += "<td>" + basicDay[2] + "</td>";
				htmlText += "<td>" + basicDay[3] + "</td>";
				htmlText += "<td>" + basicDay[4] + "</td>";
				htmlText += "<td>" + basicDay[5] + "</td>";
				htmlText += "<td>" + basicDay[6] + "</td>";
				htmlText += "</tr></tbody></table>";
				htmlText += "<div id='" + bodierIdArrs[2] + "'>";
				htmlText += "</div>";
				htmlText += "</div>";
				return htmlText;
			},
			createDateTable : function() {
				
				var htmlText = "<table id='" + bodierIdArrs[3] + "'><tbody>";

				var preMonthDates = new Array();
				var currentMonthDates = new Array();
				var nextMonthDates = new Array();
				var allDates = [preMonthDates,currentMonthDates,nextMonthDates];
				//35长度的数组，含构建整个table 7*5  的数据，或者有上个月的后几天补充，或者用下个月的前几天补充
				var allDays = 1;
				//当前月份的第一天的在一年中的天数.
				var currentDay = 0;
				//当前时间的星期
				var currentMonthDays = basicMonthDays[theMonth];
				//当前月份的天数
				for (var i = 0; i < theMonth; i++) {
					allDays = allDays + basicMonthDays[i];
				}
				currentDay = L.getW(currentYear, allDays);
				if(currentDay!=0){   //即当前月第一天不是星期日，不从数组0位置开始。需要用到上个月的数据，甚至前一年的数据
					if(theMonth==0){   //当前月份是一月,从前一年的12月31或之前几天开始.
						for (var i = (currentDay - 1),d=31;i >=0; i--) {
							allCalendarDates[i] =allDates[0][i] = (d--);
						}
					}else{
						for (var i = (currentDay-1),d = basicMonthDays[theMonth-1];i >=0; i--){
							allCalendarDates[i] = allDates[0][i] = (d--);
						}						
					}
				}
				//加入本月的各个日期
				var len = allDates.length;
				for (var i = 0,d=1; i < currentMonthDays; i++) {
					allCalendarDates[i+allDates[0].length] = allDates[1][i] = (d++);
				}
				//如果必要的话，加入下个月底日期。
				for (var i = 0, d = 1; i < 42-(allDates[0].length+allDates[1].length); i++) {
					allCalendarDates[i+allDates[0].length+allDates[1].length] = allDates[2][i] = (d++);
				}
				//-------------------------------				
				//数组构建完成，开始构建table表的htmltext;
				var mutex=0;
				for(var i=0;i<3;i++){
					var arr = allDates[i];
					var tdStyle;
					if(i!=0 && i!=2){
						tdStyle = "normal";
					}else{
						tdStyle = "other";
					}
					for(var j=0;j<arr.length;j++){
						if(j%7==0 && mutex==0){
							htmlText += "<tr>";
						}
						if(arr[j]==currentDate && currentMonth == theMonth){
							htmlText += "<td class='theCurrent'>"+arr[j]+"</td>";
						}else{
							htmlText += "<td class='"+tdStyle+"'>"+arr[j]+"</td>";
						}
						mutex++;
						if(mutex%7==0){
							htmlText += "</tr>";
						}
					}
				}
				htmlText += "</tbody></table>";
				return htmlText;
			},
			createFinish : function(){
				var calendarHeight = Im.getObjStyle(object,"height");
				var calendarHeaderCenterObj = Im.getObj(headerIdArrs[2]);
				calendarHeaderCenterObj.style.lineHeight = calendarHeight * 0.15 + "px";

				var calendarFontSize = parseInt(calendarHeight/100) + 11 + "px";
				object.style.fontSize = calendarFontSize;
			},
			getArrs : function() {
				return [headerIdArrs, bodierIdArrs];
			}
		}
	};
	var E = function(){
		return{
			setHeaderEvent : function(){
				headerCenterObj = Im.getObj(headerIdArrs[2]);
				headerLeftObj = Im.getObj(headerIdArrs[1]);
				headerLeftObj.onclick = function(){calendar.clickOnheaderLeft();};
				headerRightObj = Im.getObj(headerIdArrs[5]);
				headerRightObj.onclick = function(){calendar.clickOnheaderRight();};
			},
			setBodierEvent : function(){
				dateTableBoxObj.onclick = function(){calendar.clickOnBodier();};
			}
		}
	}();
	var L = function() {
		return {
			isLeapYear : function(years) {
				if (years % 400 == 0) {
					basicMonthDays[1] = 29;
				} else if (years % 4 == 0) {
					basicMonthDays[1] = 29;
				} else {
					basicMonthDays[1] = 28;
				}
			},
			getW : function(y, d) {
				return parseInt(((y - 1 + (y - 1) / 4 - (y - 1) / 100 + (y - 1) / 400) + d) % 7);
			},
			reset : function() {
				basicMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
				isLeapYear = 0;
			}
		}
	}();
	return {
		set : function(_functionName){
			returnFunctionName = _functionName;
		},
		init : function(_objectname) {
			object = Im.getObj(_objectname);
			
			var objWidth = Im.getObjStyle(object,"Width");
			var objHeight = Im.getObjStyle(object,"Height");
			if(objWidth < minCalendarWidth){
				object.style.width = minCalendarWidth + "px";
			}
			if(objHeight < minCalendarHeight){
				object.style.height = minCalendarHeight + "px";
			}
			
			var date = new Date();
			currentYear = date.getFullYear();
			currentMonth = date.getMonth();
			theMonth = currentMonth;
			currentDate = date.getDate();
			L.isLeapYear(currentYear);

			var c = new C();
			calendarObj = Im.getObj(_objectname);
			calendarObj.innerHTML = c.createHeader();
			calendarObj.innerHTML += c.createBodier();

			dateTableBoxObj = Im.getObj(bodierIdArrs[2]);
			dateTableBoxObj.innerHTML = c.createDateTable();
			
			headerCenterYearObj = Im.getObj(headerIdArrs[3]);
			headerCenterMonthObj = Im.getObj(headerIdArrs[4]);
			
			E.setHeaderEvent();
			E.setBodierEvent();
			c.createFinish();
		},
		clickOnheaderCenter : function() {
		},
		clickOnheaderLeft : function() {
			theMonth = theMonth - 1;
			if(theMonth==-1){
				currentYear = currentYear - 1;
				theMonth = 11;
			}
			headerCenterYearObj.innerHTML = currentYear;
			headerCenterMonthObj.innerHTML = theMonth+1;
			var c = new C();
			c.set();
		},
		clickOnheaderRight : function() {
			theMonth = theMonth + 1;
			if(theMonth==12){
				currentYear = currentYear + 1;
				theMonth = 0;
			}
			headerCenterYearObj.innerHTML = currentYear;
			headerCenterMonthObj.innerHTML = theMonth+1;
			var c = new C();
			c.set();
		},
		clickOnBodier : function(){//获取被点击的日期
			var e = event || window.event;
			var boxMouseX = e.clientX - dateTableBoxObj.offsetLeft;
			var boxMouseY = e.clientY - dateTableBoxObj.offsetTop;
			var tdWidth = Im.getObjStyle(object,"width")/7;
			var tdHeight = Im.getObjStyle(object,"height")*0.85*0.85/6;
			var tdX = parseInt(boxMouseX/tdWidth);
			var tdY = parseInt(boxMouseY/tdHeight);
			var clickDate = allCalendarDates[tdY*7+tdX];
			var dateMsg = [currentYear,currentMonth,clickDate];
			//完成！如果已经设置了返回函数则向外传递出一个含 年-月-日电数组;
			if(returnFunctionName!=undefined){
				eval(returnFunctionName+"(["+dateMsg+"])");
			}
		},
		getParam : function() {
			return [[currentYear, currentMonth, currentDate]];
		}
	}
}();
calendar.set("test");
calendar.init("calendar"); 