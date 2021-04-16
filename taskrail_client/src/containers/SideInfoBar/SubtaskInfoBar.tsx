import Subtask from "../../models/ClientModels/Subtask";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { updateSubtaskOp } from "../../redux/modules/TaskData/TaskDataOperations";
import { getDateStr, LocalDateParse } from "../../helpers/DateTime";
import { useEffect, useRef, useState } from "react";
import { useInterval } from "../../helpers/ReactUtils";

// Typescript uses interfaces (static, compile-time checking)
// We also have PropTypes by React.js which does run-time type checking
interface SideInfoBarProps {
  subtask: Subtask;
}

/** SideInfoBar's props must have the same
shape as the Props interface object **/
export function SubtaskInfoBar(props: SideInfoBarProps) {
  const dispatch = useDispatch();
  var months: { [name: string]: string } = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  const subtask = props.subtask;
  const title = subtask.getName();
  const complete = subtask.getStatus();
  const deadline = subtask.getSubtaskDeadline();
  const note = subtask.getNote();

  const [noteText, setNoteText] = useState(note);
  const [noteSaveTimer, setNoteSaveTimer] = useState(setTimeout(()=>{}, 0));

  const startNoteSaveCountDown = (event: any)=>{
    // Set an interval function to trigger a few seconds after a user finishes typing in the text area.
    // Clear the previous timer for saving note
    clearTimeout(noteSaveTimer);
    // Set timer that triggers in two seconds after the user finishes typing.
    const timerId = setTimeout(()=>{
      console.log("saving...");
      submitNoteChange(event);
    }, 2000);
    setNoteSaveTimer(timerId);
  }

  function handleNoteChange(event: any){
    //Save note text in component.
    setNoteText(event.target.value);
  }

  function submitNoteChange(event: any) {
    // Submit the note text change to the server.
    // update this type in future
    let updatedSubtask = subtask.getCopy();
    updatedSubtask.setNote(event.target.value);
    dispatch(updateSubtaskOp(updatedSubtask));
  }

  function handleDateChange(event: any) {
    var newDate = LocalDateParse(event.target.value);
    var updatedSubtask = subtask.getCopy();
    updatedSubtask.setSubtaskDeadline(newDate);
    dispatch(updateSubtaskOp(updatedSubtask));
  }

  function handleTitleChange(event: React.FocusEvent<HTMLHeadingElement>) {
    if (event.target.textContent){
      let updatedSubtask = subtask.getCopy();
      updatedSubtask.setName(event.target.textContent);
      dispatch(updateSubtaskOp(updatedSubtask));
    }
  }

  function handleCheckboxChange(event: any) {
    let updatedSubtask = subtask.getCopy();
    if (event.target.checked) {
      updatedSubtask.completeTask();
    } else {
      updatedSubtask.uncompleteTask();
    }
    dispatch(updateSubtaskOp(updatedSubtask));
  }

  return (
    <nav className="panel sideinfo-bar">
      <div className="panel-heading sideinfo-bar-top">
        <input
          type="checkbox"
          checked={complete}
          className="infobar-checkbox"
          onClick={handleCheckboxChange}
        />
        <h1
          className="infobar-title"
          contentEditable={"true"}
          onChange={handleNoteChange}
          onBlur={handleTitleChange}
          suppressContentEditableWarning={true}
        >
          {title}
        </h1>
      </div>
      <div className="input-section">
        <div className="panel-block">
          <input
            type="date"
            value={deadline?getDateStr(deadline):""}
            onChange={handleDateChange}
            className="input"
          />
        </div>
        <div className="note">
          <textarea
            value={noteText}
            placeholder="Note"
            onBlur={submitNoteChange}
            onKeyUp={startNoteSaveCountDown} 
            onChange={handleNoteChange}
            className="textarea"
          />
        </div>
      </div>
    </nav>
  );
}

export default SubtaskInfoBar;
