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

function operationResult(status, success, data){
  return {status: status, success: success, data: data};
}
  
module.exports = {
    errorJson,
    successJson,
    operationResult,
}