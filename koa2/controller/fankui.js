const  router=require('koa-router')()

const {AddFcaingObj,FindFacCount}=require('../services/facing')
const  {SuccessModel, ErrorModel}=require('../model/ResModel')
const {finddocInfo,addfankuiinfo,findChatId,AddChatImg,findchatcount,findchatcount1,
    findfankuiInfo,getpatidinfo,findcountInfo,addhuifuInfo,getNewsInfo,getNewInfo}=require('../services/fankui')
const fse = require('fs-extra')
const path=require('path')
const format = require('string-format')
const moment = require('moment')
const DIST_FOLDER_PATH=path.join(__dirname,'..','uploadFiles')

//上传obj文件
async function saveChatImg({name,email,pat,filePath}){
    const DIST_FOLDER_PATH=path.join(__dirname,'..','uploadFiles',String(email),'ChatImg')
    const fileName=Date.now()+'.'+name
    const disFilePath=path.join(DIST_FOLDER_PATH,fileName)//目的地
    await fse.move(filePath,disFilePath)
    console.log(pat);
    let Chatid=await  findChatId(pat)
    const result = await AddChatImg('/' + email+'/ChatImg/'+fileName,Chatid)
    //console.log(result);
    if(!result){
        return new ErrorModel(loginFailInfo)
    }
    return new SuccessModel({
        url: '/' +  email+'/'+fileName
    })
}

//查找医生id
async  function findDoc(id){
    console.log(id);
    const result=await  finddocInfo(id)
    //console.log(result);
    return result
}

//添加信息
async  function addfankui(patid,docid,fankuipro){
    const patlook='1'
    const doclook='0'
    const day=moment().format('YYYY-MM-DD HH:mm:ss')
    let _count=await findchatcount(patid)
   // console.log(_count);
    _count=_count+1
    //console.log('1111111',_count);
    const result=await  addfankuiinfo(patid,docid,fankuipro,day,_count,patlook,doclook)
    //console.log(result);
    return result
}

//查看反馈条数
async  function patfankuicount(id){
    const result=await findchatcount1(id)
    return result
}

//查看反馈信息
async  function findfankui(patid,fankuicount){
    console.log(patid);
    console.log(fankuicount);
    const result =await findfankuiInfo(patid,fankuicount)
    if(  result[0].fankuitime!=null){
        result[0].Createdtime= moment(result[0].Createdtime).format('YYYY-MM-DD HH:mm:ss')
        result[0].fankuitime= moment(result[0].fankuitime).format('YYYY-MM-DD HH:mm:ss')
    }else{
        result[0].Createdtime= moment(result[0].Createdtime).format('YYYY-MM-DD HH:mm:ss')
    }
    console.log(result);
    return result
}

//医生获取反馈患者信息
async  function getpatid(id){
    let result =await  getpatidinfo(id)
    var obj = {};
    //去重
    result = result.reduce(function(item, next) {
        obj[next.PatUserId] ? '' : obj[next.PatUserId] = true && item.push(next)
        return item;
    }, []);
    console.log(result);
    return result
}

//找id
async  function findcount(id){
    console.log(id);
    let result =await  findcountInfo(id)
    console.log(result);
   // result=result+1
    return result
}

//添加反馈
async  function addhuifu(fankuiId,fankuiPro){
    const result =await  addhuifuInfo(fankuiId,fankuiPro)
    console.log(result);
    if(result[0]>0){
        return new SuccessModel(result)
    }
}

// 查看最新的反馈消息
async function getNews(id){
    //
    const result =await getNewsInfo(id)
    console.log('反馈',result.length);
    //更改反馈时间
    for(let i=0;i<result.length;i++){
        result[i].fankuitime= moment( result[i].fankuitime).format('YYYY-MM-DD HH:mm:ss')
        console.log(result[i].fankuitime);
    }
    if(result.length==0) {
        return null
    }
   /* let arry2=[];
    result.map(((item, index)=> {
        arry2.push(Object.assign({},item,{time:time}))
    }))*/
    return  result
}

// 查看最新的反馈消息
async function getNew(id){
    const result =await getNewInfo(id)
    console.log('反馈',result.length);
    //更改反馈时间
    for(let i=0;i<result.length;i++){
        result[i].Createdtime= moment(result[i].Createdtime).format('YYYY-MM-DD HH:mm:ss')
        console.log(result[i].fankuitime);
    }
    if(result.length==0) {
        return null
    }
    return  result
}

module.exports={
    findDoc,
    addfankui,
    saveChatImg,
    patfankuicount,
    findfankui,
    getpatid,
    findcount,
    addhuifu,
    getNews,
    getNew
}