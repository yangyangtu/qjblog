const express = require('express')
let router = express.Router()
const db = require('../db/dbModule')
const commonFunc = require('../common/commonFunc.js')

router.post('/home/ajax-get-basic-info',(req,res) => {
	let sessionName = req.session.username;
	let json = '';
	if(!!sessionName){
		json = commonFunc.formatJSON({"name":sessionName},true,"登陆成功",200);
	}else{
		json = commonFunc.formatJSON({},false,"登陆失效",500);
	}
	res.send(json);
})

//获取时间和文章数
router.post('/home/ajax-get-dateMonth-list',(req,res) => {
	let data = req.body;
	db.home.getAllArticle(data,(err,result)=>{
        if(err){
            res.status(500).send({message:err,status:0,code:500}); 
            return;
		}
		//将数据按时间归类处理统计
		let TempData = {};
		let returnList = [];
		let max = 0,min=0;
		for(let item of result){
			const publishTime = commonFunc.DateFormater(new Date(item.publishTime),'yyyy年MM月');
			if(!TempData[publishTime]){
				TempData[publishTime] = {
					groupName:publishTime,
					date:item.publishTime,
					count:0,
					max:item.publishTime,
					min:item.publishTime,
					articleList:[]
				};
			}
			TempData[publishTime].count++;
			TempData[publishTime].articleList.push(item);
			//存储最大值最小值，用发布时间范围筛选
			if(item.publishTime > TempData[publishTime].max){
				TempData[publishTime].max = item.publishTime;
			}
			if(item.publishTime < TempData[publishTime].min){
				TempData[publishTime].min = item.publishTime;
			}
		}
		Object.keys(TempData).map((key)=>{
			returnList.push(TempData[key])
		})

        res.status(200).send({message:'获取文章列表成功',status:0,code:200,data:returnList}); 
    })
})

//获取首页的文章列表
router.post('/home/ajax-get-article-list',(req,res) => {
	let data = req.body;
	db.home.getArticleList(data,(err,result)=>{
        if(err){
            res.status(500).send({message:err,status:0,code:500}); 
            return;
        }
        res.status(200).send({message:'获取文章列表成功',status:0,code:200,data:result});
        
    })
})

module.exports = router