// Michael
import React, { useState } from "react";
import Subtask from "../../models/Subtask";
import TaskParent from "../../models/TaskParent";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UpdateSubtask } from "../../redux/modules/TaskData/TaskDataActions";
import DatePicker from "react-datepicker";

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
    let deadline = subtask.getSubtaskDeadline();
    const note = subtask.getNote();
    let [new_deadline, set_new_deadline] = useState(return_date_str(deadline));
    const [noteText, setNoteText] = useState(note);
    const dispatch = useDispatch();
    function return_date_str(date: Date){
        let [month, day, year] = [(0 + date.getMonth().toString()).slice(-2), (0 + date.getDate().toString()).slice(-2), date.getFullYear()];
        return year + "-" + month + "-" + day;
    }
    function handleNoteChange(event: any) { // update this type in future 
        let updatedSubtask = subtask.getCopy();
        updatedSubtask.setNote(event.target.value);
        dispatch(new UpdateSubtask(updatedSubtask));
    }
    function handleDateChange(event:any){
        set_new_deadline(event.target.value);
        let date_obj = new Date(event.target.value);
        date_obj.setDate(date_obj.getDate() + 1); //odd bug that does one day less when converting the string to date, so I'm adding a day
        let updatedSubtask = subtask.getCopy();
        updatedSubtask.setSubtaskDeadline(date_obj);
        dispatch(new UpdateSubtask(updatedSubtask));
    }
    function handleTitleChange(event:any){

    }

    return (
        <div className="sideinfo-bar">
            <h1 className="Title">
                {title}
            </h1>
            <ul>
                <li className="Deadline">Deadline: 
                    <input type="date" value={new_deadline} onChange={handleDateChange} />
                </li>
                <li className="Note">Note:</li>
            </ul>
            <textarea value={note} onChange={handleNoteChange} />
        </div>
    );
}

export default SubtaskInfoBar; 
