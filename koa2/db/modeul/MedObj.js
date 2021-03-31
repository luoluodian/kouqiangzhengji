const Sequelize=require('sequelize')
const seq =require('../seq')

//创建病历
const MedObj =seq.define('MedObj',{
    MedPatUserID:{
      type:Sequelize.INTEGER,
      allowNull:false,
      comment:'用户Id'
    },
    MedID:{
        type:Sequelize.INTEGER,
        allowNull:false,
        comment:'病历ID'
    },
    MedObjData:{
        type:Sequelize.TEXT,
        allowNull:false,
        comment:'病历模型'
    },
    MedObjCreatedTime:{
        type:Sequelize.DATE,
        allowNull:false,
        comment:'创建时间'
    },
    MedObjCount:{
        type:Sequelize.INTEGER,
        allowNull:false,
        comment:'创建次序'
    }
},{
    charset: 'utf8',
    collate: 'utf8_general_ci'
})


module.exports=MedObj
