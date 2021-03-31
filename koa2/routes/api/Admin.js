//用户注册
const router =require('koa-router')()
const {isExist,saveFile,register}=require('../../controller/admin')
const koaFrom = require('formidable-upload-koa')
const md5=require('md5')
router.prefix('/api/Admin')

//注册
router.post('/register',async (ctx,next)=>{
    console.log(ctx.request.body);
    const{UserName,UserEmail,UserSex,UseBirth,UserPassword,inputuserPro}=ctx.request.body
    const data=await register(UserName,UserEmail,UserSex,UseBirth,md5(UserPassword),inputuserPro)
    ctx.body=data
})

//用户名是否存在
router.post('/isExist',async (ctx,next)=>{
    const {email}=ctx.request.body
    console.log(email);
    console.log(await isExist(email));
    ctx.body=await isExist(email)
})


//上传头像
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


module.exports=router