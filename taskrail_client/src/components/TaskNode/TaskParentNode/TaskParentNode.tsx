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
    
    const selectTaskParent = (event: React.MouseEvent<Element, MouseEvent>)=>{
        dispatch(new SelectItem({type: "TASKPARENT", itemId: props.taskParent.getId()}));
        event.stopPropagation();
    }

    const onClickCheckbox = (event: React.ChangeEvent) => {
        event.stopPropagation();
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
        if (isSelected){
            dispatch(new SelectItem({type: "TASKPARENT", itemId: props.taskParent.getId()}));
        }
    }

    const submitTitleChange = (title:string) => {
        let updatedTaskParent = props.taskParent.getCopy();
        updatedTaskParent.setName(title);
        dispatch(updateTaskParentOp(updatedTaskParent));
    }

    const deleteTaskParent=(e: React.MouseEvent)=>{
        e.preventDefault();
        dispatch(deleteTaskParentOp(props.taskParent.getId()));
    }

    return <TaskNode
                width={props.width}
                className={className}
                >
                <div className="checkbox-container">
                    <input 
                        type="checkbox" 
                        className="float-checkbox" 
                        onChange={onClickCheckbox}
                        checked={props.taskParent.isComplete()}
                    />
                </div>
                <div onClick={selectTaskParent} className="taskparent-content">
                    <EditableTextbox
                        className="taskparent-title-editor"
                        updateTextTo={props.taskParent.getName()}
                        onSave={submitTitleChange}
                        unfocusOnEnterKey={true}
                    />
                </div>
                <a className={deleteButtonClass} onClick={deleteTaskParent}>×</a>
            </TaskNode>
}