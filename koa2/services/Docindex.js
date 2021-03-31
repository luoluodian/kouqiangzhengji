const router=require('koa-router')()
const { Appoint ,DocUser,PatUser} =require('../db/modeul/index')
const Sequelize=require('sequelize')

//今天的预约信息
async function getTodayInfo(id,day){
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
        }
        ]
    })
    //console.log('查询结果',result);
    let applist=result.rows.map(row=>row.dataValues)
    return applist
    //console.log('查询结果111',applist.dataValues);
}

//首次预约患者
async  function getNewAppInfo(id){
    const Userid=id
    console.log('dfsafasf',id);
    const result=await Appoint.findAndCountAll({
        attributes:['PatUserId','DocUserId','AppointReason','AppTime','AppDay'],
        where:{
            PatUserId:Userid
        },
        order: [['CreatTime','DESC']],
        include: [
            //
            {
                model: DocUser,
                attributes: ['Name','Pic'],
            },
            {
                model: PatUser,
                attributes: ['Name','Pic'],
            }
        ]
    })
    let applist=result.rows.map(row=>row.dataValues)
    console.log(applist)

    return applist
}

//预约列表
async function getAppListInfo(id){
    const result=await Appoint.findAndCountAll({
        where:{
            DocUserId:id
        },
        order:[['CreatTime','DESC']],
        attributes:['PatUserId','DocUserId','AppointReason','AppTime','AppDay'],
        include:{
            model:PatUser,
            attributes:['id','Name','Birth','Sex','Email','DocUserId','Pic'],
        }
    })
    //console.log('ser预约列表',result)
    let list=result.rows.map(row=>row.dataValues)
    //console.log('ser列表list',list);
    return  list
}

//今天预约患者
async  function getNewApp1Info(id,_day){
    const Userid=id
    console.log('dfsafasf',id);
    const result=await Appoint.findAndCountAll({
        attributes:['PatUserId','DocUserId','AppointReason','AppTime','AppDay'],
        where:{
            DocUserId:Userid,
            AppDay:_day
        },
        order:Sequelize.col('AppTime'),
        include: [
            {
                model: DocUser,
                attributes: ['Name','Pic'],
            },
            {
                model: PatUser,
                attributes: ['Name','Pic'],
            }
        ]
    })
    let applist=result.rows.map(row=>row.dataValues)
    console.log(applist)

    return applist
}


module.exports={
    getTodayInfo,
    getNewAppInfo,
    getAppListInfo,
    getNewApp1Info
}