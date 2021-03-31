const Sequelize=require('sequelize')
const seq =require('../seq')


//预约
const Appoint =seq.define('Appoint',{
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
    AppointReason:{
        type:Sequelize.TEXT,
        allowNull:false,
        comment:'预约原因'
    },
    AppTime:{
        type:Sequelize.TEXT,
        allowNull:false,
        comment:'预约时间'
    },
    AppDay:{
        type:Sequelize.TEXT,
        allowNull:false,
        comment:'预约天数'
    },
    CreatTime:{
        type:Sequelize.DATE,
        allowNull:false,
        comment:'预约创建时间'
    }

},{
    charset: 'utf8',
    collate: 'utf8_general_ci'
})

module.exports=Appoint
