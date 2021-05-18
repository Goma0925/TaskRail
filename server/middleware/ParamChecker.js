// These middleware are used to check if a nested API endpoint has a certain req.params
const Workspace = require.main.require("./models/Workspace.model");
const JsonUtil = require.main.require("./Util/JsonUtil");

async function requireValidWorkspaceIdParam(req, res, next) {
    //Check if the workspace ID is correct before passing request to the subtask router.
    try{
        const workspaceId = req.params.workspaceId;
        Workspace.exists(
            {_id: workspaceId},
            (err, workspaceExists)=>{
                if (err){
                    return res.status(500).json(JsonUtil.errorJson(err.message))
                }
                if (!workspaceExists){
                    return res.status(400).json(JsonUtil.errorJson('Workspace with ID "'+workspaceId+'" does not exists.'));
                  }
                return next();
            }
        );
    }catch(err){
        return res.status(500).json(JsonUtil.errorJson("The workspace ID passed in the URL path is either malformed or a server error ocurred."))
    }
};

module.exports = {
    requireValidWorkspaceIdParam: requireValidWorkspaceIdParam
}