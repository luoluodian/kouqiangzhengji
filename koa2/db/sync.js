const seq=require('./seq')
require('./modeul/index')

seq.authenticate().then(()=>{
    console.log("ko");
}).catch(()=>{
    console.log('err');
})//测试链接成功

//同步成功
seq.sync({force:true}).then(()=>{
    console.log('ok');
    process.exit();
})

//force是否新建表