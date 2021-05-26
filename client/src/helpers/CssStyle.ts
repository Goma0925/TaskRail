interface ModuleCssStyle{
    readonly [key: string]: string;
}

export function classNameConcatenator(styles?: ModuleCssStyle){
    // Creates a function that concatenates className in an array to a single string
    // If a CSS module style object is passed, output module className
    if (styles){
        // Converts a module CSS style to a modularized className. If a className is not 
        // in the module, just prints the raw className. 
        return (classNames: string[])=>{
            return classNames.reduce((accumulator, className)=>{
                const scopedClassName = styles[className]? styles[className]: className;
                return accumulator  + " " + scopedClassName;
            }, "");
        }
    };

    // If a CSS module style object is NOT passed, simply concatenate passed classNames
    return (classNames: string[])=>{
        return classNames.reduce((accumulator, className)=>{
            return accumulator + " " + className;
        }, "");
    }
}