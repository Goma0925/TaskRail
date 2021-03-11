import {TaskNodeProps} from "../../TaskNode"
import {produce} from "immer";
import SubTask from "../../../../models/Subtask";
import { SelectItem } from "../../../../redux/modules/RailUi/RailUiActions";
import { useDispatch } from "react-redux";

interface WithSelectableSubtaskProps{
    subtask: SubTask;
}

export default function WithSelectableSubtask(NodeToDecorate: React.ComponentType<TaskNodeProps&WithSelectableSubtaskProps>) 
{
    const dispatch = useDispatch();
    const wrapperComponent = (props: TaskNodeProps&WithSelectableSubtaskProps) => {
        const onClickSubtaskSkin=()=>{
            console.log("Subtask clicked", props.subtask);
            dispatch(new SelectItem({type: "SUBTASK", itemId: props.subtask.getId()}));
        }
        
        var newProps = produce(props, draftProps=>{
            draftProps.onClickHandlers = draftProps.onClickHandlers?draftProps.onClickHandlers:[];
            draftProps.onClickHandlers.push(onClickSubtaskSkin);
        })
        return (
            <NodeToDecorate {...newProps}>
                {newProps.children}
            </NodeToDecorate>
        )
    }
    return wrapperComponent;
}