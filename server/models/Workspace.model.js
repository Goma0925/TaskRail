const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const taskParentSchema = require("./TaskParent.schema");

const workspaceSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "Users",  //ID Reference to Users Collection.
        required: true,
    },
    name: {
        type: String,
        default: ""
    },
    taskparents: {
        type: [taskParentSchema],
        default: [],
    }
},{
    timestamps: true,
});

class WorkspaceClass{
    static sanitizeReqBody(reqBody){
        // Filter only the updatable fields from request body and return it.
        const excludedFields = ["_id","__v", "createdAt", "updatedAt", "ownerId"]
        const updatableFields = Object.keys(this.schema.paths).filter(field => !excludedFields.includes(field));

        let sanitizedReqBody = {};
        updatableFields.map((field)=>{
            if (field in reqBody){
                sanitizedReqBody[field] = reqBody[field];
            };
        });
        return sanitizedReqBody;
    }
}

workspaceSchema.loadClass(WorkspaceClass)
const Worskpace = mongoose.model("Workspaces", workspaceSchema);
module.exports = Worskpace;