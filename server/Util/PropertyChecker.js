function hasLocalAttributes (locals, attributes){
    // A function to check if particular attributes are passed by previous middleware.
    // locals should take req.locals, attributes should take a string array specifying
    // required attributes that we expect in locals.
    if (!Array.isArray(attributes)){
        throw new Error("attributes needs to be a string array.");
    }
    let hasAllAttributes = true;
    attributes.map((attr)=>{
        if (!locals.hasAttribute(attr)){
            hasAllAttributes = false;
        }
    })
    return hasAllAttributes;
}

module.exports = {
    hasLocalAttributes: hasLocalAttributes
} 