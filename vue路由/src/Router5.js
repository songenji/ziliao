//url传值
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const router = new VueRouter({
  mode:'history',
  base:__dirname,
  routes:[
      {path:'/'},
      {path:'/params/:aaa/:bbb'},
      {path:'/parame-regex/:id(\\d+)'}   //:id(\\d+)  冒号绑定
   ]
})
//  /parame-regex/9绑定正确
//  /parame-regex/aa绑定错误
new Vue({
  router,
  template:`
       <div>
          <h1>Good Morning</h1>
          <ul>
             <li><router-link to='/'>/</router-link></li>
             <li><router-link to='/params/111/7'>/params/111/7</router-link></li>
             <li><router-link to='/parame-regex/9'>/parame-regex/9</router-link></li>
             <li><router-link to='/parame-regex/aa'>/parame-regex/aa</router-link></li>
          </ul>
          <p>Show</p>
          <pre>
             <code>
                {{ JSON.stringify($route,null,2) }}
                {{ $route.params.aaa }}
                {{ $route.params.bbb }}
             </code>
          </pre>
       </div>
    `
}).$mount("#app");