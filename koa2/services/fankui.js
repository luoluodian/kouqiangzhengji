const { DocUser,PatUser,Chat,ChatImg,Facing } =require('../db/modeul/index')
const Sequelize=require('sequelize')



//添加obj文件
async  function AddChatImg(ChatPic,ChatId){
    const result=ChatImg.create({
        ChatPic,
        ChatId
    })
    //console.log(result);
    return result
}


//查找医生
async function finddocInfo(id){
    const  result =await DocUser.findAndCountAll({
        where:{id},
        attributes:['id','Name','Email',]
    })
    let list=result.rows.map(row=>row.dataValues)
    //console.log(list);
    return list
}

//添加反馈信息
async function addfankuiinfo(PatUserId,DocUserId,Content,Createdtime,Chatcount,Patlook,Doclook){
    const result =await Chat.create({
        PatUserId,
        DocUserId,
        Content,
        Createdtime,
        Chatcount,
        Patlook,
        Doclook
    })
    console.log(result);
    return result
}

//查找chatid
async function findChatId(PatUserId){
    console.log(PatUserId);
    const result=await Chat.count({
        where:{
            PatUserId
        }
    })
    console.log(result);
    return  result
}


//查看反馈条数
async function findchatcount(PatUserId){
    const result =await Chat.count({
        where:{PatUserId:PatUserId}
    })
    //console.log(result);
    //let list=result.rows.map(row=>row.dataValues)
    return  result
}

//查看反馈条数
async  function findchatcount1(id){
    const result =await Chat.findAndCountAll({
        where:{PatUserId:id},
        attributes:['Chatcount']
    })
    //console.log(result);
    let list=result.rows.map(row=>row.dataValues)
    return  list
}

async  function findfankuiInfo(patid,fankuicount){
    const result=await Chat.findAndCountAll({
        where:{PatUserId:patid,
            Chatcount:fankuicount },
        attributes:['id','Createdtime','content','fankuitime','fankuineirong'],
        include:[
            {
                model:PatUser,
                attributes:['Name']
            },{
                model:DocUser,
                attributes:['Name','Email']
            },
            {
                model:ChatImg,
                attributes:['ChatPic']
            }]
    })
    console.log(result);

    let list=result.rows.map(row=>row.dataValues)
    console.log(list);
    return list

}

async function getpatidinfo(id){
    const result =await Chat.findAndCountAll({
        attributes:['PatUserId'],
        where:{
            DocUserId:id
        },
        include:[
            {
                model:PatUser,
                attributes:['Name']
            }
        ],
        order:Sequelize.col('Createdtime')
    })
    let list =result.rows.map(row=>row.dataValues)
    //console.log(result);
    //console.log(list);
    return list
}

async  function findcountInfo(id){
    const result=await Chat.count({
        where:{
            PatUserId:id
        }
    })
    console.log(result);
    return  result
}

async function addhuifuInfo(fankuiId,fankuiPro,time){
    const result=Chat.update({
        fankuitime: time,
        fankuineirong: fankuiPro,
        Doclook: '1',
        Patlook: '0'
    },{
        where:{
            id:fankuiId
        }
    })
    console.log(result);
    return result
}

//最新消息查询，排序为倒序
async  function getNewsInfo(id){
    const result= await Chat.findAndCountAll({
        order: Sequelize.col('fankuitime'),
        attributes:['fankuineirong','fankuitime'],
        where:{
            PatUserId:id,
            Patlook:'0'
        },
        include:[
            {
                model:DocUser,
                attributes:['Name','Pic','Email']
            }
        ],
    })
    console.log(result);
    let list =result.rows.map(row=>row.dataValues)
    console.log('最新反馈',list);
    return  list
}


async  function getNewInfo(id){
    const result= await Chat.findAndCountAll({
        order:  [['Createdtime', 'DESC']],
        attributes:['Content','Createdtime'],
        where:{
            DocUserId:id,
            Doclook:'0'
        },
        include:[
            {
                model:PatUser,
                attributes:['Name','Pic','Email']
            }
        ],
    })
    console.log(result);
    let list =result.rows.map(row=>row.dataValues)
    console.log('最新反馈',list);
    return  list
}

module.exports={
    finddocInfo,
    addfankuiinfo,
    findChatId,
    AddChatImg,
    findchatcount,
    findchatcount1,
    findfankuiInfo,
    getpatidinfo,
    findcountInfo,
    addhuifuInfo,
    getNewsInfo,
    getNewInfo
}
