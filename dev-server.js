require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)


module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}


//聊天室后台响应模块


var socketio = require('socket.io');
var io;
var guest_num = 0;
var name_list = [];
var sockets = [];
io = socketio(server);

io.on('connection', function (socket) {
  var added_user = 0;
  //针对后退的应对方法
  // socket.on('refresh',function () {
  //   refresh_judge = 1;
  // })

  /* *************** 用户emit消息"join"时，响应 *************** */
  socket.on('join', function (username) {
    //判断是否有重名用户
    for(let i=0;i<name_list.length;i++){
      if(username===name_list[i]){
        socket.emit('name_repeated');
        return ;
      }
    }
    // 用户信息存储在socket会话中并将用户对象存入用户对象数组中
    socket.username = username;
    if(added_user==1) name_list.splice(socket.id,1,username);
    if(added_user==0) ++guest_num;
    // 告知用户登录成功
    socket.emit('login', {
      username: socket.username,
      numUsers: guest_num,
    });
    if(added_user==0) {
      added_user = 1;
      name_list.push(username);
      socket.id = guest_num;
      sockets.push(socket);
      // 广播告知所有用户
      socket.broadcast.emit('user_joined', {
        username: socket.username,
        msg: "欢迎 " + socket.username + " 进入聊天室",
        type: "BROADCAST",
        numUsers: guest_num
      });
    }
  });

  /* 登陆进聊天室后的响应*/
  socket.on('online',function () {
    if(!socket.username) socket.username="蒋泽宇的儿子";
    socket.emit('sent_id',socket.id);
    socket.on('sent_msg',function (data) {
      io.sockets.emit('new_msg',{
        username: socket.username,
        user_id: socket.id,
        msg: data
      });
    })
  })

  /* *************** 用户离开 *************** */
  socket.on('disconnect', function () {
    if (added_user) {
      --guest_num;
      name_list.splice(socket.id-1,1);
      sockets.splice(socket.id-1,1);
      for(let i=socket.id-1;i<sockets.length;i++){
        sockets[i].id -= 1;
      }
      // for (item in sockets){
      //   if (item.id>socket.id) --item.id;
      // }
      // 告知所有用户
      socket.broadcast.emit('user_left', {
        username: socket.username,
        user_id: socket.id,
        msg: socket.username + "离开了聊天室！",
        numUsers: guest_num
      });
    }
  });

  /* *************** 更多 *************** */
  // 在这里添加更多监听的消息
  // ...


});
