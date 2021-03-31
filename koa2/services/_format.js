const { PICTURE}=require('../conf/constants')

function _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = PICTURE
    }
    return obj
}

function formatUser(list) {
    if(list=null){
        return list
    }
    if(list instanceof Array){
        return list.map(_formatUserPicture)
    }

    return _formatUserPicture(list)
}


module.exports={
    formatUser
}