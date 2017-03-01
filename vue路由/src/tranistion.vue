<template>
 <div>
   <button @click='show=!show'>按钮</button>
   <transition name='fade'>
       <p v-if="show">Hello world</p>
   </transition>
 </div>
</template>

<script>
 export default{
 	name:'demo',
 	data(){
 		return{
 			show:true,
 		}
 	}
 }
</script>

<style scoped>
.fade-enter-active,.fade-leave-active{
	transition: opacity .5s
}
.fade-enter,.fade-leave-active{
	opacity: 0
}
</style>