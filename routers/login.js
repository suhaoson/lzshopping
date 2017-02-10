var express = require('express')
var user = require('../db/user')
var url = require('url')
var shortid = require('shortid')
var router = express.Router()
var dbSet = require('../db/db')

router.get('/log/:username/:password/:validNum',(req,res)=>{
	console.log(req.params)
	var username = req.params.username;
	var password = req.params.password;
	var validNum = req.params.validNum;
	user.find({username:username},{telephone:username}).count()
		.then(function(count){
			if(count > 0){
				var conditions = {password:req.params.password}
				user.find(conditions).count()
		    		.then(function(count){
		    			if(count > 0){
							req.session.username = username
							console.log(req.session)
		    				res.json({result:1})

		    			}else{
		    				res.json({result:0})
		    			}
		    		}).catch(function(err){
		    			console.log(err)
		    			res.json(err)
		    		})
				// dbSet.findExists(user,req,res,conditions)				
			}else{
				res.json({result:-1})
			}
		}).catch(function(err){
			console.log(err)
		})
})


module.exports = router