const { PatUser,DocUser } =require('../db/modeul/index')

async function getUserInfo(Email){
    //查询条件
    const whereOpt={
        Email
    }

    //查询
    const result =await  DocUser.findOne({
        attributes:['id'],
        where:whereOpt
    })
    if(result==null){
        return result
    }
    return result.dataValues
}

//注册
async function createPatUser(Name,Email,Sex,Birth,Pasd,Profile){
    const result = await DocUser.create({
        Name,
        Pasd,
        Birth,
        Sex,
        Email,
        Profile
    })
    console.log('data',result.dataValues);
    return result.dataValues
}


//照片上传
async function savePic(email,url){
    console.log(email);
    const result=await  DocUser.update({
        Pic:url,
    },{
        where:{
            Email:email
        }
    })
    console.log(result);
    return result[0] > 0 // 修改的行数
}

module.exports={
    getUserInfo,
    createPatUser,
    savePic
}