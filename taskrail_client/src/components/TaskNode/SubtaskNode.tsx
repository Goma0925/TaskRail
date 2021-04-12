import produce from "immer";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SubTask from "../../models/ClientModels/Subtask";
import { SelectItem } from "../../redux/modules/RailUi/RailUiActions";
import { RailUiSelection } from "../../redux/modules/RailUi/RailUiReducers";
import { UpdateSubtask } from "../../redux/modules/TaskData/TaskDataActions";
import { deleteSubtaskOp, updateSubtaskOp } from "../../redux/modules/TaskData/TaskDataOperations";
import TaskNode, { TaskNodeProps } from "./TaskNode";
import "../TaskNode/Decorators/WithSubtaskSkin/WithSubtaskSkin.css";
import "../TaskNode/Decorators/WithSelectableSubtask/WithSelectableSubtask.css";
import TaskParent from "../../models/ClientModels/TaskParent";
import { getDateStr, getMonthAndDay, LocalDateParse } from "../../helpers/DateTime";

export interface SubtaskNodeProps {
    subtask: SubTask;
    railUiSelection: RailUiSelection;
    parent: TaskParent;
}

export default function SubtaskNode(props: SubtaskNodeProps&TaskNodeProps)
{
    const dispatch = useDispatch();
    const isSelected = props.railUiSelection.type=="SUBTASK" && 
        props.railUiSelection.itemId==props.subtask.getId();

    const onClickSubtask=()=>{
        dispatch(new SelectItem({type: "SUBTASK", itemId: props.subtask.getId()}));
    }
    
    const deleteSubtask=(e: React.MouseEvent)=>{
        e.preventDefault();
        dispatch(deleteSubtaskOp(props.subtask.getId()));
    }
    
    //Check if this node is selected
    var className = "subtask-skin";
    if (isSelected){
        className += " selected"
    }
    if (props.subtask.getStatus() || props.parent.isComplete()){
        className += " faded"
    }
    //Update props
    var newProps = produce(props, draftProps=>{
        draftProps.onClickHandlers = draftProps.onClickHandlers?draftProps.onClickHandlers:[];
        draftProps.onClickHandlers.push(onClickSubtask);
        // Append className
        draftProps.className = className;
        draftProps.className += props.className? props.className: "";
    });

    var deleteButtonClass = "delete";
    deleteButtonClass += isSelected?"": " hide";

    function handleTopChange(event: any) {
        let updatedSubtask = props.subtask.getCopy();
        updatedSubtask.setName(event.target.textContent);
        dispatch(updateSubtaskOp(updatedSubtask));
    }

    function handleBottomChange(event: any) {
        const newDeadlineStr:string = event.target.value;
        const newDeadline = LocalDateParse(newDeadlineStr);
        console.log("newDeadline: " + newDeadline);
        let updatedSubtask = props.subtask.getCopy();
        updatedSubtask.setSubtaskDeadline(newDeadline);
        // dispatch(new UpdateSubtask(updatedSubtask));
        dispatch(updateSubtaskOp(updatedSubtask));
    }

    function onClickCheckbox(event: any) {
        let updatedSubtask = props.subtask.getCopy();
        if (updatedSubtask.getStatus()) { // is already complete
            updatedSubtask.uncompleteTask();
        } else {
            updatedSubtask.completeTask();
        }
        dispatch(updateSubtaskOp(updatedSubtask));
    }

    const subtaskDeadline = props.subtask.getSubtaskDeadline()
    console.log("subtask deadline: " + subtaskDeadline)
    const subtaskDeadlineMonthAndDay = subtaskDeadline?
                                getMonthAndDay(subtaskDeadline):"";    
    const datePickerValueStr = subtaskDeadline?
                                getDateStr(subtaskDeadline):"";
    console.log("date picker value: " + datePickerValueStr);
    return (
        <TaskNode {...newProps}>
            {newProps.children}
            <a className={deleteButtonClass} onClick={deleteSubtask}>×</a>
            <div className="checkbox-container">
                <input 
                    type="checkbox" 
                    className="float-checkbox" 
                    onClick={onClickCheckbox} 
                    checked={props.subtask.getStatus()}
                />
            </div>
            <div className="subtask-top" style={{height:25}}>
                <p contentEditable={true} onBlur={handleTopChange}>
                    {props.subtask.getName()}</p>
            </div>
            <div className = "subtask-bottom" style={{height:25}}>
                {/* <p contentEditable={true} onBlur={handleBottomChange}> */}
                {/* <p> {subtaskDeadlineMonthAndDay} </p> */}
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