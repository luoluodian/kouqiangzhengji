const  {getUserInfo, userPatLogin,userDocLogin,createPatUser,savePic}=require('../services/user')
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
async  function register(UserName,UserEmail,UserSex,UseBirth,UserPassword){
    console.log(UserName,UserEmail,UserSex,UseBirth,UserPassword)
    const userInfo =await  createPatUser(UserName,UserEmail,UserSex,UseBirth,UserPassword)
    console.log('userInfo',userInfo);
}


//登录
async  function userlogin(ctx,loginEmail,loginPassword,LoginType,loginCode){

    if(loginCode!=ctx.session.code){
        return new ErrorModel(codeInfo)
    }
    var userInfo
    if(LoginType=='PatUser'){
        userInfo=await userPatLogin(loginEmail,loginPassword)

    }else {
        userInfo=await userDocLogin(loginEmail,loginPassword)
        userInfo.PatId=''
      //  userInfo.Email=''
    }
    console.log(userInfo);
    if(userInfo==null){
        console.log(new ErrorModel(loginFailInfo));
        return new ErrorModel(loginFailInfo)
    }
    if (ctx.session.userInfo ==null){
        userInfo.Type=LoginType
        ctx.session.userInfo = userInfo
    }
    console.log(ctx.session.userInfo);
    return  new SuccessModel(userInfo)
}

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})


//上传头像
async function saveFile({name,type,size,filePath}){
    //移动文件
    const email=name
    //console.log(email);
    const pos = email.lastIndexOf(".");
    //console.log(pos)
    const aa=email.substring(0,pos)
    //console.log(aa)
    const DIST_FOLDER_PATH=path.join(__dirname,'..','uploadFiles',aa)

    const fileName=Date.now()+'.'+name
    const disFilePath=path.join(DIST_FOLDER_PATH,fileName)//目的地
    await fse.move(filePath,disFilePath)
    //console.log('wenjianluj',disFilePath);

    const result = await savePic(aa,'/' + aa+'/'+fileName)
    if(!result){
        return new ErrorModel(loginFailInfo)
    }
    return new SuccessModel({
        url: '/' +  aa+'/'+fileName
    })
}


//退出登录

async function logout(ctx) {
    delete ctx.session.userInfo
    return new SuccessModel()
}


module.exports={
    isExist,
    userlogin,
    register,
    saveFile,
    logout
}