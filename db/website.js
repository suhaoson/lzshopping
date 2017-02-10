const mongoose = require('mongoose')
	  schema = mongoose.schema
	  shortid = require('shortid');

var websiteSchema = mongoose.Schema({
	_id:{
        type:String,
        unique:true,
        'default':shortid.generate
    },
    sectionName:String,
    sid:Number,
    classify:Array,
    link:Array,
    hot:Array
})

var websiteModel = mongoose.model('website',websiteSchema)

module.exports = websiteModel