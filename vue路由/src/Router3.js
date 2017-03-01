//路由中参数的传递
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

const firstFirst = {template:'<div>first子内容{{ $route.params.id }}</div>'} //注意这里是$route.params.id而不是$router.params.id
const firstSencond = {template:'<div>sencond子内容</div>'}

const router = new VueRouter({
	mode:'history',
	base:__dirname,
	routes:[   //注意 写routes不是router
         {path:'/',name:'Home',component:home},
         {path:'/first',component:zi_first,    //如果有子路由name是写在子路由里的
            children:[
               {path:'/',name:'Home-First',component:first},
               {path:'first',name:'Home-First-First',component:firstFirst},//注意 子路由path不需要加'/'是first而不是/fitst
               {path:'second',name:'Home-First-Second',component:firstSencond},
            ]
          },
         {path:'/second',name:'Home-Second',component:second},
	  ]
})
//注意是$route.name而不是$router.name
//到模板传参需要绑定 :to='{name:"Home-First-First",params:{id:123}}' 通过对应的name跳转
new Vue({
    router,
    template:`
           <div id='r'>
	           <h1>导航</h1>
	           <p>{{ $route.name }}</p>
	           <ol>
	             <li><router-link to='/'>根目录</router-link></li>
	             <li><router-link to='/first'>first</router-link></li>
	                <ol>
                       <li><router-link :to='{name:"Home-First-First",params:{id:123}}'>first</router-link></li>
                       <li><router-link to='/first/second'>second</router-link></li>
	                </ol>
	             <li><router-link to='/second'>second</router-link></li>
	           </ol> 
	           <router-view class="main"></router-view>
           </div>
         `

}).$mount('#app')