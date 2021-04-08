import produce from "immer";
import React from "react";
import { useDispatch } from "react-redux";
import SubTask from "../../models/ClientModels/Subtask";
import { SelectItem } from "../../redux/modules/RailUi/RailUiActions";
import { RailUiSelection } from "../../redux/modules/RailUi/RailUiReducers";
import { UpdateSubtask } from "../../redux/modules/TaskData/TaskDataActions";
import { deleteSubtaskOp } from "../../redux/modules/TaskData/TaskDataOperations";
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
        deleteSubtaskOp(props.subtask.getId());
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
        dispatch(new UpdateSubtask(updatedSubtask));
    }

    function handleBottomChange(event: any) {
        // TODO: Modify date, either through datepicker
        // or by allowing user to modify string and
        // encoding it back into a date.

        // let updatedSubtask = props.subtask.getCopy();
        // updatedSubtask.setId(event.target.textContent);
        // dispatch(new UpdateSubtask(updatedSubtask));
    }

    function onClickCheckbox(event: any) {
        let updatedSubtask = props.subtask.getCopy();
        if (updatedSubtask.getStatus()) { // is already complete
            updatedSubtask.uncompleteTask();
        } else {
            updatedSubtask.completeTask();
        }
        dispatch(new UpdateSubtask(updatedSubtask));
    }

    return (
        <TaskNode {...newProps}>
            {newProps.children}
            <a className={deleteButtonClass} onClick={deleteSubtask}>×</a>
            <div className="checkbox-container">
                <input type="checkbox" className="float-checkbox" onClick={onClickCheckbox}/>
            </div>
            <div className="subtask-top" style={{height:25}}>
                <p contentEditable={true} onBlur={handleTopChange}>
                    {props.subtask.getName()}</p>
            </div>
            <div className = "subtask-bottom" style={{height:25}}>
                <p contentEditable={true} onBlur={handleBottomChange}>
                    {getMonthAndDay(props.subtask.getSubtaskDeadline())}</p>
                {/* <input type="date"></input> */}
            </div>
        </TaskNode>
    )
}