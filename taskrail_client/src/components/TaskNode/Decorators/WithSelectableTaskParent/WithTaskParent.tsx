import {TaskNodeProps} from "../../TaskNode"
import {produce} from "immer";
import { SelectItem } from "../../../../redux/modules/RailUi/RailUiActions";
import { RailUiSelection } from "../../../../redux/modules/RailUi/RailUiReducers";
import { useDispatch } from "react-redux";
import { deleteTaskParentOp } from "../../../../redux/modules/TaskData/TaskDataOperations";
import TaskParent from "../../../../models/TaskParent";
import "./WithSelectableTaskParent.css";

interface WithSelectableTaskParentProps{
    taskParent: TaskParent;
    railUiSelection: RailUiSelection;
}

export default function WithSelectableTaskParent(NodeToDecorate: React.ComponentType<TaskNodeProps&WithSelectableTaskParentProps>) 
{
    const dispatch = useDispatch();
    const wrapperComponent = (props: TaskNodeProps&WithSelectableTaskParentProps) => {
        const isSelected = props.railUiSelection.type=="TASKPARENT" && props.railUiSelection.itemId==props.taskParent.getId();
        
        const onClickSubtask=()=>{
            if (isSelected){
                dispatch(new SelectItem({type: "NONE", itemId: ""}));
            }else{
                dispatch(new SelectItem({type: "TASKPARENT", itemId: props.taskParent.getId()}));
            }
        }
        const deleteSubtask=(e: React.MouseEvent)=>{
            e.preventDefault();
            deleteTaskParentOp(props.taskParent.getId());
        }
        
        //Check if this node is selected
        var className = "task-parent-test-class";
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

        var deleteButtonClass = "delete";
        deleteButtonClass += isSelected?"": " hide";
        return (
            <NodeToDecorate {...newProps}>
                {newProps.children}
                <a className={deleteButtonClass} onClick={deleteSubtask}>×</a>
            </NodeToDecorate>
        );
    }
    return wrapperComponent;
}