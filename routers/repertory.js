var express = require('express')
var repertory = require('../db/repertory')
var category = require('../db/category')
var url = require('url')
var shortid = require('shortid')
var router = express.Router()
var dbSet = require('../db/db')

router.get('/getCommodityBycid/:cid',(req,res)=>{
	var cid = parseInt(req.params.cid);
	category.findOne({cid,cid})
		.then(function(data){
			if(data.length < 1){
				res.json({result:-1})
			}
			else{
				var classids =[]
				var classify = data.classify
				for(var i = 0;i < classify.length;i++){
					classids.push(classify[i].classid)
				}
				var conditions = {"classid":{"$in":classids}}
				dbSet.findByConditions(repertory,req,res,conditions)
					
			}
			
		}).catch(function(err){
			res.end(err)
		})
})

router.get('/getCommodityByclassid/:classid',(req,res)=>{
	var classid = req.params.classid;
	classid = parseInt(classid)
	var condition = {"classid":classid}
	// dbSet.findByCondition(repertory,req,res,condition)
	 repertory.find(condition)
        .then(function(data){
            if(data.length < 1){
                res.json({result:-1})
            }else{
            	var classifyData = {}
            	classifyData.commodity = data
            	category.find({"classify.classid":classid},{"classify.class":1,"classify.classid":1})
            		.then(function(data){
            			classifyData.classify = data[0].classify
            			res.json(classifyData)
            		}).catch(function(err){
            			res.send(err)
            		})
            }
        }).catch(function(err){
            res.end(err)
        })
})

router.get('/getCommodityBycommodity/:commodityid',(req,res)=>{
	var commodityid = req.params.commodityid;
	commodityid = parseInt(commodityid)
	var condition = {"commodityid":commodityid}
	repertory.find(condition)
		.then(function(data){
			if(data.length < 1){
				res.json({result:-1})
			}else{
				res.json(data)
			}
		}).catch(function(err){
			res.end(err)
		})
})

router.get('/getCommodityBycommoditys/:commodityids',(req,res)=>{
	var commodityids = req.params.commodityids;
	commodityids = JSON.parse(commodityids)
	var condition = {"commodityid":{"$in":commodityids}}
	repertory.find(condition)
		.then(function(data){
			if(data.length < 1){
				res.json({result:-1})
			}
			res.json(data)
		}).catch(function(err){
			console.log(err)
			res.end(err)
		})
})

router.get('/getCommodityAll',(req,res)=>{
	repertory.find()
		.then(function(data){
			res.json(data)
		}).catch(function(err){
			console.log(err)
		})
})

router.post('/updateCommodity',(req,res)=>{})

module.exports = router
