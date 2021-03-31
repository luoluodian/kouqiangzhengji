const router=require('koa-router')()
const {getPat}=require('../../controller/Medcreated')
const {getFac}=require('../../controller/getfaclook')
const {getFacinfo}=require('../../controller/facing')
router.prefix('/api/faclook')

// 退出登录
router.post('/userInfo',async (ctx,next)=>{
    //接收数据
    const {_email}=await ctx.request.body
    const result=await getPat(_email)
    ctx.body={
        result
    }
})


//创建查找信息
router.post('/findfac', async (ctx,next)=>{
    const {_id}=await ctx.request.body
    console.log('传入数据',_id)
    const result=await getFac(_id)
    console.log(result);
    ctx.body={
        result
    }
})

//查找
router.post('/findfacinfo', async (ctx,next)=>{
    const userid=ctx.session.userInfo.id
    const {_medid}=await ctx.request.body
    console.log('传入数据',_medid)
    const result=await getFacinfo(userid,_medid)
    console.log(result);
    ctx.body={
        result
    }
})

module.exports=router