// Michael
import React, { useState } from "react";
import Subtask from "../../models/Subtask";
import TaskParent from "../../models/TaskParent";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UpdateSubtask } from "../../redux/modules/TaskData/TaskDataActions";

// Typescript uses interfaces (static, compile-time checking)
// We also have PropTypes by React.js which does run-time type checking
interface SideInfoBarProps {
    subtask: Subtask;
}

/** SideInfoBar's props must have the same
shape as the Props interface object **/ 
export function SubtaskInfoBar(props: SideInfoBarProps) {
    // const [text, setText] = useState(props?.text); 
    const subtask = props.subtask;
    const title = subtask.getName();
    const deadline = subtask.getSubtaskDeadline();
    console.log(subtask);
    const [text, setText] = useState(""); 

    const dispatch = useDispatch();
    function handleChange(event: any) { // update this type in future 
        setText(event.target.value);
        dispatch(new UpdateSubtask(subtask));
    }



    return (
        <div className="sideinfo-bar">
            <h1 className="Title">
                {title}
            </h1>
            <ul>
                <li className="Deadline">Deadline: {deadline?.getMonth()}/ {deadline?.getDate()} / {deadline?.getFullYear()}</li>
                <li className="Note">Note:</li>
            </ul>
            <textarea value={text} onChange={handleChange} />
        </div>
    );
}

export default SubtaskInfoBar; 