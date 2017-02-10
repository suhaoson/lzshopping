var express = require('express')
var user = require('../db/user')
var url = require('url')
var shortid = require('shortid')
var router = express.Router()
var dbSet = require('../db/db')

router.get('/getUserInfo/:username',(req,res)=>{
	var username = req.params.username;
	user.findOne({username:username})
		.then(function(data){
			res.json(data)
		}).catch(function(err){
			console.log(err)
			res.json(err)
		})
})

router.post('/alterUserInfo',(req,res)=>{
	var username = req.body.username
	var name = req.body.name
	var address = req.body.address
	var telephone = req.body.telephone
	var zCode = req.body.zCode
	var birthday = req.body.birthday
	
	user.find({username:username}).count()
		.then(function(count){
			if(count < 1){
				res.json({result:-1})
			}else{
				var conditions = {username:req.body.username}
				dbSet.updateOneByCondition(user,req,res,conditions)
			}
		}).catch(function(err){
			console.log(err)
		})
})

module.exports = router
