const  router=require('koa-router')()

const  {SuccessModel, ErrorModel}=require('../model/ResModel')
const {getMedInfo}=require('../services/getmedlookinfo')
const moment=require('moment')


async  function getMed(id){
    const result=await getMedInfo(id)
    console.log('1212',result);
    result[0].ObjCreatedTime=moment(result[0].MedCreatedTime).format('YYYY-MM-DD HH:mm:ss')
    return result
}

module.exports={
    getMed
}