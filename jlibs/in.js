var acName;
var xmlRequest;
var sendData = "";
var returnData = "";
var returnState = "";
var serverUrl = "http://localhost/SSHTest/";
var basicUrl = "http://localhost/SSHTest/Blackmarket/";

var Im = function() {

	var D = function() {
		return {
			createXMLHttpRequest : function() {
				var xmHttpObj;
				try {
					xmHttpObj = new XMLHttpRequest();
				} catch (e) {
					try {
						xmHttpObj = new ActiveXObject("Msxml2.XMLHTTP");
					} catch (e) {
						xmHttpObj = new ActiveXObject("Microsoft.XMLHTTP");
					}
				}
				return xmHttpObj;
			}
		}
	}();
	return {
		sendRequest : function(url, params, type, processResponse) {
			xmlRequest = D.createXMLHttpRequest();
			if (type == "POST") {
				xmlRequest.open(type, url, true);
				xmlRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xmlRequest.onreadystatechange = processResponse;
				xmlRequest.send("param=" + params);
			} else if (type == "GET") {
				var url = url + "?param=" + params;
				xmlRequest.open(type, url, true);
				xmlRequest.onreadystatechange = processResponse;
				xmlRequest.send();
			}
		},
		getObj : function(id) {
			if ( typeof (id) == "string") {
				if (document.getElementById(id) == undefined) {
					return window.parent.document.getElementById(id);
				} else {
					return document.getElementById(id);
				}
			} else if(typeof(id) == "object"){
				return document.getElementById(id[0]).contentWindow.document.getElementById(id[1]);
			}else{
				return undefined;
			}
		},
		getObjStyle : function(obj, key) {
			var value = null;
			if(typeof(obj)=="object"){
				if (obj.currentStyle != undefined) {
					value = obj.currentStyle[key];
				} else {
					value = window.getComputedStyle(obj).getPropertyValue(key);
				}
			}
			if(typeof(obj)=="string"){
				obj = Im.getObj(obj);
				if (obj.currentStyle != undefined) {
					value = obj.currentStyle[key];
				} else {
					value = window.getComputedStyle(obj).getPropertyValue(key);
				}
				
			}
			return parseInt(value);
		},
		toJSONString : function(arrs, indexarr) {
			var beginC = "{";
			var endC = "}";
			var data = beginC;
			if (indexarr == undefined) {
				for (var i = 0; i < arrs.length; i++) {
					data += "num" + i;
					data += ":";
					data += "'" + arrs[i] + "'";
					if (i != arrs.length - 1) {
						data += ",";
					}
				}
				data += endC;
			} else if (arrs.length == indexarr.length) {
				for (var i = 0; i < arrs.length; i++) {
					data += "'" + indexarr[i] + "'";
					data += ":";
					data += arrs[i];
					if (i != arrs.length - 1) {
						data += ",";
					}
				}
				data += endC;
			} else {
				data = "error in arr's length";
			}
			return data;
		},
		toArray : function(obj) {
			var arr = new Array();
			var i = 0;
			for (var key in obj) {
				arr[i] = obj[key];
				i++;
			}
			return arr;
		}
	}
}();