const  {upDateuser,updateUserInfo,findpasdInfo,updatepsdInfo1}=require('../services/Patindex')
const {userPatlogin}=require('../services/user')
const   {SuccessModel, ErrorModel}=require('../model/ResModel')
const { registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    pasdInfo1}=require('../model/ErrorInfo')
const md5=require('md5')

async function update(id,Email,Password,name,Birth,sex){
    console.log('con',id,Email,Password,name,Birth,sex)
     const result=await upDateuser(id,Email,Password,name,Birth,sex)
    if(!result){
        return new ErrorModel(loginFailInfo)
    }
    return  new SuccessModel()
}

async function updateuserInfo(ctx,id){
    const result=await updateUserInfo(id)
    if(!result){
        return new ErrorModel(loginFailInfo)
    }
    ctx.session.userInfo = result
    return  new SuccessModel(result)
}
//更新密码
async function updatepsdInfo(id,pasd){
    const result=await updatepsdInfo1(id,md5(pasd))
    console.log(result);
    if(result==false){
        return new ErrorModel(pasdInfo1)
    }
    return new SuccessModel(result)
}

async function findpasd(id,pasd){
    console.log(id, pasd);
    const result=await findpasdInfo(id,md5(pasd))
    if(result==null){
        return new ErrorModel(pasdInfo1)
    }
    console.log(result);
    return new SuccessModel(result)
}

module.exports={
    update,
    updateuserInfo,
    findpasd,
    updatepsdInfo
}