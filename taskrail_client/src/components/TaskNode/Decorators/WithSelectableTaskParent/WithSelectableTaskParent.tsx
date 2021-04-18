import {TaskNodeProps} from "../../TaskNode"
import {produce} from "immer";
import { SelectItem } from "../../../../redux/modules/RailUi/RailUiActions";
import { RailUiSelection } from "../../../../redux/modules/RailUi/RailUiReducers";
import { useDispatch } from "react-redux";
import { deleteTaskParentOp, updateTaskParentOp } from "../../../../redux/modules/TaskData/TaskDataOperations";
import TaskParent from "../../../../models/ClientModels/TaskParent";
import React from "react";
import EditableTextbox from "../../../CommonParts/EditableTextbox/EditableTextbox";

export interface WithSelectableTaskParentProps{
    taskParent: TaskParent;
    railUiSelection: RailUiSelection;
    children?: React.ReactNode[]|React.ReactNode;
}

export default function WithSelectableTaskParent<GenericProps>(NodeToDecorate: React.ComponentType<GenericProps>) 
{
    const dispatch = useDispatch();
    const wrapperComponent = (props: TaskNodeProps&WithSelectableTaskParentProps&GenericProps) => {
        const isSelected = props.railUiSelection.type=="TASKPARENT" && props.railUiSelection.itemId==props.taskParent.getId();
        const onClickSubtask=()=>{
            dispatch(new SelectItem({type: "TASKPARENT", itemId: props.taskParent.getId()}));
        }
        const deleteTaskParent=(e: React.MouseEvent)=>{
            e.preventDefault();
            dispatch(deleteTaskParentOp(props.taskParent.getId()));
        }
        
        //Check if this node is selected
        var className = "task-parent";
        if (isSelected){
            className += " selected"
        }
        //Update props
        var newProps = produce(props, draftProps=>{
            draftProps.onClickHandlers = draftProps.onClickHandlers?draftProps.onClickHandlers:[];
            draftProps.onClickHandlers.push(onClickSubtask);
            // Append className
            draftProps.className = className;
            draftProps.className += props.className? props.className: "";
        });

        function submitTitleChange(title:string) {
            let updatedTaskParent = props.taskParent.getCopy();
            updatedTaskParent.setName(title);
            dispatch(updateTaskParentOp(updatedTaskParent));
        }

        var deleteButtonClass = "delete";
        deleteButtonClass += isSelected?"": " hide";
        return (
            <NodeToDecorate {...newProps}>
                {/* {newProps.children} */}
                <EditableTextbox
                    className="taskparent-title-editor"
                    updateTextTo={props.taskParent.getName()}
                    onSave={submitTitleChange}
                    unfocusOnEnterKey={true}
                    noLineBreak={true}
                />
                <a className={deleteButtonClass} onClick={deleteTaskParent}>×</a>
                {props.children}
            </NodeToDecorate>
        );
    }
    return wrapperComponent;
}