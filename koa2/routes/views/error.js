const router=require('koa-router')();
//err
router.get('/error',async (ctx,next)=>{
    await ctx.render('error')
})
//

router.get('*',async (ctx,next)=>{
  await ctx.render('404')
})

module.exports=router