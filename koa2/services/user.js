
const { PatUser,DocUser}=require('../db/modeul/index')

async function getUserInfo(Email,password){
    //查询条件
    const whereOpt={
        Email
    }
    if(password){
        Object.assign(whereOpt,{password})
    }
    //查询
    const result =await  PatUser.findOne({
        attributes:['id'],
        where:whereOpt
     })
    if(result==null){
        return result
    }
    return result.dataValues
}

//注册
async function createPatUser(Name,Email,Sex,Birth,Pasd){
    const result = await PatUser.create({
        Name,
        Pasd,
        Birth,
        Sex,
        Email
    })
    console.log('data',result.dataValues);
    return result.dataValues
}


//登录
async  function userPatLogin(loginEmail,loginPassword){
    const Pasd=loginPassword
    const Email=loginEmail
    console.log(Pasd);
    const  whereOpt={Pasd,Email}

    const result=await PatUser.findOne({
        attributes:['id','Name','Birth','Sex','Email','DocUserId','Pic'],
        where:whereOpt
    })
    if(result==null){
        return result
    }
    return result.dataValues
}

//照片上传
async function savePic(email,url){
    console.log(email);
    const result=await  PatUser.update({
        Pic:url,
    },{
        where:{
        Email:email
        }
    })

    console.log(result);
    return result[0] > 0 // 修改的行数
}


async  function userDocLogin(loginEmail,loginPassword){
    const Pasd=loginPassword
    const Email=loginEmail
    const  whereOpt={Pasd,Email}
    const result=await DocUser.findOne({
        attributes:['id','Name','Birth','Sex','Email','Pic'],
        where:whereOpt
    })
    if(result==null){
        return result
    } 
    return result.dataValues
}


module.exports={
    getUserInfo,
    userPatLogin,
    userDocLogin,
    createPatUser,
    savePic
}