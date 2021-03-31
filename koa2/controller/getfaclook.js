const  router=require('koa-router')()

const {getfacinfo}=require('../services/getfacInfo')
const  {SuccessModel, ErrorModel}=require('../model/ResModel')
const moment=require('moment')


//查找牙套信息
async function getFac(id){
    const  result=await  getfacinfo(id)
    console.log(result);
    for(let i=0;i<result.length;i++){
         result[i].ObjCreatedTime=moment(result[i].ObjCreatedTime).format('YYYY-MM-DD HH:mm:ss')
    }
    return result
}

module.exports={
    getFac
}