const Sequelize=require('sequelize')
const seq =require('../seq')


//创建病历
const MedImg =seq.define('MedImg',{
    MedID:{
        type:Sequelize.INTEGER,
        allowNull:false,
        comment:'病历ID'
    },
    MedPic:{
        type:Sequelize.TEXT,
        allowNull:false,
        comment:'病例图片'
    },
    MedCreatedTime:{
        type:Sequelize.DATE,
        allowNull:false,
        comment:'创建时间'
    }
},{
    charset: 'utf8',
    collate: 'utf8_general_ci'
})


module.exports=MedImg
