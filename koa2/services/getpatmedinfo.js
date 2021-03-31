const { PatUser,Medical,MedImg,MedObj,DocUser,Facing,Appoint } =require('../db/modeul/index')
const Sequelize=require('sequelize')

//查找牙套次数
async  function getpatMedInfo(PatUserId){
    const result=await Medical.findAndCountAll({
        where: {PatUserId},
        attributes:['id','PatUserId','DocUserId','PatAge','Medic','MedCreatedTime','MedCount'],
        include:[{
            model:MedImg,
            attributes:['MedPic'],
        },{
            model:PatUser,
            attributes:['Name']
        },{
            model:DocUser,
            attributes:['Name']
        },{
            model:MedObj,
            attributes:['MedObjData']
        }
        ]
    })
   // console.log(result);
    let  list=result.rows.map(row=>row.dataValues)
    //  console.log(result);
    return list
}



async  function getpatMedInfo1(PatUserId,MedCount){
    const result=await Medical.findAndCountAll({
        where: {
            PatUserId,
            MedCount
        },
        attributes:['id','PatUserId','DocUserId','PatAge','Medic','MedCreatedTime','MedCount'],
        include:[{
            model:MedImg,
            attributes:['MedPic'],
        },{
            model:PatUser,
            attributes:['Name']
        },{
            model:DocUser,
            attributes:['Name']
        },{
            model:MedObj,
            attributes:['MedObjData']
        }
        ]
    })
    //console.log(result);
    let  list=result.rows.map(row=>row.dataValues)
      console.log(result);
    return list
}

async  function getpatfacInfo(PatUserId){
    const result=await Facing.findAndCountAll({
        where: {PatUserId},
        attributes:['ObjCount'],
    })
    console.log(result);
    let  list=result.rows.map(row=>row.dataValues)
    //  console.log(result);
    return list
}

async function finddocInfo(id){
    const result=await PatUser.findAndCountAll({
        distinct:true,
        where:{id},
        attributes:['DocUserId'],
        include:[{
            model:DocUser,
            attributes:['Name','Email']
        }]
    })
    let list=result.rows.map(row=>row.dataValues)
    console.log(list);
    return list
}

async  function getPatMedCountInfo(id){
    const result = await Medical.count({
        where:{
            PatUserId:id
        }
    })
    return result
}

module.exports={
    getpatMedInfo,
    getpatMedInfo1,
    getpatfacInfo,
    finddocInfo,
    getPatMedCountInfo

}
