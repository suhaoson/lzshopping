

var mongoose = require('mongoose')
var schema = mongoose.Schema
var shortid = require('shortid')

var  orderFormSchema = mongoose.Schema({
	_id:{
        type:String,
        unique:true,
        'default':shortid.generate
    },
	location:String,
	address:String,
	name:String,
	address:String,
	zCode:Number,
	freight:String,
	Ip:String,
	time:Number,
	payed:Boolean,
	cartLS:Array,
	username:String,
	orderid:String,
	payway:String
})

var orderFormModel = mongoose.model('orderForm',orderFormSchema)

module.exports = orderFormModel
