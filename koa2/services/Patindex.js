const { PatUser } =require('../db/modeul/index')

async function upDateuser(id,Email,Password,name,Birth,sex){
    //sql语句
    const upData = {}
    if(Email){
        upData.Email=Email
    }if(Password){
        upData.Pasd=Password
    }if(Birth){
        upData.Birth=Birth
    }if(name){
        upData.Name=name
    }if(sex){
        upData.Sex=sex
    }
    const WhereData={
        id:id
    }
    console.log('ser', upData);
    const result = await PatUser.update(upData, {
        where: WhereData
    })
    console.log(result);
    return result[0] > 0 // 修改的行数
}
async function updateUserInfo(id){
    //查询
    const result =await  PatUser.findOne({
        attributes:['id','Name','Birth','Sex','Email'],
        where:id
    })
    if(result==null){
        return result
    }
    return result.dataValues
}

async function findpasdInfo(id,Pasd){
    console.log( Pasd);
    const WhereData={
        id:id,
        Pasd:Pasd
    }
  /*  const upData = {}
    upData.Pasd=Pasd
    const result=await PatUser.update(upData,{where:WhereData})*/
    const result=await PatUser.findOne({
        attributes:['email'],
        where:WhereData})
    console.log(result);
    if(result==null){
        return
    }
    return result.dataValues
}

//更改密码
async function updatepsdInfo1(id,Pasd){
    console.log( Pasd);
    const WhereData={
        id:id,
    }
      const upData = {}
      upData.Pasd=Pasd
      const result=await PatUser.update(upData,{where:WhereData})
    console.log(result);
    return result[0] > 0
}

module.exports={
    upDateuser,
    updateUserInfo,
    findpasdInfo,
    updatepsdInfo1
}
