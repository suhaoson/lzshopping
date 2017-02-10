const mongoose = require('mongoose')
	  schema = mongoose.schema
	  shortid = require('shortid');

var categorySchema = mongoose.Schema({
	_id:{
        type:String,
        unique:true,
        'default':shortid.generate
    },
	category:String,
	classify:Array,
	cid:Number
})

var categoryModel = mongoose.model('category',categorySchema)

module.exports = categoryModel