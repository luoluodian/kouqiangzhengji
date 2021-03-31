const router=require('koa-router')()
const {getPat}=require('../../controller/Medcreated')
const {getMed}=require('../../controller/getmedlook')
router.prefix('/api/medLook')

// 退出登录
router.post('/userInfo',async (ctx,next)=>{
    //接收数据
    const {_email}=await ctx.request.body
    //console.log(_email)
    const result=await getPat(_email)
    //console.log(result);
    //console.log('患者信息：',result);
    ctx.body={
        result
    }
})

//创建查找信息
router.post('/findMed', async (ctx,next)=>{
    const {_id}=await ctx.request.body
    console.log('传入数据',_id)
    //ctx.session.userInfo.PatId=_id
    //ctx.session.userInfo.Email=_email
    const result=await getMed(_id)
    console.log(result);
    ctx.body={
        result
    }
})
module.exports=router