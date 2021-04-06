import TaskParent from "../../models/ClientModels/TaskParent";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskParentOp } from "../../redux/modules/TaskData/TaskDataOperations";
import { useState } from "react";
import { getDateStr, LocalDateParse } from "../../helpers/DateTime";
import { UpdateTaskParent } from "../../redux/modules/TaskData/TaskDataActions";

interface TaskParentInfoBarProps {
    taskParent: TaskParent;
}

export function TaskParentInfobar(props: TaskParentInfoBarProps) {
    const dispatch = useDispatch();
    const taskParent = props.taskParent;
    const title = taskParent.getName();
    const complete = taskParent.isComplete();
    const taskParentDeadline = taskParent.getDeadline();    
    const taskParentDeadlineStr = taskParentDeadline?getDateStr(taskParentDeadline):"";
    const note = taskParent.getNote();    

    function handleTitleChange(event: any) {
        let updatedTaskParent = taskParent.getCopy();
        updatedTaskParent.setName(event.target.textContent);
        dispatch(new UpdateTaskParent(updatedTaskParent));
    }

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
    
    function handleCheckboxChange(event: any) {
        let updatedTaskParent = taskParent.getCopy();
        if (event.target.checked) {
        //   updatedTaskParent.completeTask();
        } else {
        //   updatedTaskParent.uncompleteTask();
        }
        dispatch(new UpdateTaskParent(updatedTaskParent));
    }
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
              value={taskParentDeadlineStr}
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

export default TaskParentInfobar; 
