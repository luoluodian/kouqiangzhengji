const Sequelize=require('sequelize')
const seq =require('../seq')


//创建病历
const ChatImg =seq.define('ChatImg',{
    ChatPic:{
        type:Sequelize.TEXT,
        allowNull:false,
        comment:'聊天图片'
    },
    ChatId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        comment:'聊天id'
    }
},{
    charset: 'utf8',
    collate: 'utf8_general_ci'
})
module.exports=ChatImg
