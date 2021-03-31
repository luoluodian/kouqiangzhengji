const Sequelize=require('sequelize')
const seq =require('../seq')


//医生
const DocUser=seq.define('DocUser',{
    Name:{
        type:Sequelize.STRING,
        allowNull:false,
        comment:'医生用户名'
    },
    Pasd:{
        type:Sequelize.STRING,
        allowNull:false,
        comment:'医生密码'
    },
    Birth:{
        type:Sequelize.DATE,
        allowNull:false,
        comment: '医生生日'
    },
    Sex:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        comment:'医生性别'
    },
    Profile:{
        type:Sequelize.STRING,
        allowNull:false,
        comment:'个人简介'
    },
    Email:{
        type:Sequelize.STRING,
        allowNull:false,
        comment:'医生邮箱'
    },
    Pic:{
        type:Sequelize.STRING,
        allowNull:true,
        comment:'头像'
    },
    AppCount:{
        type:Sequelize.INTEGER,
        allowNull:true,
        defaultValue:0,
        comment:'预约次数'
    },
    AppFirstCount:{
        type:Sequelize.INTEGER,
        allowNull:true,
        defaultValue:0,
        comment:'初诊次数'
    },
},{
    charset: 'utf8',
        collate: 'utf8_general_ci'
})

module.exports= DocUser
