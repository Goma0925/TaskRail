import produce from "immer";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SubTask from "../../../models/ClientModels/Subtask";
import { SelectItem } from "../../../redux/modules/RailUi/RailUiActions";
import { RailUiSelection } from "../../../redux/modules/RailUi/RailUiReducers";
import { UpdateSubtask } from "../../../redux/modules/TaskData/TaskDataActions";
import { deleteSubtaskOp, updateSubtaskOp } from "../../../redux/modules/TaskData/TaskDataOperations";
import TaskNode, { TaskNodeProps } from "../TaskNode";
import TaskParent from "../../../models/ClientModels/TaskParent";
import { getDateStr, getMonthAndDay, LocalDateParse } from "../../../helpers/DateTime";
import EditableTextbox from "../../CommonParts/EditableTextbox/EditableTextbox";
import "./SubtaskNode.css";

export interface SubtaskNodeProps {
    subtask: SubTask;
    railUiSelection: RailUiSelection;
    parent: TaskParent;
}

export default function SubtaskNode(props: SubtaskNodeProps&TaskNodeProps)
{
    const dispatch = useDispatch();
    
    //Check if this node is selected
    const isSelected = props.railUiSelection.type=="SUBTASK" && props.railUiSelection.itemId==props.subtask.getId();
    var className = "subtask";
    if (isSelected){
        className += " selected"
    }
    // Fade if the parent or this subtask itself are checked.
    if (props.subtask.getStatus() || props.parent.isComplete()){
        className += " faded"
    }

    // Initialize the delete button class name.
    var deleteButtonClass = "delete";
    deleteButtonClass += isSelected?"": " hide";

    // Interactivity functions.
    function submitTitleChange(title: any) {
        let updatedSubtask = props.subtask.getCopy();
        updatedSubtask.setName(title);
        dispatch(updateSubtaskOp(updatedSubtask));
    }

    function handleBottomChange(event: any) {
        const newDeadlineStr:string = event.target.value;
        const newDeadline = LocalDateParse(newDeadlineStr);
        console.log("newDeadline: " + newDeadline);
        let updatedSubtask = props.subtask.getCopy();
        updatedSubtask.setSubtaskDeadline(newDeadline);
        dispatch(updateSubtaskOp(updatedSubtask));
    }

    function onClickCheckbox(event: React.ChangeEvent) {
        console.log("onClickCheckbox");
        
        event.stopPropagation();
        let updatedSubtask = props.subtask.getCopy();
        if (updatedSubtask.getStatus()) { // is already complete
            updatedSubtask.uncompleteTask();
        } else {
            updatedSubtask.completeTask();
        }
        dispatch(updateSubtaskOp(updatedSubtask));
    }

    const selectSubtask=(event: React.MouseEvent)=>{
        console.log("selectSubtask");

        event.stopPropagation();        
        dispatch(new SelectItem({type: "SUBTASK", itemId: props.subtask.getId()}));
    }
    
    const deleteSubtask=(e: React.MouseEvent)=>{        
        dispatch(deleteSubtaskOp(props.subtask.getId()));
    }

    const subtaskDeadline = props.subtask.getSubtaskDeadline()

    const subtaskDeadlineMonthAndDay = subtaskDeadline?
                                getMonthAndDay(subtaskDeadline):"";    
    const datePickerValueStr = subtaskDeadline?
                                getDateStr(subtaskDeadline):"";

    return (
        <TaskNode {...props} className={className}>
            {props.children}
            <a className={deleteButtonClass} onClick={deleteSubtask}>×</a>
            <div className="checkbox-container">
                <input 
                    type="checkbox" 
                    className="float-checkbox" 
                    checked={props.subtask.getStatus()}
                    onChange={onClickCheckbox} // gets rid of useless warning message :)
                />
            </div>
            <div className="subtask-top" style={{minHeight:25}} onClick={selectSubtask}>
                <EditableTextbox
                    className={"subtask-title-editor"}
                    updateTextTo={props.subtask.getName()}
                    onSave={submitTitleChange}
                    unfocusOnEnterKey={true}
                    noLineBreak={true}
                ></EditableTextbox>
            </div>
            <div className = "subtask-bottom" onClick={selectSubtask}>
                <input 
                    type="date" 
                    id="date-picker" 
                    value={datePickerValueStr} 
                    onInput={handleBottomChange}
                    ></input>
            </div>
        </TaskNode>
    )
}