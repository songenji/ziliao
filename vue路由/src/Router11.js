//如何使用vue文件作为目标 & 404处理
import Vue from 'vue'
import VueRouter from 'vue-router'
import Parent from './tranistion.vue'
Vue.use(VueRouter);

const Home = {
  template:`
      <div>
         <h2>Home</h2>
         <p>This is Home</p>
      </div>
     `
}

/*const Parent = {
  template:`
      <div>
         <h2>Parent</h2>
         <p>This is Parent</p>
      </div>
     `
}*/

const Page404 = {
  template:`
      <div>
         <h2>Page404</h2>
         <p>This is 404</p>
      </div>
     `
}

const router =new VueRouter({
  mode:'history',
  base:__dirname,
  routes:[
      {path:'/',component:Home},
      {path:'/Parent',component:Parent},
      {path:'*',component:Page404}, //404路由必须放在最后
   ],
})

//name=fade 表示动画class mode表示动画模式 out-in in-out
new Vue({
  router,
  data(){
  return {
     aaa:'fade',
    }
  },
  template:`
      <div id='ap'>
         <h1>This is Transition</h1>
         <ul>
            <li><router-link to='/'>/</router-link></li>
            <li><router-link to='/Parent'>Parent</router-link></li>
            <li><router-link to='/WEWE'>404</router-link></li>
         </ul>
         <transition :name='aaa' mode='out-in'>
         <router-view></router-view>
         </transition>
      </div>
     `,
     watch:{
      "$route"(to,from){
        console.log(to);
        console.log(from);
        if(from.path=='/Parent'){
          this.aaa='fade'
        }else{
          this.aaa='fade2'
        }
      }
     }
}).$mount('#app');

