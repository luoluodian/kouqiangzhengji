const router = require('koa-router')()
const {login}=require('../../controller/11')
//const {Secret}=require('./conf/constants')

router.get('/session-test',async  function (ctx,next) {
  ctx.session.userinfo='张三'
  if(ctx.session.viewCount ==null){
    ctx.session.viewCount=0
  }
  ctx.session.viewCount++
  ctx.body={
    error:0,
    viewCount:ctx.session.viewCount,
  }
  console.log(ctx.session.userinfo);
})


//获取登录信息
function getLoginInfo(ctx){
  let data = {
    isLogin: false // 默认未登录
  }
  const userInfo = ctx.session.userInfo
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.Name,
      userType:userInfo.Type
    }
  }
  console.log(data);
  return data
}

router.get('/',async  (ctx,next)=>{
  await ctx.render('login', getLoginInfo(ctx))
})

//登录界面
router.get('/login',async  (ctx,next)=>{
  await ctx.render('login', getLoginInfo(ctx))
})


//注册界面
router.get('/register',async  (ctx,next)=> {
  await ctx.render('register')
})


//获取用户信息


module.exports = router
