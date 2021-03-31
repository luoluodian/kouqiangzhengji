const { PatUser,Medical,MedImg,MedObj } =require('../db/modeul/index')
const Sequelize=require('sequelize')

//得到患者信息
async function getPatInfo(email){
    //查询
    const result =await PatUser.findOne({
        attributes:['id','Name','Birth','Sex','Email'],
        where:{
            Email:email
        }
    })
    console.log('1',result);

   // let list =result.rows.map(row=>row.dataValues)
    //console.log('患者信息',list);
    return result
}

//添加病历信息
async  function AddmedInfo(PatUserId,DocUserId,Medic,PatAge,MedCreatedTime,MedCount){
    console.log(PatUserId,DocUserId,Medic,PatAge,MedCreatedTime,MedCount)
    const result=await Medical.create({
        PatUserId,
        DocUserId,
        PatAge,
        Medic,
        MedCreatedTime,
        MedCount
    })
//    console.log(result);

    return result
}

//查找患者病历次数
async  function FindPatMedCount(Patid){
    const result=await Medical.count({
        where: {PatUserId:Patid},
    })
  //  console.log(result);
    return result
}

//查找最新的用户病历Id
async  function  medIdInfo(id){
    console.log(id);
    const result =await Medical.count({
        where:{
            PatUserId:id
        },
    })
    //console.log(result);
    return result
}
//添加病历图片
async  function AddMedImg(MedID,MedPic,MedCreatedTime){
    const result=MedImg.create({
        MedID,
        MedPic,
        MedCreatedTime,
    })
    //console.log(result);
    return result
}

//添加obj文件
async  function AddMedObj(MedPatUserID,MedID,MedObjData,MedObjCreatedTime,MedObjCount){
    const result=MedObj.create({
        MedPatUserID,
        MedID,
        MedObjData,
        MedObjCreatedTime,
        MedObjCount
    })
    //console.log(result);
    return result
}


//寻找obj文件出现的次数
async  function FindMedObjCount(Patid){
    const result=await MedObj.count({
        where: {MedPatUserId:Patid},
    })
    //  console.log(result);
    return result
}



module.exports={
    getPatInfo,
    AddmedInfo,
    FindPatMedCount,
    medIdInfo,
    AddMedImg,
    AddMedObj,
    FindMedObjCount
}
