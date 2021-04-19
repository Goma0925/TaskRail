import Subtask from "../../models/ClientModels/Subtask";
import "./SideInfoBar.css";
import { useDispatch, useSelector } from "react-redux";
import { updateSubtaskOp } from "../../redux/modules/TaskData/TaskDataOperations";
import { getDateStr, LocalDateParse } from "../../helpers/DateTime";
import { useEffect, useRef, useState } from "react";
import { useInterval } from "../../helpers/ReactUtils";
import React from "react";
import AutoSaveTextarea from "../../components/CommonParts/AutoSaveTextarea/AutoSaveTextarea";
import EditableTextbox from "../../components/CommonParts/EditableTextbox/EditableTextbox";
import SmartDatePicker from "../../components/CommonParts/SmartDatePicker/SmartDatePicker";

// Typescript uses interfaces (static, compile-time checking)
// We also have PropTypes by React.js which does run-time type checking
interface SideInfoBarProps {
  subtask: Subtask;
}

/** SideInfoBar's props must have the same
shape as the Props interface object **/
export function SubtaskInfoBar(props: SideInfoBarProps) {
  const dispatch = useDispatch();
  const subtask = props.subtask;
  const title = subtask.getName();
  const complete = subtask.getStatus();
  const deadline = subtask.getSubtaskDeadline();

  function submitNoteChange(note: string) {
    // Submit the note text change to the server.
    let updatedSubtask = subtask.getCopy();
    updatedSubtask.setNote(note);
    dispatch(updateSubtaskOp(updatedSubtask));  
  }

  function submitDateChange(newDate: Date) {
    var updatedSubtask = subtask.getCopy();
    updatedSubtask.setSubtaskDeadline(newDate);
    dispatch(updateSubtaskOp(updatedSubtask));
  }

  function subtmiTitleChange(title: string) {
    let updatedSubtask = subtask.getCopy();
    updatedSubtask.setName(title);
    dispatch(updateSubtaskOp(updatedSubtask));
  }

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    let updatedSubtask = subtask.getCopy();
    if (event.target.checked) {
      updatedSubtask.completeTask();
    } else {
      updatedSubtask.uncompleteTask();
    }
    dispatch(updateSubtaskOp(updatedSubtask));
  };
  
  return (
    <nav className="panel sideinfo-bar">
      <div className="panel-heading sideinfo-bar-top">
        <input
          type="checkbox"
          checked={complete}
          className="infobar-checkbox"
          onChange={handleCheckboxChange}
        />
        <EditableTextbox
          className="infobar-title"
          updateTextTo={title}
          placeholder="Task Step Title"
          onSave={subtmiTitleChange}
          unfocusOnEnterKey={true}
        ></EditableTextbox>
      </div>
      <div className="input-section">
        <div className="panel-block">
          <SmartDatePicker
            className="input"
            updateDateTo={deadline}
            onDateChange={submitDateChange}
          ></SmartDatePicker>
        </div>
        <AutoSaveTextarea
          updateValueTo={subtask.getNote()}
          placeholder="Note"
          onSave={submitNoteChange}
          className="textarea"
        ></AutoSaveTextarea>
      </div>
    </nav>
  );
}

export default SubtaskInfoBar;
