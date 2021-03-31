const router =require('koa-router')()
const {update,updateuserInfo,findpasd,updatepsdInfo}=require('../../controller/Patindex')
const {logout}=require('../../controller/user')

const { loginCheck } = require('../../controller/LoginCheck')
router.prefix('/api/Patindex')

function getUserInfo(ctx) {
    console.log(ctx.session.userInfo)
}

/*
router.get('/',async  (ctx,next)=>{
    getUserInfo(ctx)
})
*/

//更改密码
router.post('/updataPsd',loginCheck,async  (ctx,next)=>{
    console.log(ctx.request.body);
    const {pasd}=ctx.request.body
    const id=ctx.session.userInfo.id
    console.log('api',id,pasd)
    const result= await updatepsdInfo(id,pasd)
    console.log(result)
    ctx.body={
        result
    }
})


//查找密码
router.post('/findPsd',loginCheck,async  (ctx,next)=>{
    console.log(ctx.request.body);
    const {input1}=ctx.request.body
    const id=ctx.session.userInfo.id
    console.log('查找密码',input1,id)
    const result=await findpasd(id,input1)
    //console.log(result);
    ctx.body={
        result
    }
})

// 退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
    ctx.body = await logout(ctx)
})



module.exports=router