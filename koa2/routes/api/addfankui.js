const router=require('koa-router')()
const {getPat}=require('../../controller/Medcreated')
const   {findDoc,addfankui,saveChatImg,findfankui,findcount,addhuifu}=require('../../controller/fankui')
const koaFrom = require('formidable-upload-koa')
router.prefix('/api/addfankui')

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

//查找医生信息
router.post('/finddoc',async (ctx,next)=>{
    const {_Docid}=await ctx.request.body
    console.log('传入数据',_Docid)
   // ctx.session.userInfo.PatId=_id
    //ctx.session.userInfo.Email=_email
    const list=await findDoc(_Docid)
    console.log(list)
    ctx.body={
        list
    }
})

//上传反馈信息
router.post('/addfankui',async (ctx,next)=>{
    const patid=ctx.session.userInfo.id
    const{docid,_medpro}=ctx.request.body
    const list=await addfankui(patid,docid,_medpro)
//    console.log(list);
    ctx.body={
        list
    }
})

//上传图片
router.post('/addChatPic',koaFrom(),async (ctx,next)=>{
    const file = ctx.req.files['file']
    if (!file) {
        return
    }
    const email=ctx.session.userInfo.Email
    const pat=ctx.session.userInfo.id
    console.log(pat);
    const {  path, name,} = file
    const resule= await saveChatImg({
        name,
        email,
        pat,
        filePath:path
    })
    console.log(resule);
    ctx.body={
        resule
    }
})

//查看反馈信息
router.post('/lookfankui',async  (ctx,next)=>{
    const{fankuicount}=ctx.request.body
    const patid=ctx.session.userInfo.id
    const result= await findfankui(patid,fankuicount)
    console.log(findfankui);

    ctx.body={
        result
    }
})

//医生获取反馈患者
router.post('/patfankuicount',async (ctx,next)=>{
    const{_pat}=ctx.request.body
    console.log(_pat);
    const result=await findcount(_pat)
    console.log(result);
    ctx.body={
        result,

    }
})
//查找反馈信息
router.post('/doclookfankui',async  (ctx,next)=>{
    const{_pat, v}=ctx.request.body
    const result= await findfankui(_pat,v)
    console.log(result);
    result.push(ctx.session.userInfo.Email)
    ctx.body={
        result
    }
})

router.post('/huifu',async  (ctx,next)=>{
    const{fankuiID, huifupro}=ctx.request.body

    const result= await addhuifu(fankuiID, huifupro)
    console.log(result);
    ctx.body={
        result
    }
})


module.exports=router