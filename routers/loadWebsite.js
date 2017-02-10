var express = require('express')
var website = require('../db/website')
var user = require('../db/user')
var url = require('url')
var shortid = require('shortid')
var router = express.Router()
var dbSet = require('../db/db')

router.get('/getWebsiteConfig/:sectionName',(req,res)=>{
	website.find({"sectionName":req.params.sectionName})
		.then(function(data){
			res.json(data)
		})
		.catch(function(err){
			res.end(err)
		})
})






router.post('/updateWebsite',(req,res)=>{})

module.exports = router
