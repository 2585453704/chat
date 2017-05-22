<template >
  <div class="chatting-content" ref="chat_content">
    <div  v-for="item in his_msg">
      <div v-if="msg_judge(item)" class="chatting-item self">
        <div class="msg-from">
          <div class="msg-author">{{item.username}}</div>
        </div>
        <div class="msg-content">
          <span>{{item.msg}}</span>
        </div>
      </div>
      <div v-if="!msg_judge(item)" class="chatting-item other">
        <div class="msg-from">
          <div class="msg-author">{{item.username}}</div>
        </div>
        <div class="msg-content">
          <span>{{item.msg}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  export default {
    props: ["his_msg","user_id","socket"],
    data(){
      return{
          chat_content: '',
      }
    },
    computed:{


    },
    mounted(){
      var vm = this;
      this.chat_content = this.$refs.chat_content;
      this.socket.on('user_joined',function (data) {
        let oOnline = document.createElement('div');
        oOnline.className = 'online';
        oOnline.innerText = data.username + '上线了';
        console.log(typeof (vm.chat_content));
        vm.chat_content.appendChild(oOnline);
      })
    },
    methods:{
      msg_judge: function (data) {                  //判断消息是否属于自己发出
        if(data.user_id==this.user_id) return 1;
        else return 0;
      },
    }
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  .chatting-content{
    font-size: 25px;
    font-family: helvetica;
  }
  .chatting-content .online {
    font-size: 10px;
    color: grey;

    width: 200px;
    margin: 3px auto;
    border-radius: 4px;
    text-align: center;
    background-color: honeydew;
  }

  .chatting-content .chatting-item {
    padding: 10px;
    margin-bottom: 50px;
  }
  .chatting-content .chatting-item .msg-from{
    width: 100%;
    display: flex;
    align-items: center;
   }
  .chatting-content .chatting-item .msg-from .msg-author {
    font-size: 1.2rem;
  }
  .chatting-content .chatting-item .msg-content {
    margin-top: 5px;
    background-color: coral;
    width: 180px;
    padding: 6px 10px;
    border-radius: 10px;
  }
  .chatting-content .self .msg-from{
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .chatting-content .self .msg-content{
    float: right;
    background-color: deepskyblue;
    word-wrap: break-word;
    word-break: break-all;
  }
  .chatting-content .other .msg-from{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .chatting-content .other .msg-content{
    float: left;
    background-color: white;
    word-wrap: break-word;
    word-break: break-all;
  }
</style>
