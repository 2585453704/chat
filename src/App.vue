<template lang="html">
  <div id="app">
    <router-view :socket="socket"></router-view>
  </div>
</template>

<script>
//import io from '../socket.io'
  import io from 'socket.io-client'
export default {
  name: 'app',
  data(){
      return{
       //210的IP地址
        //socket: io.connect('http://192.168.31.78:8080'),
       //211的IP地址  socket: io.connect('http://192.168.1.102:8080'),
        socket: io.connect('http://47.93.19.164:8080'),
       // socket: io.connect('http://172.20.33.145:8080'),
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
