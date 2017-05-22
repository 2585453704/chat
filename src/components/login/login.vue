<template lang="html">
  <div class="login_wrapper">
    <div class="header">
      <img @click="show_detail" src="../../common/comments-3.png"/>

    </div>
    <div class="welcome">hello</div>
    <h2>输入你的名字👇</h2>
    <input v-model="name" type="text" autofocus/>
    <div class="method_wrapper" >
       <img @click="sent_name" src="../../common/selected.png"/>
    </div>
    <div class="detail" v-show="detail_show">
      <p class="pic">🐸</p>
      <p class="email">e-mail:</p>
      <p class="address">2585453704@qq.com</p>
      <img class="close" src="../../common/关闭箭头.png" @click="detail_close"/>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
//    sockets:{
//      login: function (data) {
//        console.log(data)
//        this.$router.push('/room')
//      },
//      name_repeated: function () {
//        console.log("你起的名字 "+this.name+ " 与别人重复啦")
//      },
//    },
    props: ['socket'],
    data(){
        return {
            name: '',
            detail_show: 0,
        }
    },
    created(){
    	  if(this.socket){
    	  	let vm = this;
        this.socket.on('login',function (data) {
          console.log(data);
          vm.$router.push('/room');
        })
        this.socket.on('name_repeated',function(){
        	  alert("你起的名字 "+vm.name+ " 与别人重复啦");
        })
      }
    },
    methods: {
        sent_name: function () {
          if (this.socket) {
            let str = this.name;
            str = str.replace(/(^\s*)|(\s*$)/g, "");
            this.socket.emit('join', str);
          }
        },
        show_detail: function () {
          this.detail_show = 1;
        },
        detail_close: function () {
          this.detail_show = 0;
        }
    }
  }
</script>

<style>
  .login_wrapper{
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: wheat;
    color: #ffffff;
    font-size: 0;
  }
  .login_wrapper .header{

  }
  /*.login_wrapper .header p{*/
    /*position: absolute;*/
    /*top: 10px;*/
    /*right: 20px;*/
    /*font-size: 13px;*/
    /*right: 20px;*/
    /*color: deepskyblue;*/
  /*}*/
  .login_wrapper .header img{
    height: 30px;
    width: 30px;
    position: absolute;
    top: 15px;
    right:10px;
  }
  .login_wrapper .welcome{
    font-size: 100px;
    color: orangered;
  }
  .login_wrapper h2{
    font-size: 30px;
    letter-spacing: 1px;
    color: darkolivegreen;
  }
  .login_wrapper input{
    width: 300px;
    padding: 5px 10px;
    /*background-color: #FFE400;*/
    /*border-radius: 8px;*/
    /*border-color: #FFE400;*/
    background-color:wheat;
    border: 0px;
    outline:0;
    border-bottom: 2px solid orangered;
    text-align: center;
    font-size: 2rem;
    letter-spacing: 2px;
    color: darkred;
  }
  .login_wrapper .method_wrapper{
    margin-top: 30px;
  }
  .login_wrapper img{
    height: 50px;
    width: 50px;
    cursor:pointer
  }
  .detail {
    position: fixed;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 100;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: auto;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
  }
  .detail .pic{
    font-size: 40px;
  }
  .detail .email{
    font-size: 20px;
    color: wheat;
  }
  .detail .address{
    font-size:30px;
    color: deepskyblue;
  }
  .detail .close{
    position: absolute;
    bottom: 20px;
  }
</style>
