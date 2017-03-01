//子路由
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const first = {template:'<div>first内容</div>'}
const second = {template:'<div>second内容</div>'}
const home = {template:'<div>home内容</div>'}

//子目录模板
const zi_first={
	template:`
         <div class='zi'>
           <h2>组件</h2>
           <router-view class='zi_view'></router-view>
         </div>
	  `
}

const firstFirst = {template:'<div>first子内容</div>'}
const firstSencond = {template:'<div>sencond子内容</div>'}

const router = new VueRouter({
	mode:'history',
	base:__dirname,
	routes:[   //注意 写routes不是router
         {path:'/',component:home},
         {path:'/first',component:zi_first,
            children:[
               {path:'/',component:first},
               {path:'first',component:firstFirst},//注意 子路由path不需要加'/'是first而不是/fitst
               {path:'second',component:firstSencond},
            ]
          },
         {path:'/second',component:second},
	  ]
})

new Vue({
    router,
    template:`
           <div id='r'>
	           <h1>导航</h1>
	           <ol>
	             <li><router-link to='/'>根目录</router-link></li>
	             <li><router-link to='/first'>first</router-link></li>
	                <ol>
                       <li><router-link to='/first/first'>first</router-link></li>
                       <li><router-link to='/first/second'>second</router-link></li>
	                </ol>
	             <li><router-link to='/second'>second</router-link></li>
	           </ol> 
	           <router-view class="main"></router-view>
           </div>
         `

}).$mount('#app')