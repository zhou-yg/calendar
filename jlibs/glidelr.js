var glide = function(){
	
	var glideObjArr = new Array();
	var windowArr = new Array();
	var titleTypesArr = new Array();
	var crutObj ;
	var distance = 830;
	var direction;
	return{
		init:function(_glideArr,_titleTypeArr,_windowArr){
			if(_titleTypeArr.length == _windowArr.length){
				glideObjArr = _glideArr;
				titleTypesArr = _titleTypeArr
				windowArr = _windowArr;
				if(_titleTypeArr.length>=1){
					crutObj = _titleTypeArr[0];
				}
			}
		}
		,
		go:function(_id){
			var priorIndex = titleTypesArr.indexOf(crutObj);
			var laterIndex = titleTypesArr.indexOf(_id);
			if(priorIndex!=laterIndex){
				if(laterIndex>priorIndex){
					direction = 1;
				}else{
					direction = -1;
				}
				for(var i=0;i<windowArr.length;i++){
					glideObjArr[i].go(windowArr[i],distance,direction);
				}
				crutObj = _id;
			}
		}
		,
		reset:function(obj){
			var deviateIndex = titleTypesArr.indexOf(crutObj);
			obj.style.left = "-"+deviateIndex*distance+"px";
		}
		,
		param:function(){
			return [crutObj];
		}
	};
}();
var glidelr = function(_name) {
	var name = _name;
	var glideObj = undefined;
	var glideDistance = 0;
	var glideCrutDistance = 0;
	var glideDirection = -1;
	var glideTimeOut;//setTimeOut on this object;
	var t = 1;
	var initTop = 0;
	var initLeft = 0;

	var rate = 0;
	var rateArr = [16,32,64];
	var speed = 0;
	var speedArr = [35,28,23];
	
	var Re = function(){
		return{
			reSet:function(){
				glideObj = undefined;
				glideDistance = 0;
				glideCrutDistance = 0;
				glideDirection = -1;
				t = 1;
				initTop = 0;
				initLeft = 0;
				
				return "reSet";
			}
		}	
	}();
	return {
		go : function(objId, distance,direction) {
			glideObj = Im.getObj(objId);
			glideDistance = distance;
			glideDirection = direction;
			if(distance<=400){
				speed = speedArr[0];
				rate  = rateArr[0];
			}else if(distance>=800){
				speed = speedArr[1];
				rate = rateArr[1]
			}else{
				speed = speedArr[2];
				rate = rateArr[2];
			}
			this.glideAction();
		},
		glideAction : function() {
			if(t<=rate){
				glideObj.style.left = String(parseInt(Im.getObjStyle(glideObj,"left")) - glideDirection*glideDistance/(2*t))+"px";
				glideTimeOut = setTimeout(name+".glideAction()",speed);
				if(glideCrutDistance<=glideDistance){
					glideCrutDistance += glideDistance/(2*t);
				}
				t=t*2;
			}else{
				clearTimeout(glideTimeOut);
				glideObj.style.left = String(parseInt(Im.getObjStyle(glideObj,"left"))-glideDirection*(glideDistance-glideCrutDistance))+"px";

				glide.reset(glideObj);	

				Re.reSet();			
			}
		}
		,
		getArr:function(){
			return {"gObj":glideObj,"gDirection":glideDistance,"gcDis":glideCrutDistance,"gDistance":glideDirection,"gTimeOut":glideTimeOut,"gT":t};
		}
	};
};
