const  router=require('koa-router')()

const {AddFcaingObj,FindFacCount,getFacinfo1}=require('../services/facing')
const  {SuccessModel, ErrorModel}=require('../model/ResModel')
const fse = require('fs-extra')
const path=require('path')
const moment = require('moment')

const DIST_FOLDER_PATH=path.join(__dirname,'..','uploadFiles')

//上传obj文件
async function savefacingobjFile({name,type,size,email,id,docid,filePath}){

    const DIST_FOLDER_PATH=path.join(__dirname,'..','uploadFiles',String(email),'Facing')

    const fileName=Date.now()+'.'+name
    const disFilePath=path.join(DIST_FOLDER_PATH,fileName)//目的地
    await fse.move(filePath,disFilePath)
    let _count=await  FindFacCount(id)
    //  console.log(_count);
    _count=_count+1
    console.log(_count);
    const result = await AddFcaingObj(id,docid,'/' + email+'/Facing/'+fileName,Date.now(),_count)
    //console.log(result);

    if(!result){
        return new ErrorModel(loginFailInfo)
    }
    return new SuccessModel({
        url: '/' +  email+'/'+fileName
    })
}

//查找
async function getFacinfo(patid,id){
    console.log(patid, id);
    const date =new Date()
    const  result =await getFacinfo1(patid,id)
    const  age=date.getFullYear()-result[0].PatUser.Birth.getFullYear()
    let arry2=[];
    result.map(((item, index)=> {
        arry2.push(Object.assign({},item,{age:age}))
    }))
    console.log('11eqrwq1',arry2);
    arry2[0].ObjCreatedTime=moment(arry2[0].ObjCreatedTime).format('YYYY-MM-DD HH:mm:ss')
    return arry2
}


module.exports={
    savefacingobjFile,
    getFacinfo
}