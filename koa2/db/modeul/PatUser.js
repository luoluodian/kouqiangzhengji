const Sequelize=require('sequelize')
const seq =require('../seq')


//患者
const PatUser=seq.define('PatUser',{
    Name:{
        type:Sequelize.STRING,
        allowNull:false,
        comment:'患者用户名'
    },
    Pasd:{
        type:Sequelize.STRING,
        allowNull:false,
        comment:'患者密码'
    },
    Birth:{
        type:Sequelize.DATE,
        allowNull:false,
        comment: '患者生日'
    },
    Sex:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        comment:'患者性别'
    },
    Email:{
        type:Sequelize.STRING,
        allowNull:false,
        comment:'患者邮箱'
    },
    DocUserId:{
        type:Sequelize.INTEGER,
        allowNull:true,
        comment:'患者主治医生'
    },
    Pic:{
        type:Sequelize.STRING,
        allowNull:true,
        comment:'头像'
    },
},{
    charset: 'utf8',
    collate: 'utf8_general_ci'
})


module.exports=PatUser