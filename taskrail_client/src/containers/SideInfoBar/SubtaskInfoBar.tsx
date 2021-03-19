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
  const complete = subtask.getStatus();
  let deadline = subtask.getSubtaskDeadline();
  const note = subtask.getNote();
  var g_month: number = 0;
  var g_day: number = 0;
  var g_year: number = 0;
  let [new_deadline, set_new_deadline] = useState(return_date_str(deadline));
  const [noteText, setNoteText] = useState(note);
  const [titleText, setTitleText] = useState(title);
  const [status, setStatus] = useState(complete);
  const dispatch = useDispatch();
  function return_date_str(date: Date) {
    let [month, day, year] = [
      (0 + date.getUTCMonth().toString()).slice(-2),
      (0 + date.getUTCDay().toString()).slice(-2),
      date.getUTCFullYear(),
    ];
    g_month = Number(month);
    g_day = Number(day);
    g_year = Number(year);
    let new_date = year + "-" + month + "-" + day;
    console.log(date.toString().split(" "));
    return new_date;
  }
  function handleNoteChange(event: any) {
    // update this type in future
    let updatedSubtask = subtask.getCopy();
    updatedSubtask.setNote(event.target.value);
    dispatch(new UpdateSubtask(updatedSubtask));
  }
  function handleDateChange(event: any) {
    set_new_deadline(event.target.value);
    let date_splitted = event.target.value.split("-");
    let year = date_splitted[0];
    let month = date_splitted[1];
    let day = date_splitted[2];
    let date_obj = new Date(year, month, day);
    let updatedSubtask = subtask.getCopy();
    updatedSubtask.setSubtaskDeadline(date_obj);
    dispatch(new UpdateSubtask(updatedSubtask));
  }

  function handleTitleChange(event: any) {
    setTitleText(event.target.textContent);
    let updatedSubtask = subtask.getCopy();
    updatedSubtask.setName(event.target.textContent);
    dispatch(new UpdateSubtask(updatedSubtask));
  }

  function handleCheckboxChange(event: any) {
    setStatus(event.target.checked);
    let updatedSubtask = subtask.getCopy();
    if (event.target.checked) {
      updatedSubtask.completeTask();
    } else {
      updatedSubtask.uncompleteTask();
    }
    dispatch(new UpdateSubtask(updatedSubtask));
  }

  console.log("Deadline:", deadline);

  return (
    <div className="sideinfo-bar">
      <div className="TitleAndCheckbox">
        <input
          type="checkbox"
          checked={complete}
          className="Checkbox"
          onClick={handleCheckboxChange}
        />
        <h1
          className="Title"
          contentEditable={"true"}
          onBlur={handleTitleChange}
          suppressContentEditableWarning={true}
        >
          {title}
        </h1>
      </div>
      <hr />
      <div className="InputList">
        <div className="Deadline">
          <h3 className="DeadlineLabel">Deadline:</h3>
          <input
            type="date"
            value={return_date_str(deadline)}
            onChange={handleDateChange}
            className="DeadlineInput"
          />
        </div>
        <div className="Note">
          <h3 className="NoteLabel">Note:</h3>
          <textarea
            value={note}
            onChange={handleNoteChange}
            className="NoteInput"
          />
        </div>
      </div>
    </div>
  );
}

export default SubtaskInfoBar;
