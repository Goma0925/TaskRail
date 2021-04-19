import TaskParent from "../../models/ClientModels/TaskParent";
import "./SideInfoBar.css";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskParentOp } from "../../redux/modules/TaskData/TaskDataOperations";
import React, { useState } from "react";
import { getDateStr, LocalDateParse } from "../../helpers/DateTime";
import EditableTextbox from "../../components/CommonParts/EditableTextbox/EditableTextbox";
import SmartDatePicker from "../../components/CommonParts/SmartDatePicker/SmartDatePicker";
import AutoSaveTextarea from "../../components/CommonParts/AutoSaveTextarea/AutoSaveTextarea";

interface TaskParentInfoBarProps {
    taskParent: TaskParent;
}

export function TaskParentInfobar(props: TaskParentInfoBarProps) {
    const dispatch = useDispatch();
    const taskParent = props.taskParent;
    const title = taskParent.getName();
    const complete = taskParent.isComplete();
    const taskParentDeadline = taskParent.getDeadline();   

    function submitTitleChange(title: string) {
        let updatedTaskParent = taskParent.getCopy();
        updatedTaskParent.setName(title);
        dispatch(updateTaskParentOp(updatedTaskParent));
    }

    function submitNoteChange(note: string) { // update this type in future 
        let updatedTaskParent = taskParent.getCopy();
        updatedTaskParent.setNote(note);
        dispatch(updateTaskParentOp(updatedTaskParent));
    };
    
    function submitDateChange(newDate: Date){
        let updatedTaskParent = props.taskParent.getCopy();
        updatedTaskParent.setTaskParentDeadline(newDate);
        dispatch(updateTaskParentOp(updatedTaskParent));
    }
    
    function handleCheckboxChange(event: any) {
        let updatedTaskParent = taskParent.getCopy();
        if (event.target.checked) {
          updatedTaskParent.completeTask();
        } else {
          updatedTaskParent.uncompleteTask();
        }
        dispatch(updateTaskParentOp(updatedTaskParent));
    }
    return (
      <nav className="panel sideinfo-bar">
      <div className="panel-block sideinfo-bar-top">
        <input
          type="checkbox"
          checked={complete}
          className="infobar-checkbox"
          onChange={handleCheckboxChange}
        />
        <EditableTextbox
          className="infobar-title"
          updateTextTo={title}
          placeholder="Task Set Title"
          onSave={submitTitleChange}
          unfocusOnEnterKey={true}
        ></EditableTextbox>
      </div>
      <div className="input-section">
        <div className="panel-block">
          <SmartDatePicker
            className="input"
            updateDateTo={taskParentDeadline?taskParentDeadline:undefined}
            onDateChange={submitDateChange}
          ></SmartDatePicker>
        </div>
        <AutoSaveTextarea
          updateValueTo={taskParent.getNote()}
          placeholder="Note"
          onSave={submitNoteChange}
          className="textarea"
        ></AutoSaveTextarea>
      </div>
    </nav>
    );
}

export default TaskParentInfobar; 
