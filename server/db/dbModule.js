const query = require('./connectQuery')

module.exports = {
    login(data,callback){
        query('select * from user',(err,result)=>{
            callback(err,result)
        })
    },
    register(data,callback){
    	console.log(data)
    	// query(`insert into user(name,password,email,mobile)`)
    },

    //保存文章
    saveArticel(data,callback){
        callback('',{status:0})
    }
}