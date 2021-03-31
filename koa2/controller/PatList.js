const router=require('koa-router')()
const  {SuccessModel, ErrorModel}=require('../model/ResModel')
const {getTodayPatInfo,getPatListInfo,getAllPatInfo}=require('../services/Patlist')




//今天预约的患者
async function getTodayPat(id){
    //创建时间
    let date=new Date()
    const day=date.getDate()
    const  month=date.getMonth()+1
    const years=date.getFullYear()
    const _day=years+'-'+month+'-'+day

    const result =getTodayPatInfo(id,_day)

    console.log('今天预约患者',result)
    return result

}


//医生的所有患者
async  function getPatList(id){
    const result=await getPatListInfo(id)
    console.log('医生的患者',result)

    return  result
}

//所有患者信息

async  function getAllPat(){
    const result =await getAllPatInfo()
    console.log('所有患者信息',result)
    return result
}

module.exports={
    getTodayPat,
    getPatList,
    getAllPat
}
