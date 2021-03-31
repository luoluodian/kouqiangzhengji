const {DocUser}=require('./modeul/modul')

!(async function () {
    const  updateRes=await DocUser.destroy({
        where:{
            Id:'1'
        }
    })
    console.log('updateRes',updateRes[0]>0)
})()