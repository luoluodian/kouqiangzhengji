const {DocUser}=require('./modeul/modul')

!(async function () {
    const  updateRes=await DocUser.update({
        DocName:''
    },{
        where:{
            DocName: 'zhangsan'
        }
    })
    console.log('updateRes',updateRes[0]>0)
})()