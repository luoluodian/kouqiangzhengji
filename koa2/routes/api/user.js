//用户注册
const router =require('koa-router')()
const {isExist,userlogin,saveFile,register}=require('../../controller/user')
const koaFrom = require('formidable-upload-koa')
const svgCaptcha=require('svg-captcha')
const md5 = require('md5');
router.prefix('/api/user')

//注册
router.post('/register',async (ctx,next)=>{
    console.log(ctx.request.body);

    const{UserName,UserEmail,UserSex,UseBirth,UserPassword}=ctx.request.body
    const data=await register(UserName,UserEmail,UserSex,UseBirth,md5(UserPassword))
    ctx.body=data
})

//用户名是否存在
router.post('/isExist',async (ctx,next)=>{
    const {email}=ctx.request.body
    console.log(email);
    console.log(await isExist(email));
    ctx.body=await isExist(email)
})

//用户登录
router.post('/dologin',async  (ctx,next)=>{
    const { email, pasd,type,code} = ctx.request.body
    console.log(ctx.request.body);
    const data=await userlogin(ctx,email,md5(pasd),type,code)
    console.log(data);
    ctx.body =data
})


//接收图片
router.post('/uploadImg',koaFrom(),async (ctx,next)=>{
    const file = ctx.req.files['file']
    console.log('1');
   if (!file) {
        return
    }
    console.log(file.name);
    const { size, path, name, type } = file
    const aaa= await saveFile({
        name,
        type,
        size,
        filePath:path
    })
    console.log(aaa);
    ctx.body=aaa
})


router.post('/11',async  (ctx,next)=>{
    console.log(ctx.request.body)
    const name=ctx.request.body
    console.log(name);
    const qq='111'
    ctx.body=qq
})


//验证码
router.get('/code', async (ctx) => {
    // 生成验证码
    // 生成加法形式的验证码
     const captcha = svgCaptcha.createMathExpr({
         fontSize:50,
         width:120,
         height:34,
         background:'#cc9966'
     });
    // 保存生成的验证码结果
    ctx.session.code = captcha.text
    // 设置响应头
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data;
});

module.exports=router