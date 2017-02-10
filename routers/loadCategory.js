var express = require('express')
var category = require('../db/category')
var url = require('url')
var shortid = require('shortid')
var router = express.Router()
var dbSet = require('../db/db')

router.get('/getCategoryOne/:id',(req,res)=>{
	var cid = req.params.id
	var condition = {"cid":cid}
	var result = dbSet.findByCondition(category,req,res,condition)
})
router.get('/getCategoryAll',(req,res)=>{
	var result = dbSet.findAll(category,req,res)
})

module.exports = router