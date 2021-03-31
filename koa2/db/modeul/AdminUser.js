const Sequelize=require('sequelize')
const seq =require('../seq')


//管理员
const AdminUser = seq.define('AdminUser',{
    // id 会自动创建链接  主键 自增
    AdminName:{
        type:Sequelize.STRING,//varchar(255)
        allowNull:false,
        comment :'管理员ID'
    },
    AdminPasd:{
        type:Sequelize.STRING,
        allowNull:false,
        comment:'管理员密码'
    },
    AdminEmail:{
        type:Sequelize.STRING,
        allowNull:false,
        comment:'管理员邮箱'
    },
    AdminPic:{
        type:Sequelize.STRING,
        allowNull:true,
        comment:'管理员头像'
    },

},{
    charset: 'utf8',
    collate: 'utf8_general_ci'
})//自动创建


module.exports=AdminUser
