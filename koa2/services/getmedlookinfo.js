const { PatUser,Medical,MedImg,MedObj,DocUser } =require('../db/modeul/index')
const Sequelize=require('sequelize')

//查找牙套次数
async  function getMedInfo(PatUserId){
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
    console.log('病历信息',result);
    let  list=result.rows.map(row=>row.dataValues)
    //  console.log(result);
    return list
}


module.exports={
    getMedInfo,

}
