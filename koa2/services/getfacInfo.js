const { Facing,DocUser, PatUser} =require('../db/modeul/index')
const Sequelize=require('sequelize')

//查找牙套次数
async  function getfacinfo(PatUserId){
    const result=await Facing.findAndCountAll({
        where: {PatUserId},
        attributes:['id','PatFacing','ObjCreatedTime','ObjCount'],
        include:[{
            model:PatUser,
            attributes:['Name','Birth']
        },{
            model:DocUser,
            attributes:['Name']
        }
        ]
    })
    console.log(result);
    let  list=result.rows.map(row=>row.dataValues)
    //  console.log(result);
    return list
}


module.exports={
    getfacinfo,

}
