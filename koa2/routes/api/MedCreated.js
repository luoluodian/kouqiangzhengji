const router=require('koa-router')()
const {getPat,saveMedFile,AddMed,saveMedobjFile}=require('../../controller/Medcreated')
const koaFrom = require('formidable-upload-koa')
router.prefix('/api/MedCreated')

// 退出登录
router.post('/userInfo',async (ctx,next)=>{
    //接收数据
    const {_email}=await ctx.request.body
    console.log(_email)

    const result=await getPat(_email)
    const _Patid=result.id
    const email=result.Email
    ctx.session.userInfo.PatId=_Patid
    ctx.session.userInfo.Email=email
    console.log(result);
    console.log('患者信息：',result);
    ctx.body={
        result
    }
})

//创建病历
router.post('/addMed',async (ctx,next)=>{
    const {_id,_medpro,_age,_email}=await ctx.request.body
    console.log('传入数据',_id,_medpro,_age)
    const _docId=ctx.session.userInfo.id
    const result=await AddMed(_id,_medpro,_age,_docId)
    ctx.session.userInfo.PatId=_id
    ctx.session.userInfo.Email=_email
    console.log(result);
    ctx.body={
        result
    }
})


//上传图片
router.post('/addMedImg',koaFrom(),async (ctx,next)=>{
    const file = ctx.req.files['file']
    if (!file) {
        return
    }

    const id=ctx.session.userInfo.PatId
    const email=ctx.session.userInfo.Email
    console.log(id);
    console.log(email)
    const { size, path, name, type} = file
    const resule= await saveMedFile({
        name,
        type,
        size,
        email,
        id,
        filePath:path
    })
    console.log(resule);
    ctx.body={
        resule
    }
})

//添加obj文件
router.post('/addMedObj',koaFrom(),async (ctx,next)=>{
    const file = ctx.req.files['file']
    if (!file) {
        return
    }
    const id=ctx.session.userInfo.PatId
    const email=ctx.session.userInfo.Email
    console.log(id);
    console.log(email)
    const { size, path, name, type} = file
    const resule= await saveMedobjFile({
        name,
        type,
        size,
        email,
        id,
        filePath:path
    })
    console.log(resule);
    ctx.body={
        resule
    }
})

module.exports=router