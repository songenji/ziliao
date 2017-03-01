//编程式导航
import Vue from 'vue'
import VueRouter from 'vue-router'
import Parent from './tranistion.vue'
Vue.use(VueRouter);

const Home = {
  template:`
      <div>
         <h2>Home</h2>
         <p>This is Home  {{ $route.query.a }}</p>
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
     `,
      beforeRouteEnter:(to,from,next) => {  //组件Enter进入
                console.log(1);
                console.log(to);
                console.log(from);
                next() //可以执行
         },
      beforeRouteLeave:(to,from,next) => {  //组件Leave离开
                console.log(2);
                console.log(to);
                console.log(from);
                next() //可以执行
         }  
}

const router =new VueRouter({
  mode:'history',
  base:__dirname,
  routes:[
      {path:'/',component:Home},
      {path:'/Parent',component:Parent,
      //钩子
         beforeEnter:(to,from,next) => {  //在动作之前
                console.log(3);
                console.log(to);
                console.log(from);
                next() //可以执行
                //next(false) //不可以执行
                //next({path:'./fdsfdsf'}) //去这个地址
         }  

      },
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
         <button @click='houtui'>后退</button>
         <button @click='qianjin'>前进</button>
         <button @click='home'>home</button>
         <button @click='query'>query</button>
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
     
        if(from.path=='/Parent'){
          this.aaa='fade'
        }else{
          this.aaa='fade2'
        }
      }
     },
     methods:{
      houtui:function(){
        router.go(-1);
       },
       qianjin:function(){
        router.go(1);
       },
       home:function(){
        console.log(router);
        router.push('/');
       },
       query:function(){
        router.push({path:'/',query:{a:1,b:2}});
       },
     },
}).$mount('#app');

