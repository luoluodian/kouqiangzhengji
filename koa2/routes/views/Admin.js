const router = require('koa-router')()

router.get('/admin',async (ctx,next)=>{
    await ctx.render('Admin/admin')
})

router.get('/addappiont',async (ctx,next)=>{
    await ctx.render('Admin/addappiont')
})

router.get('/webgl',async (ctx,next)=>{
    await ctx.render('Admin/webgl')
})


module.exports=router