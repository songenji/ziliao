<template>
	<div id="three">
		<select class="dz_address" v-model="selected_sheng">
 		    <option value="">-省份-</option>
			<option value="其他">-其他-</option>
 			<option v-for='(item,key) in city' :value='key' v-text='key'></option>
 		</select>
 		<select class="dz_address" v-model="selected_shi">
 		    <option value="">-市-</option>
 		    <option value="其他">-其他-</option>
 			 <option v-for='item2 in shi' v-bind:value='item2' v-text='item2'></option>
 		</select>
 		<select class="dz_address" v-model="selected_qu">
 		    <option value="">-区-</option>
 		    <option value="其他">-其他-</option>
 		 <option v-for='item3 in qu' v-bind:value='item3' v-text='item3'></option> 
 		</select>
 		
	</div>
</template>
<script>
	import city from '../../add_js/city.json';
	export default{ 
		props:['s_sheng','s_shi','s_qu'],
	data(){   
			return {  
				xs:false,
	            city:city,
	            selected_sheng:'',
	            selected_shi:'',
	            selected_qu:'',
	            shi:'',
	            qu:'',
	            ss_shi:this.s_shi,
	            ss_qu:this.s_qu,
	          }  
      },
      mounted:function(){
    	  if(this.s_sheng){
    		  this.selected_sheng=this.s_sheng;
    	  }
          
        },
   watch:{
        selected_sheng:function(newval,oldval){
        	if(this.selected_sheng && this.selected_shi && this.selected_qu){
        	    this.xs=true;	
        	}else{
        		this.xs=false;
        	}
         var city=this.city;
         var arr=[];
            for(var key in city){
             if(key==newval){
                 for(var key2 in city[key]){
                  arr.push(key2);
                 }
              };
            }
            this.selected_shi='';
            this.shi=arr;
            if(this.s_shi){
            	this.selected_shi=this.ss_shi;
                this.ss_shi='';
            }
           //  this.$emit(this.$store.commit("s_sheng",newval)); //省
        },
        selected_shi:function(newval,oldval){
        	if(this.selected_sheng && this.selected_shi && this.selected_qu){
        	    this.xs=true;	
        	}else{
        		this.xs=false;
        	}
          var city=this.city;
         var arr=[];
            for(var key in city){
             if(key==this.selected_sheng){
                 for(var key2 in city[key]){
                   if(key2==newval){
                     this.qu=(city[key][key2]);
                   }
                  
                 }
              };
            }
            this.selected_qu='';
            if(this.s_qu){
                 this.selected_qu=this.ss_qu;
                  this.ss_qu='';
            }
            // this.$emit(this.$store.commit("s_shi",newval)); //市
        },
        selected_qu:function(newval,oldval){
        	if(this.selected_sheng && this.selected_shi && this.selected_qu){
        	    this.xs=true;	
        	}else{
        		this.xs=false;
        	}
        	//this.$emit(this.$store.commit("s_qu",newval)); //区
          },
     },
    
     
   } 
</script>
<style>
#three{
	overflow:hidden;
}
	.dz_address{
    display:block;
    float:left;
    width:118px;
    height:26px;
    margin-right:6px;
    border:solid 1px #d2d2d2;
}
#three{
	overflow:hidden;
}
	.dz_address{
    display:block;
    float:left;
    width:118px;
    height:26px;
    margin-right:6px;
    border:solid 1px #d2d2d2;
}
</style>
