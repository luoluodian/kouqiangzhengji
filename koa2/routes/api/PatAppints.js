const router=require('koa-router')()
const {AddApt,FindApp}=require('../../controller/PatAppints')

router.prefix('/api/PatAppints')


//创建预约
router.post('/doAppints',async (ctx,next)=> {
    const {_Protext,_time,_day,_Docid}=await ctx.request.body
    const _Pat=ctx.session.userInfo.id
    console.log(_Pat);
    const result = await AddApt(_Pat,_Protext,_time,_day,_Docid)
    console.log('AppData',result);
    ctx.body=result
} )

//渲染预约日期窗口
router.post('/appday',async  (ctx,next)=>{
    const {_day,_id}=await ctx.request.body
   // console.log('第几天',_day);
   // console.log('第几天',_id);
    const result= await FindApp(_day,_id)
    console.log(result);
    ctx.body={
        result
    }
//    console.log(resule);

})


module.exports=router