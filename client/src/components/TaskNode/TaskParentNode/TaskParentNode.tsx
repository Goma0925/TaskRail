import produce from "immer";
import React from "react";
import { useDispatch } from "react-redux";
import SubTask from "../../../models/ClientModels/Subtask";
import TaskParent from "../../../models/ClientModels/TaskParent";
import { SelectItem } from "../../../redux/modules/RailUi/RailUiActions";
import { RailUiSelection } from "../../../redux/modules/RailUi/RailUiReducers";
import { deleteTaskParentOp, updateTaskParentOp } from "../../../redux/modules/TaskData/TaskDataOperations";
import EditableTextbox from "../../CommonParts/EditableTextbox/EditableTextbox";
import TaskNode, { TaskNodeProps } from "../TaskNode";
import "./TaskParent.css";

interface TaskParentNodeProps {
    subtasks: SubTask[];
    taskParent: TaskParent;
    railUiSelection: RailUiSelection;
    children?: React.ReactNode[]|React.ReactNode;
}

type ComposedProps = TaskParentNodeProps & TaskNodeProps;

export default function TaskParentNode(props: ComposedProps){
    const dispatch = useDispatch();
    var className = "task-parent";

    // Append class name to switch appearence based on user interaction.
    const isSelected = props.railUiSelection.type=="TASKPARENT" && 
    props.railUiSelection.itemId==props.taskParent.getId();
    // If the node is selected, add selected class.
    if (isSelected){        
        className += " selected"
    }
    // Fade the node if the taskparent is complete.
    if (props.taskParent.isComplete()){
        className += " faded"
    }

    //Generate delete button class 
    var deleteButtonClass = "delete";
    deleteButtonClass += isSelected?"": " hide";

    const handleTaskParentClick = (event: React.MouseEvent<Element, MouseEvent>)=>{
        event.stopPropagation();
        selectTaskParent();
    }
    
    const selectTaskParent = ()=>{
        dispatch(new SelectItem({type: "TASKPARENT", itemId: props.taskParent.getId()}));
    }

    const submitCompletionStatus = (event: React.ChangeEvent) => {
        let updatedTaskParent = props.taskParent.getCopy();
        if (updatedTaskParent.isComplete()) {
            updatedTaskParent.uncompleteTask();
            // unfade all children
            props.subtasks.map((subtask)=>{
                let updatedSubtask = subtask.getCopy();
                /* Just refreshing it. */
                dispatch(updateTaskParentOp(updatedTaskParent));
            })
            /* stuck here right now ^ */
        } else {
            updatedTaskParent.completeTask();
            // fade all children
            props.subtasks.map((subtask)=>{
                let updatedSubtask = subtask.getCopy();
                /* Just refreshing it. */
                dispatch(updateTaskParentOp(updatedTaskParent));
            })
        }
        dispatch(updateTaskParentOp(updatedTaskParent));
        // Reselect the item so it does not unselect by rail container
        selectTaskParent();
    }

    const submitTitleChange = (title:string) => {
        let updatedTaskParent = props.taskParent.getCopy();
        updatedTaskParent.setName(title);
        dispatch(updateTaskParentOp(updatedTaskParent));
    }

    const deleteTaskParent=(e: React.MouseEvent)=>{
        e.preventDefault();
        const warningMessage = "Are you sure you want to delete the '" + props.taskParent.getName() + "'?";
        const deleteConfirmed = window.confirm(warningMessage);
        if (deleteConfirmed){
            dispatch(deleteTaskParentOp(props.taskParent.getId()));
            return;
        }
        // Reselect the item so it does not unselect by rail container
        selectTaskParent();
    }

    return <TaskNode
                width={props.width}
                className={className}
                >
                <div className="checkbox-container">
                    <input 
                        type="checkbox" 
                        className="float-checkbox" 
                        onChange={submitCompletionStatus}
                        checked={props.taskParent.isComplete()}
                    />
                </div>
                <div onClick={handleTaskParentClick} className="taskparent-content">
                    <EditableTextbox
                        className="taskparent-title-editor"
                        placeholder="Task Set"
                        updateTextTo={props.taskParent.getName()}
                        onSave={submitTitleChange}
                        unfocusOnEnterKey={true}
                    />
                </div>
                <a className={deleteButtonClass} onClick={deleteTaskParent}>×</a>
            </TaskNode>
}