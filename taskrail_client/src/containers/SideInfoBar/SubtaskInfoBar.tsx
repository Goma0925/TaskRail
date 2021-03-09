// Michael
import React, { useState } from "react";
import Subtask from "../../models/Subtask";
import TaskParent from "../../models/TaskParent";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UpdateSubtask } from "../../redux/modules/TaskData/TaskDataActions";

interface SideInfoBarProps {
    taskParent: TaskParent;
    subtask: Subtask;
}

export function SubtaskInfoBar(props: SideInfoBarProps) {
    // const [text, setText] = useState(props?.text); 
    const subtask = props.subtask;
    const taskParent = props.taskParent;
    console.log(subtask);
    const [text, setText] = useState(""); 

    const dispatch = useDispatch();
    function handleChange(event: any) { // update this type in future 
        setText(event.target.value);
        dispatch(new UpdateSubtask(subtask, taskParent));
    }

    return (
        <div className="sideinfo-bar">
            <textarea value={text} onChange={handleChange} />
        </div>
    );
}

export default SubtaskInfoBar; 
