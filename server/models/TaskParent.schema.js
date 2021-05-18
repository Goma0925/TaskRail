const mongoose = require("mongoose")
const Schema = require("mongoose").Schema;

const taskParentSchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    taskParentDeadline: {
        type: Date,
        default: null
    },
    note: {
        type: String,
        default:"",
    },
    complete: {
        type: Boolean,
        default: false,
    },
});

taskParentSchema.sanitizeReqBody = function(reqBody){
    // Filter only the updatable fields of taskparent from request body and return it.
    const excludedFields = ["_id","__v", "createdAt", "updatedAt"]
    const updatableFields = Object.keys(taskParentSchema.paths).filter(field => !excludedFields.includes(field));

    let sanitizedReqBody = {};
    updatableFields.map((field)=>{
        if (field in reqBody){
            sanitizedReqBody[field] = reqBody[field];
        };
    });
    return sanitizedReqBody;
}

module.exports = taskParentSchema;