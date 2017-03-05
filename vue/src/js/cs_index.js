import 'babel-polyfill'
import Vue from 'vue'
import App from '../view/page/cs_index.vue'
//import $ from 'expose?$!jquery'
//import store from '../add_js/Order_authorizesListsstore'
//import vueResource from 'vue-resource'
//require("../css/Order_authorizesLists.less");
//require('../add_js/public.js');
//Vue.use(vueResource);
new Vue({
	el: '#main',
	//store,
	render: z => z(App),
});