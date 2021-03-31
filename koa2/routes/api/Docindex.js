const router=require('koa-router')()
router.prefix('/api/Docindex')
const {logout}=require('../../controller/user')
const { loginCheck } = require('../../controller/LoginCheck')

// 退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
    ctx.body = await logout(ctx)
})

module.exports=router