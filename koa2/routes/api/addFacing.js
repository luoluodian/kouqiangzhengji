const router=require('koa-router')()
const {getPat}=require('../../controller/Medcreated')
const {savefacingobjFile}=require('../../controller/facing')
const koaFrom = require('formidable-upload-koa')
router.prefix('/api/addFacing')

// 退出登录
router.post('/userInfo',async (ctx,next)=>{
    //接收数据
    const {_email}=await ctx.request.body
    console.log(_email)
    const result=await getPat(_email)
    console.log(result);
    console.log('患者信息：',result);
    ctx.body={
        result
    }
})

//创建查找信息
router.post('/addfacing',async (ctx,next)=>{
    const {_id,_email}=await ctx.request.body
    console.log('传入数据',_id)
    ctx.session.userInfo.PatId=_id
    ctx.session.userInfo.Email=_email
    if(_id.length!=0){
        ctx.body={

        }
    }
})


//上传图片
router.post('/addfacingobj',koaFrom(),async (ctx,next)=>{
    const file = ctx.req.files['file']
    if (!file) {
        return
    }
    const id=ctx.session.userInfo.PatId
    const email=ctx.session.userInfo.Email
    const docid=ctx.session.userInfo.id
    console.log(id);
    console.log(email)
    const { size, path, name, type} = file
    const resule= await savefacingobjFile({
        name,
        type,
        size,
        email,
        id,
        docid,
        filePath:path
    })
    console.log(resule);
    ctx.body={
        resule
    }
})

module.exports=router