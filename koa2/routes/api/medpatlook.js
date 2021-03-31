const router=require('koa-router')()
const {getpatMed}=require('../../controller/getpatmedlook')
router.prefix('/api/medpatlook')


//创建查找信息
router.post('/findpatmed', async (ctx,next)=>{
    const {_medid}=await ctx.request.body
    console.log('传入数据',_medid)
    const patid=ctx.session.userInfo.id
    console.log(patid);
    const result=await getpatMed(_medid,patid)
    console.log(result);
    ctx.body={
        result
    }
})
module.exports=router