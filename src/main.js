// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueAxios from 'vue-axios'
// import axios from 'axios'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $https from './until/https'
Vue.use($https)
Vue.use(ElementUI);
// Vue.use(VueAxios, axios)


Vue.config.productionTip = false
    // console.log(store)
    //console.log(Vue.prototype)
    /* eslint-disable no-new */
let vm = new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store
})