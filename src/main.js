// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import VueSocketio from 'vue-socket.io';
import VueRouter from 'vue-router'
import Room from '@/components/room/room'
import Login from '@/components/login/login'

//
// Vue.use(VueSocketio, 'http://127.0.0.1:8080/');
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {path: '/login',component: Login},
    {path: '/room',component: Room},
  ],
})



Vue.config.productionTip = false

router.push('/login');
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
})
