import TaskParent from "../../models/TaskParent";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskParentOp } from "../../redux/modules/TaskData/TaskDataOperations";
import { useState } from "react";
import { getDateStr, LocalDateParse } from "../../helpers/DateTime";

interface TaskParentInfoBarProps {
    taskParent: TaskParent;
}

export function TaskParentInfobar(props: TaskParentInfoBarProps) {
    const taskParent = props.taskParent;
    const title = taskParent.getName();
    const taskParentDeadline = taskParent.getDeadline();    
    const taskParentDeadlineStr = taskParentDeadline?getDateStr(taskParentDeadline):"";
    const note = taskParent.getNote();    

    function handleNoteChange(event: any) { // update this type in future 
        let updatedTaskParent = taskParent.getCopy();
        updatedTaskParent.setNote(event.target.value);
        updateTaskParentOp(updatedTaskParent);
    };
    
    function handleDateChange(event:any){
        let date = LocalDateParse(event.target.value);
        let updatedTaskParent = props.taskParent.getCopy();
        updatedTaskParent.setTaskParentDeadline(date);
        updateTaskParentOp(updatedTaskParent);
    }
    

    return (
        <div className="sideinfo-bar">
            <input type="text" value={title}/>
            <ul>
                <li className="Deadline">Deadline: 
                    <input type="date" value={taskParentDeadlineStr} onChange={handleDateChange} />
                </li>
                <li className="Note">Note:</li>
            </ul>
            <textarea value={note} onChange={handleNoteChange} />
        </div>
    );
}

export default TaskParentInfobar; 
