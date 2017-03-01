//query
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);


//子目录模板
const users={
  template:`
         <div class='zi'>
           <h2>users</h2>
           <router-view class='zi_view'></router-view>
         </div>
    `
}

const home =  {
  template:`
         <div class='zi'>
         Home
         </div>
    `
}

const user =  {
  template:`
         <div>
          {{ $route.params.username }}
          <br>
          {{ $route.query.aaa }}
         </div>
    `
}

const router = new VueRouter({
  mode:'history',
  base:__dirname,
  routes:[   //注意 写routes不是router
         {path:'/',name:'Home',component:home},
         {path:'/users',component:users,    //如果有子路由name是写在子路由里的
            children:[

               {path:':username',name:'user',component:user}, //路径用了绑定  这里的username绑的是router-link里的sej
               ]
          },
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
                       <li>
                         <router-link :to="{path:'/users/sej',query:{aaa:'bbb'}}">
                         sej
                         </router-link>
                       </li>
                   </ol>
             </ol> 
             <router-view class="main"></router-view>
           </div>
         `

}).$mount('#app')