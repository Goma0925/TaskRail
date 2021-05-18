const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
    taskParentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspaces.taskparents",  //ID Reference to Workspace collection's taskparent.
        required: true,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",  //ID Reference to Users Collection.
        required: true,
    },
    name: {
        type: String,
        default: ""
    },
    scheduledDate: {
        type: Date,
        default: null
    },
    deadline: {
        type: Date,
        default: null
    },
    note: {
        type: String,
        default: ""
    },
    complete: false
},{
    timestamps: true,
});

class SubtaskClass{
    static sanitizeReqBody(reqBody){
        // Filter only the updatable fields of subtask from request body and return it.
        const excludedFields = ["_id","__v", "createdAt", "updatedAt", "taskParentId", "ownerId"]
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

subtaskSchema.loadClass(SubtaskClass);
const Subtask = mongoose.model("Subtasks", subtaskSchema);
module.exports = Subtask;