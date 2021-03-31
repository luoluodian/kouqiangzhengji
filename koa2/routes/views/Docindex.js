const router = require('koa-router')()
const {loginRedirect}=require('../../controller/LoginCheck')
const {getTodayPat,getPatList,getAllPat} =require('../../controller/PatList')
const {getToday,getNewApp,getAppList,getNewApp1} =require('../../controller/Docindex')
const {getpatid,getNew}=require('../../controller/fankui')

//首页信息
function getLoginInfo(ctx){
    let data = {}
    const date =new Date()
    const Nowyears=date.getFullYear()
    const Biryears=ctx.session.userInfo.Birth.getFullYear()
    const userInfo = ctx.session.userInfo
    const pic=ctx.session.userInfo.Pic
    const _id=ctx.session.userInfo.id
    const sex='男'
    if(ctx.session.userInfo.Sex==false) {sex:'女'}
    if (userInfo) {
        data = {
            userId:_id,
            userName: userInfo.Name,
            age:Nowyears-Biryears,
            email:userInfo.Email,
            userSex:sex,
            userPic:pic
        }
    }
    console.log(data);
    return data
}

//首页
router.get('/DocUserindex', loginRedirect,async (ctx, next) => {
    const datainfo=getLoginInfo(ctx)
    const _id=ctx.session.userInfo.id
    //今天的预约
    const _today=await getToday(_id)
    console.log('_today',_today);
    //最新消息
    //最新反馈消息
    const _new=await getNew(_id)
    console.log('weqeq',_new);
    //最新预约消息
    const _newApp=await getNewApp1(_id)
    console.log('weqeq1',_newApp);
    await ctx.render('Doctor/index',{
        data:datainfo,
        today:_today,
        News:_new,
        NewsApp:_newApp
    })
})

//我的预约界面
router.get('/DocUserApp',loginRedirect,async (ctx,next)=>{
    const datainfo=getLoginInfo(ctx)

    const _docEmail=ctx.session.userInfo.email
    const _docId=ctx.session.userInfo.id
    console.log('医生ID',_docId);

    //最新预约
    const NewApp=await getNewApp(_docId)
    console.log('最新预约：',NewApp);

    //预约记录
    const AppList=await getAppList(_docId)
    console.log('预约记录',AppList);

    await  ctx.render('Doctor/appoint',{
        appdata:NewApp,
        data:datainfo,
        appList:AppList
    })
})

//患者列表界面
router.get('/Patlist',loginRedirect,async (ctx,next)=>{
    const datainfo=getLoginInfo(ctx)
    const _docId=ctx.session.userInfo.id
    //渲染今日预约患者
    const _today=await getTodayPat(_docId)
    console.log('今天的患者',_today)
    //渲染我为主治医生的患者
    const _patlist=await getPatList(_docId)
    console.log('我的患者',_patlist)
    //渲染所有的患者
    const _allpat=await getAllPat()
    console.log('所有患者',_allpat)
    await  ctx.render('Doctor/Patlist',{
        data:datainfo,
        today:_today,
        patlist:_patlist,
        allpat:_allpat
    })
})


//病例查看界面
//疗程查看
//创建病历
router.get('/addmedical', loginRedirect,async (ctx,next)=>{
    const datainfo=getLoginInfo(ctx)
    const _docId=ctx.session.userInfo.id
    //今天的患者
    const _today=await getTodayPat(_docId)
    console.log('今天的患者',_today)
    await ctx.render('Doctor/Medical record',{
        data:datainfo,
        today:_today
    })
})

//矫正器查看
router.get('/faclook', loginRedirect,async (ctx,next)=>{
    const datainfo=getLoginInfo(ctx)
    const _docId=ctx.session.userInfo.id
    //今天的患者
    const _today=await getTodayPat(_docId)
    console.log('今天的患者',_today)
    await ctx.render('Doctor/faclook',{
        data:datainfo,
        today:_today
    })
})

//添加牙套
router.get('/addfacing',loginRedirect,async  (ctx,next)=>{
    const datainfo=getLoginInfo(ctx)
    const _docId=ctx.session.userInfo.id
    //今天的患者
    const _today=await getTodayPat(_docId)
    await ctx.render('Doctor/addfacing',{
        data:datainfo,
        today:_today
    })
})


//病例查看
router.get('/Medlook', loginRedirect,async (ctx,next)=>{
    const datainfo=getLoginInfo(ctx)
    const _docId=ctx.session.userInfo.id
    //今天的患者
    const _today=await getTodayPat(_docId)
    console.log('今天的患者',_today)
    await ctx.render('Doctor/medlook',{
        data:datainfo,
        today:_today
    })
})

//反馈查看
router.get('/fankuilook', loginRedirect,async (ctx,next)=>{
    const datainfo=getLoginInfo(ctx)
    const _docId=ctx.session.userInfo.id
    //我的患者
    const _fankuipat=await getpatid(_docId)
    console.log('今天的患者',_fankuipat)
    await ctx.render('Doctor/fankuilook',{
        data:datainfo,
        fankuipat:_fankuipat
    })
})
module.exports = router
