const AdminUser=require('./AdminUser')
const Appoint=require('./Appoint')
const Chat=require('./Chat')
const Facing=require('./Facing')
const Medical=require('./Medical')
const PatUser=require('./PatUser')
const DocUser=require('./DocUser')
const MedImg=require('./MedImg')
const MedObj=require('./MedObj')
const ChatImg=require('./ChatImg')

PatUser.belongsTo(DocUser,{
    foreignKey:'DocUserId'
})//创建外键  患者的主治医生

DocUser.hasMany(PatUser,{
    foreignKey:'DocUserId'
})//创建外键  患者的主治医生


//聊天记录的外键是PatUserID
Chat.belongsTo(PatUser,{
    foreignKey:'PatUserId'
})
PatUser.hasMany(Chat,{
    foreignKey:'PatUserId'
})

//聊天记录的外键是DouUserID
Chat.belongsTo(DocUser,{
    foreignKey:'DocUserId'
})
DocUser.hasMany(Chat,{
    foreignKey:'DocUserId'
})

//预约记录的外键是
Appoint.belongsTo(PatUser,{
    foreignKey:'PatUserId'
})
PatUser.hasMany(Appoint,{
    foreignKey:'PatUserId'
})


Appoint.belongsTo(DocUser,{
    foreignKey:'DocUserId'
})
DocUser.hasMany(Appoint,{
    foreignKey:'DocUserId'
})


//牙套的外键是
Facing.belongsTo(PatUser,{
    foreignKey:'PatUserId'
})
PatUser.hasMany(Facing,{
    foreignKey:'PatUserId'
})

Facing.belongsTo(DocUser,{
    foreignKey:'DocUserId'
})
DocUser.hasMany(Facing,{
    foreignKey:'DocUserId'
})


//病历的外键
Medical.belongsTo(PatUser,{
    foreignKey:'PatUserId'
})
PatUser.hasMany(Medical,{
    foreignKey:'PatUserId'
})

Medical.belongsTo(DocUser,{
    foreignKey:'DocUserId'
})
DocUser.hasMany(Medical,{
    foreignKey:'DocUserId'
})


//病例图片外键
MedImg.belongsTo(Medical,{
    foreignKey:'MedID'
})
Medical.hasMany(MedImg,{
    foreignKey:'MedID'
})


//病历模型外键
MedObj.belongsTo(Medical,{
    foreignKey:'MedID'
})
Medical.hasMany(MedObj,{
    foreignKey:'MedID'
})

MedObj.belongsTo(PatUser,{
    foreignKey:'MedPatUserID'
})
PatUser.hasMany(MedObj,{
    foreignKey:'MedPatUserID'
})

ChatImg.belongsTo(Chat,{
    foreignKey:'ChatId'
})
Chat.hasMany(ChatImg,{
    foreignKey:'ChatId'
})


module.exports={
    Appoint,
    AdminUser,
    Chat,
    DocUser,
    Facing,
    PatUser,
    Medical,
    MedObj,
    MedImg,
    ChatImg
}