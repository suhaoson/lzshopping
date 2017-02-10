var express = require('express')
var repertory = require('../db/repertory')
var category = require('../db/category')
var orderForm = require('../db/orderForm')
var url = require('url')
var shortid = require('shortid')
var router = express.Router()
var dbSet = require('../db/db')

router.post('/submitOrderForm',(req,res)=>{
	var username = req.body.username
	var address = req.body.address
	var name = req.body.name
	var cartLS = req.body.cartLS
	var telephone = req.body.telephone
	var zCode = req.body.zCode
	var time = new Date().getTime()
	var random = Math.floor((Math.random()*899)+100).toString()
	var ip = req.ip
	var orderid = ip+time + random + "1"+"1"  +random
	req.body.orderid = orderid
	req.body.time = time
	req.body.ip = ip
	req.body.cartLS = JSON.parse(req.body.cartLS)
	orderForm.find({orderid:orderid}).count()
		.then(function(count){
			if(count>0){
				res.json({result:-1})
			}else{
				dbSet.addOne(orderForm,req,res)
			}
		}).catch(function(err){
			res.end(err)
		})

})

module.exports = router
