<template>
 <div>
      <selectThree s_sheng="浙江省" s_shi="杭州市" s_qu="滨江区"></selectThree>
      <fenye></fenye>
 </div>
</template>
<script>
import fenye from '../component/fenye.vue';
import selectThree from '../component/select_three.vue';
export default{ 
	data(){   
        return {  
          
          }  
      },
     components:{
    	"fenye":fenye,
    	"selectThree":selectThree,
	     }
    }  

</script>

