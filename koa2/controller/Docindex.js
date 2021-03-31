const router=require('koa-router')()
const {getTodayInfo,getNewAppInfo,getAppListInfo,getNewApp1Info}=require('../services/Docindex')
const   {SuccessModel, ErrorModel}=require('../model/ResModel')
const moment = require('moment')

async function getToday(id){
    //获取今天时间
    let date=new Date()
    const day=date.getDate()
    const  month=date.getMonth()+1
    const years=date.getFullYear()
    const _day=years+'-'+month+'-'+day

    const result=await getTodayInfo(id,_day)
    console.log('resule',result);
    return  result

}

async  function getNewApp(id){
    const result =await getNewAppInfo(id)
    console.log('最新预约查看',result);
    return result
}


//今天预约的患者
async  function getNewApp1(id){

    let date=new Date()
    const day=date.getDate()
    const  month=date.getMonth()+1
    const years=date.getFullYear()
    const _day=years+'-'+month+'-'+day

    const result =await getNewApp1Info(id,_day)
    console.log('预约查看',result);
    return result
}

//查看预约记录
async  function getAppList(id){
    const result =getAppListInfo(id)
    console.log('预约记录',result);
    return result
}

module.exports={
    getToday,
    getNewApp,
    getAppList,
    getNewApp1
}