// Michael
import React, { useState } from "react";

// Typescript uses interfaces (static, compile-time checking)
// We also have PropTypes by React.js which does run-time type checking
interface Props {
    text?: string
}

/** SideInfoBar's props must have the same
shape as the Props interface object **/ 
function SideInfoBar(props: Props) {
    // const [text, setText] = useState(props?.text); 
    const [text, setText] = useState(props?.text == null? "Go ahead, type that note!" : props?.text); 

    function handleChange(event: any) { // update this type in future 
        setText(event.target.value);
    }

    return (
        <textarea value={text} onChange={handleChange} />
    );
}

export default SideInfoBar; 
