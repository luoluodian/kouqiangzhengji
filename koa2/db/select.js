const { PatUser , DocUser,Medical }=require('./modeul/index')


!(async  function () {
    /*const zhangsan =await DocUser.findOne({
        where:{
            Docname:'zhangsan'
        }
    })
    console.log('zhangsan',zhangsan.dataValues)*/
    //findOne查一条


    /*const zhangsanname=await  DocUser.findOne({
        attributes:['DocName'],//限制几列
        where:{
            id:'1'
        }
    })
    console.log('zhangsanname',zhangsanname.dataValues);*/


    //分页
    /*const bolist =await  DocUser.findAll({
        limit:2,//每页多少条
        offset:2,//跳过多少条
        order:[
            ['id','desc']
        ]
    })
    console.log('bolist',bolist.map(DocUser=>DocUser.dataValues))*/

    /*const allcount= await DocUser.findAndCountAll({
        limit:2,
        offset:0,
        order:[
            ['id','desc']
        ]
    })*/

    //连接查询1
   /* const allcount11= await DocUser.findAndCountAll({
       order:[
           ['id','desc']
       ],
        include:[
            {
                model:PatUser
            },
        ]
   })*/

    const result=await Medical.count({
        where: {PatUserId:'1'},
    })
    console.log(result);
})()