import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Room from '@/components/room/room'
import Login from '@/components/login/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/room',
      name: 'room',
      component: Room
    }

  ]
})
