const { PatUser,Medical,MedImg,MedObj,Facing,DocUser } =require('../db/modeul/index')
const Sequelize=require('sequelize')

//查找牙套次数
async  function FindFacCount(Patid){
    const result=await Facing.count({
        where: {PatUserId:Patid},
    })
    //  console.log(result);
    return result
}

//添加obj文件
async  function AddFcaingObj(PatUserId,DocUserId,PatFacing,ObjCreatedTime,ObjCount){
    const result=Facing.create({
        PatUserId,
        DocUserId,
        PatFacing,
        ObjCreatedTime,
        ObjCount
    })
    //console.log(result);
    return result
}

async  function getFacinfo1(patid,id){
    console.log('11111111',patid,id);
    const result=await Facing.findAndCountAll({
        where:{
            PatUserId:patid,
            ObjCount:id
        },
        attributes:['id','ObjCreatedTime','PatFacing'],
        include:[
            {
                model:DocUser,
                attributes:['Name']
        },{
            model:PatUser,
                attributes:['Name','Birth']
            }
        ]
    })
    console.log('111',result);
    let list =result.rows.map(row=>row.dataValues)
    console.log(list);
    return list
}

module.exports={
    FindFacCount,
    AddFcaingObj,
    getFacinfo1
}
