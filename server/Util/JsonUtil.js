function errorJson(message){
    if (message != null){
      return {success: false, error_msg: message};
    }
    else {
      return {success: false};
    }
}

function successJson(data){
    return {success: true, data: data}
}
  
module.exports = {
    errorJson,
    successJson,
}