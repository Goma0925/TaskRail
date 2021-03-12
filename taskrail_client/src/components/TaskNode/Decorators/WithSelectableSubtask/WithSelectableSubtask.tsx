import {TaskNodeProps} from "../../TaskNode"
import {produce} from "immer";
import SubTask from "../../../../models/Subtask";
import { SelectItem } from "../../../../redux/modules/RailUi/RailUiActions";
import { useDispatch, useSelector } from "react-redux";
import { RailUiSelection } from "../../../../redux/modules/RailUi/RailUiReducers";
import "./WithSelectableSubtask.css";

interface WithSelectableSubtaskProps{
    subtask: SubTask;
    railUiSelection: RailUiSelection;
}

export default function WithSelectableSubtask(NodeToDecorate: React.ComponentType<TaskNodeProps&WithSelectableSubtaskProps>) 
{
    const dispatch = useDispatch();
    const wrapperComponent = (props: TaskNodeProps&WithSelectableSubtaskProps) => {
        const onClickSubtask=()=>{
            console.log("Subtask clicked", props.subtask);
            dispatch(new SelectItem({type: "SUBTASK", itemId: props.subtask.getId()}));
        }
        
        //Check if this node is selected
        var className = "";
        if (props.railUiSelection.type=="SUBTASK" && props.railUiSelection.itemId==props.subtask.getId()){
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
        return (
            <NodeToDecorate {...newProps}>
                {newProps.children}
            </NodeToDecorate>
        )
    }
    return wrapperComponent;
}