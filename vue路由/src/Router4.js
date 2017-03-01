//路由表的组件群
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const first = {template:'<div>first内容</div>'}
const second = {template:'<div>second内容</div>'}
const home = {template:'<div>home内容</div>'}
const three = {template:'<div>three内容</div>'}
const four = {template:'<div>four内容</div>'}
const router = new VueRouter({
	mode:'history',
	base:__dirname,
	routes:[   //注意 写routes不是router
         {path:'/',components:{  //注意 因为这是是路由群所以component要写成components;
            default:home,//默认  （没写name的那个router-view）
            left:first, //left是router-view里写的name
            right:second,//right是router-view里写的name
         }}, 
         {path:'/first',components:{ //注意 因为这是是路由群所以component要写成components;
            default:home,//默认  （没写name的那个router-view）
            left:three, //left是router-view里写的name
            right:four,//right是router-view里写的name
         }},
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
	           </ol> 
	           <router-view class="main1"></router-view>
             <router-view class="main2" name='left' style="float:left;width:50%;height:100px;background:red;"></router-view>
             <router-view class="main3" name='right' style="float:left;width:50%;height:100px;background:yellow;"></router-view>
           </div>
         `

}).$mount('#app')