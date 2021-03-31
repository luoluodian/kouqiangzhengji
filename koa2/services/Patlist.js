const Sequelize=require('sequelize')
const { Appoint ,DocUser,PatUser} =require('../db/modeul/index')

//今天的患者
async function getTodayPatInfo(id,day){
    const result=await Appoint.findAndCountAll({
        attributes:['PatUserId','DocUserId','AppointReason','AppTime','AppDay'],
        where:{
            DocUserId:id,
            AppDay:day
        },
        include:[
            {
                model:PatUser,
                attributes:['id','Name','Birth','Sex','Email','DocUserId','Pic'],
            },
            {
                model:DocUser,
                attributes:['id','Name','Birth','Sex','Email','Pic'],
            }
        ]
    })
    //console.log('查询结果',result);
    let applist=result.rows.map(row=>row.dataValues)
    return applist
    //console.log('查询结果111',applist.dataValues);
}

//我的患者
async  function getPatListInfo(id){
    const result =await PatUser.findAndCountAll({
        attributes:['id','Name','Birth','Sex','Email','DocUserId','Pic'],
        where:{
            DocUserId:id
        }
    })
    let list= result.rows.map(row=>row.dataValues)
    console.log('list',list)
    return list
}


//所有的患者
async  function getAllPatInfo(){
    const result =await PatUser.findAndCountAll({
        attributes:['id','Name','Birth','Sex','Email','DocUserId','Pic'],
        include:[
            {
                model:DocUser,
                attributes:['id','Name','Birth','Sex','Email','Pic']
            }
        ]
    })

    let list= result.rows.map(row=>row.dataValues)
    console.log('alllist',list)
    return list
}

module.exports={
    getTodayPatInfo,
    getPatListInfo,
    getAllPatInfo
}
