var express = require('express')
var user = require('../db/user')
var cart = require('../db/cart')
var url = require('url')
var shortid = require('shortid')
var router = express.Router()
var dbSet = require('../db/db')

router.post('/saveCartShopping',(req,res)=>{
	var username = req.body.username
	var nameSission = req.session.username
	var time = new Date().getTime()
	var ip = req.ip
	req.body.time = time
	req.body.Ip = ip
	req.body.cartInfo = JSON.parse(req.body.cartInfo)
	// console.log(JSON.parse(req.body.cartInfo))
	if(username == nameSission){
		console.log(username+","+req.session.username)
		user.find({"username":username})
			.then(function(data){
				console.log(data)
				if(data.length){
					cart.find({username:username}).count()
						.then(function(count){
							if(count > 0){
								let conditions = {"username":username}
								dbSet.updateOneByCondition(cart,req,res,conditions);
							}else{
								dbSet.addOne(cart,req,res);
							}
						})
				}
			}).catch(function(err){

			})
	}else{
		res.json({result:-1}) 
	}
	

})

module.exports = router
