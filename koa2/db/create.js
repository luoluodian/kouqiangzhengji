//insert...语句

const {PatUser,DocUser,Appoint}=require('./modeul/index')

!(async function () {
    var time_String = '2015-11-22 15:20:35:88'
    var time_String1 = '2010-11-22 15:20:35:88'
    var myDate = new Date(time_String);
    var myDate1 = new Date(time_String1);
    //创建用户
    //insert into users(...)values(....)
    /*const lisi1 =await  PatUser.create({
        Name:'lisi',
        Pasd:'123444',
        Birth:myDate,
        Sex:'false',
        Email:'111@...',
        DocUserID:1,
    })*/
   /* const zhangsan =await  DocUser.create({
        Name:'312',
        Pasd:'123444',
        Birth:myDate,
        Sex:'false',
        Email:'1111@...',
    })*/
   /* console.log('lisi',lisi.dataValues)
    console.log('zhangsan',zhangsan.dataValues)*/
//
    const lisi =await  Appoint.create({
        PatUserId:'2',
        DocUserId:'1',
        AppointReason:'换牙套',
        AppTime:'10:00',
        AppDay:'1999-1-1'
    })
    console.log(lisi.dataValues);
})()
