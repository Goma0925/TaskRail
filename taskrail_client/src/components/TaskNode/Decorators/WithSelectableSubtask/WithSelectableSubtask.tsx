import {TaskNodeProps} from "../../TaskNode"
import {produce} from "immer";
import SubTask from "../../../../models/ClientModels/Subtask";
import { SelectItem } from "../../../../redux/modules/RailUi/RailUiActions";
import { RailUiSelection } from "../../../../redux/modules/RailUi/RailUiReducers";
import "./WithSelectableSubtask.css";
import { deleteSubtaskOp } from "../../../../redux/modules/TaskData/TaskDataOperations";
import { GenericType } from "typescript";
import { useDispatch } from "react-redux";
// import WithCheckBox from "../WithCheckBox";

export interface WithSelectableSubtaskProps{
    subtask: SubTask;
    railUiSelection: RailUiSelection;
}

interface TestProps{
    n: number
}

export default function WithSelectableSubtask<GenericProps>(NodeToDecorate: React.ComponentType<GenericProps>) 
{
    // NodeToDecorate = WithCheckBox(NodeToDecorate);
    const dispatch = useDispatch();
    const wrapperComponent = (props: TaskNodeProps&WithSelectableSubtaskProps&GenericProps) => {
        const isSelected = props.railUiSelection.type=="SUBTASK" && props.railUiSelection.itemId==props.subtask.getId();
        
        const onClickSubtask=()=>{
            dispatch(new SelectItem({type: "SUBTASK", itemId: props.subtask.getId()}));
        }
        const deleteSubtask=(e: React.MouseEvent)=>{
            dispatch(deleteSubtaskOp(props.subtask.getId()));
            e.preventDefault();
        }
        
        //Check if this node is selected
        var className = "";
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
        )
    }
    return wrapperComponent;
}