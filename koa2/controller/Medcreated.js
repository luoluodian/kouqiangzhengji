const  router=require('koa-router')()

const {getPatInfo,AddmedInfo,FindPatMedCount,medIdInfo,AddMedImg,AddMedObj,FindMedObjCount}=require('../services/MedCreate')
const  {SuccessModel, ErrorModel}=require('../model/ResModel')
const fse = require('fs-extra')
const path=require('path')

const DIST_FOLDER_PATH=path.join(__dirname,'..','uploadFiles')


//得到患者基本信息
async function getPat(email){
    const  result= await  getPatInfo(email)
    console.log('患者信息',result);
    const date=new Date()
    const years=date.getFullYear()
    const age=years-result.Birth.getFullYear()
    console.log(age);
    result.dataValues.age=age
    return  result
}

//添加病历
async function AddMed(Patid,MedPro,Patage,Docid){
    const _day=new Date()
    //console.log(_day);
    let _count=await  FindPatMedCount(Patid)
  //  console.log(_count);
    _count=_count+1
    //console.log(_count);
    //console.log(Patid,Docid,MedPro,Patage,_day,_count)

    const result=await AddmedInfo(Patid,Docid,MedPro,Patage,_day,_count)
    //console.log(result);
    return  new SuccessModel(result)

}




//上传图片信息
async function saveMedFile({name,type,size,email,id,filePath}){

    //移动文件

    const DIST_FOLDER_PATH=path.join(__dirname,'..','uploadFiles',String(email),'MedImg')

    const fileName=Date.now()+'.'+name
    const disFilePath=path.join(DIST_FOLDER_PATH,fileName)//目的地
    await fse.move(filePath,disFilePath)
    //console.log('wenjianluj',disFilePath);
    //console.log(id);
    console.log(id);
    const medId=await medIdInfo(id)
    //console.log(medId);
    console.log('111',medId);
    const result = await AddMedImg(medId,'/' + email+'/MedImg/'+fileName,Date.now())
    //console.log(result);
     if(!result){
        return new ErrorModel(loginFailInfo)
    }
    return new SuccessModel({
        url: '/' +  email+'/'+fileName
    })
}


//上传obj文件
async function saveMedobjFile({name,type,size,email,id,filePath}){

    const DIST_FOLDER_PATH=path.join(__dirname,'..','uploadFiles',String(email),'MedObj')

    const fileName=Date.now()+'.'+name
    const disFilePath=path.join(DIST_FOLDER_PATH,fileName)//目的地
    await fse.move(filePath,disFilePath)
    console.log('11123',id);
    const medId=await medIdInfo(id)
    //console.log(medId);
    //const _id=medId.id
    //console.log(_id);
    let _count=await  FindMedObjCount(id)
    //  console.log(_count);
    _count=_count+1
    console.log(_count);
    const result = await AddMedObj(id,medId,'/' + email+'/MedObj/'+fileName,Date.now(),_count)
    //console.log(result);

    if(!result){
        return new ErrorModel(loginFailInfo)
    }
    return new SuccessModel({
        url: '/' +  email+'/'+fileName
    })
}


module.exports={
    getPat,
    AddMed,
    saveMedFile,
    saveMedobjFile
}