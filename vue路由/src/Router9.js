//路由的过渡动画
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const Home = {
  template:`
      <div>
         <h2>Home</h2>
         <p>This is Home</p>
      </div>
     `
}

const Parent = {
  template:`
      <div>
         <h2>Parent</h2>
         <p>This is Parent</p>
      </div>
     `
}
const router =new VueRouter({
  mode:'history',
  base:__dirname,
  routes:[
      {path:'/',component:Home},
      {path:'/Parent',component:Parent},
   ],
})

//name=fade 表示动画class mode表示动画模式 out-in in-out
new Vue({
  router,
  template:`
      <div id='ap'>
         <h1>This is Transition</h1>
         <ul>
            <li><router-link to='/'>/</router-link></li>
            <li><router-link to='/Parent'>Parent</router-link></li>
         </ul>
         <transition name='fade' mode='out-in'>
         <router-view></router-view>
         </transition>
      </div>
     `
}).$mount('#app');

