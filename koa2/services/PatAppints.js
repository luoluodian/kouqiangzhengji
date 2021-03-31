const Sequelize=require('sequelize')
const { Appoint ,DocUser,PatUser} =require('../db/modeul/index')



//最新的预约
async function getNewAppiont(id) {
    const Userid=id
    console.log('dfsafasf',id);
    const result=await Appoint.findAndCountAll({
        attributes:['PatUserId','DocUserId','AppointReason','AppTime','AppDay'],
        where:{
            PatUserId:Userid
        },
        order:[Sequelize.fn('max', Sequelize.col('AppDay'))],
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

//加载全部的
async function getAllAppiont(id,pageindex=0,pagesize=10) {

        const result=await Appoint.findAndCountAll({
            limit:pagesize,
            offset:pagesize*pageindex,
            attributes:['PatUserId','DocUserId','AppointReason','AppTime','AppDay'],
            where:{
                PatUserId:id
            },
            order:[['id','desc']],
            include: [
            //
            {
                model: DocUser,
                attributes: ['Name','Pic'],
            },
            {
                model: PatUser,
                attributes: ['Name'],
                where: { id }
            }
        ]
    })

    console.log(result);

    let applist=result.rows.map(row=>row.dataValues)

    console.log(applist)

    applist = applist.map(appItem => {
        const DocUser=appItem.DocUser.dataValues
        const PatUser=appItem.PatUser.dataValues

        let date =new Date(appItem.Date)
        const resDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        const resTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        date=resDate+'/'+resTime
        appItem.DocUser=DocUser
        appItem.PatUser=PatUser
        appItem.Date=date
        return appItem
    })

    //console.log(applist);
    return {
        count:result.count,
        applist
    }
}


//推荐医生
async function getRecDocInfo(id){

    //select max(num),DocUserId from (select DocUserId,count(1)
    // as num from Appoints group by DocUserId )t

    const result=await  Appoint.findAndCountAll({
        group: 'DocUserId',
        attributes: ['DocUserId',
            [Sequelize.fn('count', Sequelize.col('DocUserId')), 'count']],
        where:{
            PatUserId:id,
        }
    })

    //console.log('推荐：',result.rows);
    let recDoc=result.rows.map(row=>row.dataValues)

    console.log('DocUserId',recDoc);
    return  recDoc
    /* const result=await Appoint.findOne({
         attributes:['PatUserId','DocUserId','AppointReason','Date'],
         where:{
             PatUserId:Userid
         },
         order:[Sequelize.fn('max', Sequelize.col('DocUserId'))],
         include: [
             //
             {
                 model: DocUser,
                 attributes: ['Name'],
                 where: { id }
             },
             {
                 model: PatUser,
                 attributes: ['Name'],
                 where: { id }
             }
         ]
     })*/
}


//获取医生信息
async  function getDecInfo(id){
    //全部的好处理看起来
    const result=await DocUser.findAndCountAll({
        attributes:['id','Name','Birth','Sex','Email','Pic'],
        where:id
    })
    let DecInfo=result.rows.map(row=>row.dataValues)
    //console.log(DecInfo);
    return  DecInfo
}

//医生预约排行榜
async  function getRecTopInfo(){
    const result= await Appoint.findAndCountAll({
        group: 'DocUserId',
        attributes: ['DocUserId',
            [Sequelize.fn('count', Sequelize.col('DocUserId')), 'count']],
        include:[ {
            model: DocUser,
            attributes: ['Name','Birth','Sex','Email','Pic','Profile','AppCount'],
        }]
    })

    let RecInfo=result.rows.map(row=>row.dataValues)

    console.log('RecInfo',RecInfo);

    return RecInfo
}

//添加预约
async function AddAptIndo(PatUserId,DocUserId,AppointReason,AppTime,AppDay,CreatTime){

    const result =await Appoint.create({
        PatUserId,
        DocUserId,
        AppointReason,
        AppTime,
        AppDay,
        CreatTime
    })
    //console.log('data',result.dataValues)
    return result.dataValues
}

//查找每天预约的
async  function FinAppInfo(day,id){
    const AppDay=day
    const DocUserId=id
    const  whereOpt={AppDay,DocUserId}
    const  result=await Appoint.findAndCountAll({
        attributes:['AppTime'],
        where:whereOpt
    })
    let Apptime=result.rows.map(row=>row.dataValues)
    return Apptime
}

//所有医生
async  function getTodayInfo(){
    const result= await  DocUser.findAndCountAll({
        attributes:['id','Name','Birth','Sex','Email','Pic','AppCount','AppFirstCount']
    })

    let Doc=result.rows.map(row=>row.dataValues)
    console.log(Doc);
    return Doc
}

//医生预约次数最少
async function getMinDocInfo(id){
    const result =await  DocUser.findAndCountAll({
        attributes:['id','Name', 'Birth', 'Sex', 'Email', 'Pic', 'Profile','AppCount','AppFirstCount'],
        order:
            [
                [Sequelize.fn('max', Sequelize.col('AppCount')), 'DESC']
            ]
    })

    let list=result.rows.map(row=>row.dataValues)
    console.log(list);
    return list
}

//更新医生预约信息
async  function updataDocAppCount(id){

    const result=await DocUser.update({
        AppCount:Sequelize.literal('AppCount+1'),
        //AppFirstCount:Sequelize.literal('AppFirstCount+1')
      },{
        where:{
            id:id
        }
    })
    console.log(result);
}

//更新医生预约信息
async  function updataDocAppFirstCount(id){
    const result=await DocUser.update({
        AppFirstCount:Sequelize.literal('AppFirstCount+1')
    },{
        where:{
            id:id
        }
    })
    console.log(result);
}


//添加患者主治医生
async  function updataPatDocId(patid,docid){
    console.log(patid, docid);
    const WhereData={
        id:patid,
    }
    const upData = {}
    upData.DocUserId=docid
    const result=await PatUser.update(upData,{where:WhereData})
    console.log('reqwrqw',result);
    return result[0] > 0

}

async  function getPatAppCountInfo(id){
    const result=await Appoint.count({
        where:{
            PatUserId:id
        }
    })
    console.log(result);
    return  result
}



async  function getPatDocInfo(id){
    const  result =await PatUser.findAndCountAll({
        where:[{
            id
        }],
        attributes:['DocUserId']
    })
    let list =result.rows.map(row=>row.dataValues)
   // console.log(list);
    return list
}
module.exports={
    getNewAppiont,
    getAllAppiont,
    getRecDocInfo,
    getDecInfo,
    getRecTopInfo,
    AddAptIndo,
    FinAppInfo,
    getTodayInfo,
    getMinDocInfo,
    updataDocAppCount,
    updataPatDocId,
    getPatAppCountInfo,
    getPatDocInfo,
    updataDocAppFirstCount
}