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
        const isSelected = props.railUiSelection.type=="SUBTASK" && props.railUiSelection.itemId==props.subtask.getId();
        console.log("selected", isSelected);
        
        const onClickSubtask=()=>{
            if (isSelected){
                dispatch(new SelectItem({type: "NONE", itemId: ""}));
            }else{
                dispatch(new SelectItem({type: "SUBTASK", itemId: props.subtask.getId()}));
            }
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
        return (
            <NodeToDecorate {...newProps}>
                {newProps.children}
            </NodeToDecorate>
        )
    }
    return wrapperComponent;
}