const router = require('koa-router')()
const {loginRedirect}=require('../../controller/LoginCheck')
const {getAppint,getAllAppint,getRecDoc,getRecTop,getAppDate,
    getTodayApp,getPatAppCount} =require('../../controller/PatAppints')
const {patmedlook,patfaclook,finddoc,getPatMedCount}=require('../../controller/getpatmedlook')
const {patfankuicount,getNews}=require('../../controller/fankui')


//首页
function getLoginInfo(ctx){
    let data = {}
    const date =new Date()
    const Nowyears=date.getFullYear()
    const Biryears=ctx.session.userInfo.Birth.getFullYear()
    const userInfo = ctx.session.userInfo
    const sex='男'
    if(ctx.session.userInfo.Sex==true) {sex:'女'}
    if (userInfo) {
        data = {
            userName: userInfo.Name,
            age:Nowyears-Biryears,
            email:userInfo.Email,
            image:userInfo.Pic,
            userSex:sex,
            id:userInfo.id
        }
    }
    console.log(data);
    return data
}

router.get('/', loginRedirect,async (ctx, next) => {
  await ctx.render('/login',getLoginInfo(ctx))
})


//主页
router.get('/PatUserindex',loginRedirect, async (ctx, next) => {
    const datainfo=getLoginInfo(ctx)
    console.log(datainfo);
    const id=ctx.session.userInfo.id
    //预约次数
    const _AppCount=await  getPatAppCount(id)
    //病历次数
    const _MedCount=await getPatMedCount(id)
    //console.log(_MedCount);
    //console.log(_AppCount);
    //最新反馈消息
    const _News=await getNews(id)

    //最新预约消息
    const _NewApp=await getAppint(id)
    console.log('1111',_NewApp);
    await ctx.render('Patient/index',{
            data:datainfo,
            AppCount:_AppCount,
            MedCount:_MedCount,
            News:_News,
            NewsApp:_NewApp
         })
})

//查看预约界面
router.get('/appoint', loginRedirect,async (ctx, next) => {
    const id=ctx.session.userInfo.id
    const userapp= await getAppint(id);

    const applist=await getAllAppint(id);
     console.log('1111',userapp);
  // console.log(applist);
    const datainfo=getLoginInfo(ctx)
   // console.log(datainfo);
    await ctx.render('Patient/appoint',{
        UserApp:userapp,
        AppList:applist,
        data:datainfo,
    })
})

//创建预约界面
router.get('/appointdoc', loginRedirect,async (ctx, next) => {

    const id=ctx.session.userInfo.id
    //推荐医生
    const recDoc=await getRecDoc(id)

 //  console.log('111',recDoc);
   // console.log(recDoc.Email);
    //预约排行榜
    const recTop=await  getRecTop()
   // console.log('recTop',recTop);
    const datainfo=getLoginInfo(ctx)
  //  console.log(datainfo);
    //得到时间
    const getDate=await getAppDate()
  //  console.log(getDate);
   console.log('rewrwe',recTop);

    //所有医生
    const doclist=await getTodayApp()

    await ctx.render('Patient/appointdoc',{
        RecDoc:recDoc,
        RecTop:recTop,
        data:datainfo,
        DateDay:getDate,
        DocEmail:recDoc,
        DocList:doclist
    })
})


//病例查看界面
//疗程查看

router.get('/medical', loginRedirect,async (ctx,next)=>{
    const datainfo=getLoginInfo(ctx)
    //console.log(datainfo);
    //病历查看
    const id=ctx.session.userInfo.id
    console.log(id);
    const result=await patmedlook(id)
    console.log(result);
    await ctx.render('Patient/Medical record',{
        data:datainfo,
        count1:result
    })
})


//矫正器查看
router.get('/orthotics', loginRedirect,async (ctx,next)=>{
    const datainfo=getLoginInfo(ctx)
    console.log(datainfo);
    const id=ctx.session.userInfo.id
    const result=await patfaclook(id)
    console.log(result);
    await ctx.render('Patient/Orthotics',{
        data:datainfo,
        count1:result
    })
})

//创建反馈
router.get('/addfankui', loginRedirect,async (ctx,next)=>{
    const datainfo=getLoginInfo(ctx)
    console.log(datainfo);
    const id=ctx.session.userInfo.id
    const result=await finddoc(id)
    console.log(result);
    await ctx.render('Patient/addfankui',{
        data:datainfo,
        list:result
    })
})

//查看反馈
router.get('/lookfankui', loginRedirect,async (ctx,next)=>{
    const datainfo=getLoginInfo(ctx)
    console.log(datainfo);
    const id=ctx.session.userInfo.id

    const result=await patfankuicount(id)
    console.log(result);
    await ctx.render('Patient/lookfankui',{
        data:datainfo,
        count1:result
    })
})

module.exports = router
