const router=require('koa-router')()
const {getNewAppiont,getAllAppiont,getRecDocInfo,getDecInfo,getRecTopInfo,
    AddAptIndo,FinAppInfo,getTodayInfo,getMinDocInfo,updataDocAppCount,
    updataPatDocId,getPatAppCountInfo,getPatDocInfo,updataDocAppFirstCount}=require('../services/PatAppints')
const  {SuccessModel, ErrorModel}=require('../model/ResModel')

//最近一次预约记录
async  function getAppint(id){
    const userApp =  await getNewAppiont(id)
    return userApp
}


//历史预约记录

async  function getAllAppint(id,pageindex=0){
    const userApp =  await getAllAppiont(id)
    console.log('userApp',userApp);
    return userApp
}


//推荐医生
async function getRecDoc(id){
    const recDoc=await getRecDocInfo(id)
    console.log(recDoc);

    const _docMin=await  getMinDocInfo()
    console.log(_docMin);


    if(recDoc.length==0){
        return _docMin
    }

    //console.log(recDoc.reduce((p, v) => p.count < v.count ? v : p).DocUserId);
    //获取最多次数的医生
    const DocuserId=recDoc.reduce((p, v) => p.count < v.count ? v : p).DocUserId
    const DocUserInfo=await  getDecInfo(DocuserId)

    //console.log(DocUserInfo);
    //预约次数最小的医生


    return DocUserInfo
    //console.log(recDoc);
}


//排序
function compare(property){
    return function(a,b){
        var value1 = a[property]
        var value2 = b[property]
        return -(value1 - value2)
    }
}

//得到最多的预约的
async  function getRecTop(){
    let getRecTop=await getRecTopInfo()
   // console.log('getRecTop',getRecTop);
   // console.log(getRecTop.sort(compare('count')))
    getRecTop=getRecTop.sort(compare('count'))
    return  getRecTop
}


//渲染预约时间
async  function getAppDate(){
    var arr = [];
    let date1 =new Date()
    const month1=date1.getMonth()+1
    const week1=date1.getDay()
    let DataList={Id:0,Day:date1.getFullYear()+'-'+month1+'-'+date1.getDate(),Week:weekzhuanhuan(week1),Class:'checked office-time-item date_',Date2:month1+'月'+date1.getDate()+'号'};
    arr.push(DataList)
   // console.log(arr);
    for(var i=1;i<6;i++){
        let date =new Date()
        date.setDate(date.getDate()+i);
        const week=date.getDay()
        const nowday= date.getDate()
        const montn=date.getMonth()+1
        const year=date.getFullYear()
        const day=year+'-'+montn+'-'+nowday
        let list={Id:i,Day:day,Week:weekzhuanhuan(week),Class:'office-time-item date_',Date2:montn+'月'+nowday+'号'}
        arr.push(list)
    }
    return arr
}
//周转换
function weekzhuanhuan(week){
    let  Week
    if(week==1){
        Week='星期一'
    }else if(week==2){
        Week='星期二'
    }else if(week==3){
        Week='星期三'
    }else if(week==4){
        Week='星期四'
    }else if(week==5){
        Week='星期五'
    }else if(week==6){
        Week='星期六'
    }else if(week==0){
        Week='星期天'
    }
    return Week
}

//添加预约信息
async function AddApt(_Pat,_Protext,_time,_day,_Docid){
    const _today= new Date()
 //   console.log(_Pat, _Protext, _time,_day,_Docid);
    const result=await AddAptIndo(_Pat,_Docid, _Protext, _time,_day,_today)
   /* console.log(_Docid);
    console.log(_Pat);*/
    const PatDocId=await getPatDocInfo(_Pat)
 //   console.log(PatDocId[0].DocUserId);
    if(PatDocId[0].DocUserId==null){
     //   console.log(PatDocId[0].DocUserId);
        await updataDocAppFirstCount(_Docid)
    }
   /* console.log('11321',PatDocId);
    console.log(result);*/
    if(result){
        //自动更新预约记录
        const add1=await updataPatDocId(_Pat,_Docid)
        const add=await updataDocAppCount(_Docid)
        console.log(add1)
        console.log(add);
        return  new SuccessModel(result)
    }
}

//查找那天预约得信息
async  function FindApp(day,id){
    const  result =await  FinAppInfo(day,id)
    console.log(result.length);
    console.log('预约查询',result);
    const _data=[]
    for(var i=0;i<result.length;i++){
        console.log(result[i].AppTime)
        _data.push(result[i].AppTime)
    }
    return _data
}


//今天所有医生
async function getTodayApp(){
    let date=new Date()
    const day=date.getDate()
    const  month=date.getMonth()+1
    const years=date.getFullYear()
    const _day=years+'-'+month+'-'+day
    const result = await getTodayInfo()

    //console.log('今天可预约',result);

    return result
}

async  function getPatAppCount(id){
    const result= await  getPatAppCountInfo(id)
    console.log(result);
    return result
}

module.exports={
    getAppint,
    getAllAppint,
    getRecDoc,
    getRecTop,
    getAppDate,
    AddApt,
    FindApp,
    getTodayApp,
    getPatAppCount
}