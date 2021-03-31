const  router=require('koa-router')()

const  {SuccessModel, ErrorModel}=require('../model/ResModel')
const {getpatMedInfo,getpatMedInfo1,getpatfacInfo,finddocInfo,getPatMedCountInfo}=require('../services/getpatmedinfo')
const moment = require('moment')


async  function patmedlook(id){
    const result=await getpatMedInfo(id)
  //  console.log(result);
    return result
}

async function getPatMedCount(id){
    const  result =await  getPatMedCountInfo(id)
    console.log(result);
    return result
}

async function getpatMed(medid,patid){
    // console.log(medid);
   // console.log(patid);
    let  result =await getpatMedInfo1(patid,medid)
    console.log('erqwr',result);
    result[0].MedCreatedTime=moment(result[0].MedCreatedTime).format('YYYY-MM-DD HH:mm:ss')
    return result
}

async  function patfaclook(id){
    const result=await getpatfacInfo(id)
    console.log(result);
    return result
}

async function finddoc(id){
    const result=await  finddocInfo(id)
    return result
}

module.exports={
    patmedlook,
    getpatMed,
    patfaclook,
    finddoc,
    getPatMedCount
}