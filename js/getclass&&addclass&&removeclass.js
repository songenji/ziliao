//获取class
function getClassName(parent,tagName,name){
	var aEls=parent.getElementsByTagName(tagName);
	var arr=[];
	for(var i=0;i<aEls.length;i++){
		var aClassName=aEls[i].className.split(' ');
		for(var j=0;j<aClassName.length;j++){
			if(aClassName[j]==name){
				arr.push(aEls[i]);
				break;
			}
		}
	}
	return arr;
};
//添加class
function(obj,name){
	//如果原来没有class
	if(obj.className==''){
		obj.className=name;
	}else{
		//如果原来有class
		  
		var arrClassName=obj.className.split(' ');
		var _index = arrIndexOf(arrClassName,name);
		if(_index==-1){
			//如果要添加的class在原来的class中不存在
			obj.className+=' '+name;
		}
		//如果要添加的class在原来的class中存在
		
	
	}
};

function removeClass(obj,name){
	//如果原来有class
	if(obj.className!=''){
		var arrClassName=obj.className.split(' ');
		var _index = arrIndexOf(arrClassName,name);
		//如果有我们要移除的class
		if(_index!=-1){
		  arrClassName.splice(_index,1);
          obj.className=arrClassName.join(' ');		  
		}
	}
	//如果原来没有class
};


function arrIndexOf(arr,v){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==v){
			return i;
		}
	}
	return -1;
}


