const Sequelize=require('sequelize')
const seq =require('../seq')


//聊天
const Chat =seq.define('Chat',{
    PatUserId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        comment:'患者ID'
    },

    DocUserId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        comment:'医生ID'
    },

    Content:{
        type:Sequelize.TEXT,
        allowNull:false,
        comment:'聊天内容'
    },
    Createdtime:{
        type:Sequelize.DATE,
        allowNull:true,
        comment:'创建时间'
    },
    fankuitime:{
        type:Sequelize.DATE,
        allowNull:true,
        comment:'反馈时间'
    },
    fankuineirong:{
        type:Sequelize.TEXT,
        allowNull:true,
        comment:'聊天内容'
    },
    Patlook:{
        type:Sequelize.TEXT,
        allowNull:false,
        comment:'患者是否查看'
    },
    Doclook:{
    type:Sequelize.TEXT,
        allowNull:false,
        comment:'医生是否查看'
    },
    Chatcount:{
        type:Sequelize.INTEGER,
        allowNull:false,
        comment:'对话次数'
    }
},{
    charset: 'utf8',
    collate: 'utf8_general_ci'
})

module.exports= Chat
