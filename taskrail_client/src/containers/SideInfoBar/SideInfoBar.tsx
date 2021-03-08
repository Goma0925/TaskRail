// Michael
import React, { useState } from "react";
import Subtask from "../../models/Subtask";
import TaskParent from "../../models/TaskParent";
import "./style.css";

// Typescript uses interfaces (static, compile-time checking)
// We also have PropTypes by React.js which does run-time type checking
interface SideInfoBarProps {
    taskParent?: TaskParent;
    subtask?: Subtask;
}

/** SideInfoBar's props must have the same
shape as the Props interface object **/ 
function SideInfoBar(props: SideInfoBarProps) {
    // const [text, setText] = useState(props?.text); 
    const [text, setText] = useState(""); 

    function handleChange(event: any) { // update this type in future 
        setText(event.target.value);
    }

    return (
        <div className="sideinfo-bar">
            <textarea value={text} onChange={handleChange} />
        </div>
    );
}

export default SideInfoBar; 
