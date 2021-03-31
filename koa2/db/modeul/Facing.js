const Sequelize=require('sequelize')
const seq =require('../seq')


//牙套
const Facing =seq.define('Facing',{
    PatUserId:{
        type:Sequelize.INTEGER,
        allowNull:true,
        comment:'患者ID'
    },
    DocUserId:{
        type:Sequelize.INTEGER,
        allowNull:true,
        comment:'医生ID'
    },
    PatFacing:{
        type:Sequelize.STRING,
        allowNull:true,
        comment:'obj文件'
    },
    ObjCreatedTime:{
        type:Sequelize.DATE,
        allowNull:false,
        comment:'创建时间'
    },
    ObjCount:{
        type:Sequelize.INTEGER,
        allowNull:false,
        comment:'创建次序'
    }
},{
    charset: 'utf8',
    collate: 'utf8_general_ci'
})


module.exports=Facing
