const  {getUserInfo, userPatLogin,userDocLogin,createPatUser,savePic}=require('../services/admin')
const   {SuccessModel, ErrorModel}=require('../model/ResModel')
const fse = require('fs-extra')
const path=require('path')
const { registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo,
    changeInfoFailInfo,
    changePasswordFailInfo,
    codeInfo}=require('../model/ErrorInfo')
//
const DIST_FOLDER_PATH=path.join(__dirname,'..','uploadFiles')
//文件尺寸
const MIX_SIZE= 1024*1024*1024
//用户是否存在
async  function isExist(email){
    //业务逻辑处理
    //调用services数据获取
    //返回统一格式
    const userInfo =await getUserInfo(email)
    console.log(userInfo);
    if(!userInfo){
        return  new SuccessModel(userInfo)
    }else{
        return new ErrorModel({
            errno:10003,
            message:'用户名存在'
        })
    }
}

//注册
async  function register(UserName,UserEmail,UserSex,UseBirth,UserPassword,UserPro){
    console.log(UserName,UserEmail,UserSex,UseBirth,UserPassword,UserPro)
    const userInfo =await  createPatUser(UserName,UserEmail,UserSex,UseBirth,UserPassword,UserPro)
    console.log('userInfo',userInfo);
}


// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})


//上传头像
async function saveFile({name,type,size,filePath}){

    //移动文件  拼接名字
    const email=name
    console.log(email);
    const pos = email.lastIndexOf(".");
    console.log(pos)
    const aa=email.substring(0,pos)
    console.log(aa)
    const DIST_FOLDER_PATH=path.join(__dirname,'..','uploadFiles','headimage')

    const fileName=name
    const disFilePath=path.join(DIST_FOLDER_PATH,fileName)//目的地
    await fse.move(filePath,disFilePath)
    //console.log('wenjianluj',disFilePath);


    const result = await savePic(aa,'/headimage/'+fileName)
    if(!result){
        return new ErrorModel(loginFailInfo)
    }
    return new SuccessModel({
        url: '/headimage/'+fileName
    })
}
//退出登录
async function logout(ctx) {
    delete ctx.session.userInfo
    return new SuccessModel()
}

module.exports={
    isExist,
    register,
    saveFile,
    logout
}