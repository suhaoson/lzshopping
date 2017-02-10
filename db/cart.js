var mongoose = require('mongoose')
var schema = mongoose.Schema
var shortid = require('shortid')

var  cartSchema = mongoose.Schema({
	_id:{
        type:String,
        unique:true,
        'default':shortid.generate
    },
	username:String,
	cartInfo:Array,
	Ip:String,
	time:Number
})

var cartModel = mongoose.model('cart',cartSchema)

module.exports = cartModel
