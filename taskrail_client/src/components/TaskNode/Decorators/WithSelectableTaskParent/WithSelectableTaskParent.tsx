import {TaskNodeProps} from "../../TaskNode"
import {produce} from "immer";
import { SelectItem } from "../../../../redux/modules/RailUi/RailUiActions";
import { RailUiSelection } from "../../../../redux/modules/RailUi/RailUiReducers";
import { useDispatch } from "react-redux";
import { deleteTaskParentOp, updateTaskParentOp } from "../../../../redux/modules/TaskData/TaskDataOperations";
import TaskParent from "../../../../models/ClientModels/TaskParent";
import "./WithSelectableTaskParent.css";

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

        function onChangeName(event: any) {
            let updatedTaskParent = props.taskParent.getCopy();
            updatedTaskParent.setName(event.target.textContent);
            dispatch(updateTaskParentOp(updatedTaskParent));
        }

        var deleteButtonClass = "delete";
        deleteButtonClass += isSelected?"": " hide";
        return (
            <NodeToDecorate {...newProps}>
                {/* {newProps.children} */}
                <div className="taskparent-skin" style={{height:25}}>
                    <p 
                        contentEditable={true} 
                        onBlur={onChangeName}
                        suppressContentEditableWarning={true}
                    >
                        {props.taskParent.getName()}
                    </p>
                </div>
                <a className={deleteButtonClass} onClick={deleteTaskParent}>×</a>
                {props.children}
            </NodeToDecorate>
        );
    }
    return wrapperComponent;
}