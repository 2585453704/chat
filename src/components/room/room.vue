<template lang="html">
  <div class="room_wrapper">
    <div class="header">
     <div class="user_num_count"><img src="../../common/account-2.png"><span>{{users_num}}</span></div>
     <span>尬聊</span>
     <img @click="show_detail" src="../../common/comments-5.png">
    </div>
    <div class="chatting_content_wrapper" ref="chat_w"><chatting_content :his_msg="his_msg" :user_id="user_id" :socket="socket" ref="chat_content" ></chatting_content></div>
    <div class="chatting_input">
      <div class="emoj_show" v-show="emoj">
        <ul>
          <li v-for="item in emojs" class="emoj" @click="insert_emoj(item)">{{item}}</li>

        </ul>
      </div>
      <img src="../../common/吐舌-2-2.png" @click="control_emoj">
      <textarea placeholder="输入内容啊啊啊!!" v-model="typing"></textarea>
      <button @click="send_msg">发送</button>
    </div>
    <div class="detail-room" v-show="detail_show">
      <p class="pic">🐸</p>
      <p class="email">e-mail:</p>
      <p class="address">2585453704@qq.com</p>
      <img class="close" src="../../common/关闭箭头.png" @click="detail_close"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Chatting_content from './chatting_content/chatting_content.vue'
  export default{
    props: ['socket'],
    data(){
        return{
            his_msg: [],
            users_num: 0,
            typing: '',
            user_id: '',
            oContent: '',
            oTextarea: '',
            chat_content: '',
            emoj: 0,
            emojs: ["🐶","🐺","🐱","🐭","🐹","🐰","🐸","🐯","🐨","🐻","🐷","🐽","🐮","🐗","🐵","🐒","🐴","🐑","🐘","🐼","🐧","🐦","🐤","🐥","😝","😛","😳","😁","😔","😌","😒","😞","😣","😢","😂","😭","👂","👀","👃","👅","👄","👍","👎","👌","👊","✊","✌","👋","✋","👐","👆","👇","👉","👈","🙌","🙏","☝","👏","💪"],
            detail_show: 0,
        }
    },
    mounted(){
        var vm = this;
        this.oContent = this.$refs.chat_w;
//        this.chat_content = this.$refs.chat_content;
    },
    created(){
        var vm = this;
        this.socket.emit('online');
        this.socket.on('sent_id',function (data) {
          vm.user_id = data;
        });
        this.socket.on('user_joined',function (data) {
          vm.users_num = data.numUsers;
        })
        this.socket.on('new_msg',function (data) {
          console.log('recieve')
          if(data){
          	vm.his_msg.push(data);
          	console.log("数据的ID: "+ data.user_id);
          	console.log("自己的ID："+ vm.user_id);
          }
          vm.$nextTick( () => {
            vm.oContent.scrollTop = vm.oContent.scrollHeight
          })
        });
        this.socket.on('user_left',function (data) {
          console.log(data);
          if(vm.user_id>data.user_id) vm.user_id -= 1;
          vm.users_num = data.numUsers;
        })

    },
    components:{
      'chatting_content': Chatting_content
    },
    methods: {
      send_msg: function () {
        this.socket.emit('sent_msg', this.typing);
        this.typing = '';
        this.$nextTick( () => {
          this.oContent.scrollTop = this.oContent.scrollHeight
        })
        //.scrollTo(0,document.body.scrollHeight)
      },
      control_emoj: function () {
        if(this.emoj) {
          this.emoj = 0;
        }
        else this.emoj = 1;
      },
      insert_emoj: function (item) {
        this.typing += item;
      },
      show_detail: function () {
        this.detail_show = 1;
      },
      detail_close: function () {
        this.detail_show = 0;
      }
    },
  }
</script>

<style>
  *{
  	padding: 0;
  	margin: 0;
  }
  .room_wrapper{
    position: absolute;
    top: 0px;
    left: 0;
    margin: 0;
    padding:0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  .room_wrapper .header{
    text-align: center;
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*align-items: center;*/
    line-height: 50px;
    height: 50px;
    width: 100%;
    background-color: deepskyblue;
    color: white;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
  }
  .room_wrapper .header .user_num_count{
    height: 50px;
    position: relative;

  }
  .room_wrapper .header .user_num_count span{
    font-size: 20px;
    color: white;
    position: absolute;
    top: 6px;
  }

  .room_wrapper .chatting_content_wrapper{
      flex: 1;
      width: 100%;
      background-color: rgba(0, 0, 0, .1);
      overflow: auto;
  }
  .room_wrapper .chatting_input{
  	display: flex;
    position: relative;
    background-color: rgba(0, 0, 0, .1);
    height: 40px;
    width: 100%;
  }
  .room_wrapper .chatting_input img{
    width:40px;
    height:40px;
  }
  .room_wrapper .emoj_show{
    position: absolute;
    width: 100%;
    height: 210px;
    background-color: white;
    top: -210px;
    left: 0;
    overflow-y: auto;
  }
  .room_wrapper .emoj_show ul{
    display: flex;
    flex-wrap: wrap;
    list-style-type:none
  }
  .room_wrapper .emoj_show ul .emoj{
    padding: 2px 3px;
    font-size: 2.2rem;
    /*font-size: 10px;*/
  }
  .room_wrapper .chatting_input textarea {
    /*border-radius: 8px;*/
    flex: 1;
    resize: none;
    padding-left: 3px;
    padding-top: 0px;
    padding-right: 3px;
    height: 40px;
    font-size: 1.4rem;
    line-height: 40px;
  }
  .room_wrapper .chatting_input button {
    border-radius: 8px;
    width: 60px;
    height: 40px;
    background-color: rosybrown;
    color: white;
    font-size: 16px;
  }
  .detail-room {
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
    background: rgba(250, 250, 210, 0.8);
    display: flex;
  }
  .detail-room .pic{
    font-size: 40px;
  }
  .detail-room .email{
    font-size: 20px;
    color: orangered;
  }
  .detail-room .address{
    font-size:30px;
    color: deepskyblue;
  }
  .detail-room .close{
    position: absolute;
    bottom: 20px;
  }
</style>
