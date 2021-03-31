const Sequelize=require('sequelize')
const seq =require('../seq')


//创建病历
const Medical =seq.define('Medical',{
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
    PatAge:{
        type:Sequelize.INTEGER,
        allowNull:false,
        comment:'患者年龄'
    },
    Medic:{
        type:Sequelize.TEXT,
        allowNull:false,
        comment:'病历内容'
    },
    MedCreatedTime:{
        type:Sequelize.DATE,
        allowNull:false,
        comment:'创建时间'
    },
    MedCount:{
        type:Sequelize.INTEGER,
        allowNull:false,
        comment:'这个患者的第几次'
    }
},{
    charset: 'utf8',
    collate: 'utf8_general_ci'
})


module.exports=Medical
