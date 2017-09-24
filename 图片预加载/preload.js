//图片预加载
(function($){
   function PreLoad(imgs,options){
      this.imgs=(typeof imgs==='string')?[imgs]:imgs;
      this.opts=$.extend({},PreLoad.DEFAULTS,options);
      
      if(this.opts.order==='ordered'){
        //有序加载
      }else{
      	//无序加载
        this._unoredered();
      }

   }
   PreLoad.DEFAULTS={   //默认参数
   	  order:'unoredered',//加载类型  默认无序加载
      each:null,  //每一张图片加载完毕后执行
      all:null //所有图片加载完毕后执行
   }
   PreLoad.prototype._unoredered=function(){//有序加载
      var opts=this.opts;
      var imgs=this.imgs;
      var len=imgs.length;
      var count=0;

      load();
	  function load(){
	    var imgObj=new Image();
	    $(imgObj).on("load error",function(){
	      opts.each && opts.each(count);
	      if(count>=len){
	        //所有图片加载完毕  第一张加载完加载第二张  类似于漫画图
	        opts.all && opts.all();
	      }else{
	        load();
	      }
	       count++;
	    })
	    imgObj.src=imgs[count];
	  }


   },
   PreLoad.prototype._unoredered=function(){//无序加载
   	var imgs=this.imgs;
   	var opts=this.opts;
   	var count=0;
   	var len=imgs.length;
   	  $.each(imgs,function(i,src){
   	  	if(type src!='string'){return;}
       var imgObj=new Image();
       $(imgObj).on('load error',function(){
           opts.each && opts.each(count);
           if(count>=len-1){
             opts.all && opts.all();
           }
           count++;
       })
       imgObj.src=src;
   });
  }
  $.extend({
  	preload:function(imgs,opts){
  		 new PreLoad(imgs,opts);
  	}
  })
})(jQuery)