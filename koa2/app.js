//引入模块 npm install
const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')//错误处理
const bodyparser = require('koa-bodyparser')//post数据
const logger = require('koa-logger')
const session=require('koa-generic-session')
const koaStatic = require('koa-static')

//const {Secret}=require('./conf/constants')

const users = require('./routes/views/users')
const errViewRouter = require('./routes/views/error')
const UserApiRouter=require('./routes/api/user')
const Patindex = require('./routes/views/Patindex')
const PatindexApiRouter=require('./routes/api/Patindex')
const PatAppintsApiRouter = require('./routes/api/PatAppints')
const Docindex=require('./routes/views/Docindex')
const DocindexApiRoutrer = require('./routes/api/Docindex')
const AdminRouter=require('./routes/views/Admin')
const AdminApiRouter=require('./routes/api/Admin')
const FacingApiRouter=require('./routes/api/addFacing')
const MedlookApiRouter=require('./routes/api/medLook')
const MedCreatedApiRouter=require('./routes/api/MedCreated')
const FaclookApiRouter=require('./routes/api/faclook')
const MedPatlookApiRouter=require('./routes/api/medpatlook')
const AddfankuiApiRouter=require('./routes/api/addfankui')

// error handler
onerror(app)//错误监测

//处理post数据格式
app.use(bodyparser({
  enableTypes:['json', 'form', 'text'],
}))
app.use(json())


//日志
app.use(logger())

//静态文件
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname,'/uploadFiles')))

//ejs模板引擎
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))



// logger 获取耗时
  app.use(async (ctx, next) => {
  const start = new Date()//获取当前时间
  await next()//执行别的事情
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.keys=['luoluodian']
app.use(session({
  //配置cookis
  cookie:{
    path:'/',
    httpOnly: true,
    maxAge:24*60*60*1000
  },
}))


// routes 路由处理
//注册路由


app.use(users.routes(), users.allowedMethods())
app.use(UserApiRouter.routes(),UserApiRouter.allowedMethods())

app.use(Patindex.routes(), Patindex.allowedMethods())
app.use(PatindexApiRouter.routes(),PatindexApiRouter.allowedMethods())

app.use(Docindex.routes(),Docindex.allowedMethods())
app.use(DocindexApiRoutrer.routes(),DocindexApiRoutrer.allowedMethods())

app.use(AdminRouter.routes(), AdminRouter.allowedMethods())
app.use(AdminApiRouter.routes(), AdminApiRouter.allowedMethods())

app.use(MedCreatedApiRouter.routes(), MedCreatedApiRouter.allowedMethods())
app.use(FacingApiRouter.routes(), FacingApiRouter.allowedMethods())
app.use(MedlookApiRouter.routes(), MedlookApiRouter.allowedMethods())
app.use(FaclookApiRouter.routes(), FaclookApiRouter.allowedMethods())
app.use(MedPatlookApiRouter.routes(), MedPatlookApiRouter.allowedMethods())
app.use(AddfankuiApiRouter.routes(), AddfankuiApiRouter.allowedMethods())



app.use(PatAppintsApiRouter.routes(),PatAppintsApiRouter.allowedMethods())
app.use(errViewRouter.routes(), errViewRouter.allowedMethods()) //注册的时候404最下面


// error-handling 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});




module.exports = app
