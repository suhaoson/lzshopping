//var mongoose= require('mongoose')
//mongoose.connect('mongodb://127.0.0.1/lzshopping')
//var db = monggose.connection
//
//db.on('error',function(){
//	console.log('连接数据失败');
//})
//db.once('open',function(){
//	console.log('连接数据库成功')
//})

var mongoose = require('mongoose')
var schema = mongoose.Schema
var shortid = require('shortid')

var  userSchema = mongoose.Schema({
	_id:{
        type:String,
        unique:true,
        'default':shortid.generate
    },
	username:String,
	password:String,
	name:String,
	address:String,
	telephone:Number,
	zCode:Number,
	birthday:Date,
	Ip:String,
	time:Number,
	imagesUrl:String
})

var userModel = mongoose.model('user',userSchema)

module.exports = userModel
