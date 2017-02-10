const mongoose = require('mongoose')
	  schema = mongoose.schema
	  shortid = require('shortid');

var repertorySchema = mongoose.Schema({
	_id:{
        type:String,
        unique:true,
        'default':shortid.generate
    },
    commodityName:String,
    price:Number,
    comment:Array,
    brand:String,
    options:Object,
    inventory:Number,
    classid:Number,
    commodityid:Number,
    imgUrl:String,
    imgThumUrl:String,
	cid:{
		type:Number,
		ref:'category'
	}
})

var repertoryModel = mongoose.model('repertory',repertorySchema)

module.exports = repertoryModel