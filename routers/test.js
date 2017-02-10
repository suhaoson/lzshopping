var express = require('express')
var category = require('../db/category')
var repertory = require('../db/repertory')
var url = require('url')
var shortid = require('shortid')
var router = express.Router()
var dbSet = require('../db/db')

router.get('/saveCategory',(req,res)=>{
	console.log('test')
	function Constru(category,classify){
		this.category = category;
		this.classify = classify;
	}

	// var obj1Ca = {};
	// var obj1Cl = ;

	// var dataObj =new Constru(obj1Ca,obj1Cl);

	// console.log(dataObj)

	var newCatory = new category({"category":'运动户外',"classify":['跑步机','平衡车'],'cid':1})
	newCatory.save(function(err){
		if(!err){
			res.end('success')
		}else{
			res.end('error')
		}
	})
})

router.get('/saveCommodity',(req,res)=>{
	console.log('test')
	var newRepertory = new repertory({"commodityName" : "Apple/苹果 iPad Pro WLAN 配备Retina平板电脑", 
    "price":5588, 
    "brand" : "苹果", 
    "options" : {
        ROM:['32G',"128G"],
        color:['银色','深空灰黑','金色']
    }, 
    "inventory" : 300, 
    "classid" : 302, 
    "commodityid" : 30210000, 
    "imgUrl" : "", 
    "imgThumUrl" : "images/products/210/21030210000.jpg", 
    "comment" : [
    	{
    		
    	}
    ]
	})
	newRepertory.save(function(err){
		if(!err){
			res.end('success')
		}
		else{
			res.send(err)
		}
	})

})

router.get('/updateWebcon',(req,res)=>{
	console.log('test')
	var newwebsite = new website( { 
    "sectionName" : "main", 
    "sid" : 2, 
    "classify" : [
        {
            "class" : "手机", 
            "classid" : 101
        }, 
        {
            "class" : "智能摄像", 
            "classid" : 102
        }, 
        {
            "class" : "移动硬盘", 
            "classid" :103
        }, 
        {
            "class" : "智能手环", 
            "classid" : 104
        }, 
        {
            "class" : "单电微单", 
            "classid" : 105
        }
    ], 
    "hot" : [
        [
            {
                "cid" : 1.0
            }, 
            {
                "imgurl" : [
                    21010110000.0, 
                    21010110001.0, 
                    21010130001.0
                ]
            }
        ], 
        [
            {
                "cid" : 2.0
            }, 
            {
                "imgurl" : [
                    21020630001.0, 
                    21020620000.0
                ]
            }
        ]
    ]
})
	newwebsite.save(function(err){
		if(!err){
			res.end('success')
		}
		else{
			res.send(err)
		}
	})

})

module.exports = router