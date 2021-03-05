import "./WithSubtaskSkin.css"
import {TaskNodeProps} from "../../TaskNode"
import {produce} from "immer";
import SubTask from "../../../../models/Subtask";

interface WithSubtaskSkinProps{
    subtask: SubTask;
}

export default function WithSubtaskSkin(NodeToDecorate: React.ComponentType<TaskNodeProps&WithSubtaskSkinProps>) 
{
    const wrapperComponent = (props: TaskNodeProps&WithSubtaskSkinProps) => {
        // Copy the props and append a new skin class.
        var newProps = produce(props, draftProps=>{
            draftProps.className = "subtask-skin";
            draftProps.className += props.className? props.className: "";
        })
        console.log("in WithSubtaskSkin", newProps);
        
        return (
            <NodeToDecorate {...newProps}>
                {newProps.children}
                <p>Hello</p>
            </NodeToDecorate>
        )
    }
    return wrapperComponent;
}