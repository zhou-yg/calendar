var mouse = function(){
	var obj = undefined;
	return{
		init : function(_objId){
			obj = Im.getObj(_objId);
			obj.onmousemove = function(){mouse.mousemove();};
			obj.onclick = function(){mouse.mouseclick();};
		},
		mousemove : function(){
			var e = event || window.event;
			Im.getObj("mouseMoveX").innerHTML = e.clientX-obj.offsetLeft;
			Im.getObj("mouseMoveY").innerHTML = e.clientY-obj.offsetTop;
		},
		mouseclick : function(){
			var e = event || window.event;
			Im.getObj("mouseClickX").innerHTML = e.clientX-obj.offsetLeft;
			Im.getObj("mouseClickY").innerHTML = e.clientY-obj.offsetTop;
		}
	}
}();
mouse.init("area");
