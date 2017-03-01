//Vue-router 入门
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const first = {template:'<div>first内容</div>'}
const second = {template:'<div>second内容</div>'}
const home = {template:'<div>home内容</div>'}

const router = new VueRouter({
	mode:'history',
	base:__dirname,
	routes:[   //注意 写routes不是router
         {path:'/',component:home},
         {path:'/first',component:first},
         {path:'/second',component:second},
	  ]
})

new Vue({
    router,
    template:`
           <div id='r'>
	           <h1>导航</h1>
	           <ul>
	             <li><router-link to='/'>根目录</router-link></li>
	             <li><router-link to='/first'>first</router-link></li>
	             <li><router-link to='/second'>second</router-link></li>
	           </ul> 
	           <router-view class="main"></router-view>
           </div>
         `

}).$mount('#app')