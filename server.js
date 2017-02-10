/**
 * server.js
 */

const express = require('express'),
	  bodyParser = require('body-parser'),
	  cookieParser = require('cookie-parser'),
	  multer = require('multer'),
	  app = express(),
	  server = require('http').createServer(app),
	  io = require('socket.io')(server),
	  http = require('http'),
	  logger = require('morgan'),
	  session = require('express-session'),  //session和数据库结合做持久化操作,
	  										 //当服务器挂掉的时候也不会导致某些用户信息(购物车)丢失
	  MongoStore = require('connect-mongo')(session);
	   
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser('lzshop'))
app.use(session({
	secret:'lzshop',
	resave:true,
	saveUninitialized:true
}))
app.use(logger('dev'));

app.use(require('./routers/register'))
app.use(require('./routers/login'))
app.use(require('./routers/loadCategory'))
app.use(require('./routers/user'))
app.use(require('./routers/repertory'))
app.use(require('./routers/submitOrderForm'))
app.use(require('./routers/loadWebsite'))
app.use(require('./routers/cart'))
app.use(require('./routers/test'))


server.listen(3000,()=>{
	console.log('listen 3000 port \r\n server is running...')
})
//app.set('port', process.env.PORT || 3000);
//http.createServer(app).listen(app.get('port'), function(){
//console.log('Express server listening on port ' + app.get('port'));
//});