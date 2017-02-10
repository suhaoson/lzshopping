var express = require('express')
var router = express.Router()
var user = require('../db/user')
var dbSet = require('../db/db')

router.post('/reg',(req,res)=>{
	var username = req.body.username
	var password = req.body.password
	var name = req.body.name
	var address = req.body.address
	var telephone = req.body.telephone
	var zCode = req.body.zCode
	var birthday = req.body.birthday
	var validNum = req.body.validNum
	
	user.find({username:username}).count()
		.then(function(count){
			if(count > 0){
				res.json({result:-1})
			}else{
				dbSet.addOne(user,req,res)
				res.json({result:1})
			}
		}).catch(function(err){
			console.log(err)
		})
})

router.get('/notExists/:name',(req,res)=>{
	var name = req.params.name
	user.find({username:name}).count()
	.then(function(count){
		setTimeout(function(){
			if(count == 0){
				res.json({result:1})
			}else{
				res.json({result:0})
			}
		},1000)
	}).catch(function(err){
		res.json({result:0})
	})
})

module.exports = router

