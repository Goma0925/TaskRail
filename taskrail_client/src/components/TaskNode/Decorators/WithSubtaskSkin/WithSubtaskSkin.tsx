import "./WithSubtaskSkin.css"
import {TaskNodeProps} from "../../TaskNode"
import {produce} from "immer";
import SubTask from "../../../../models/Subtask";

interface WithSubtaskSkinProps{
    subtask: SubTask;
}

export default function WithSubtaskSkin<GenericProps>(NodeToDecorate: React.ComponentType<GenericProps>) 
{
    const wrapperComponent = (props: TaskNodeProps&WithSubtaskSkinProps&GenericProps) => {
        // Copy the props and append a new skin class.
        var newProps = produce(props, draftProps=>{
            draftProps.className = "subtask-skin";
            draftProps.className += props.className? props.className: "";
        })
        
        return (
            <NodeToDecorate {...newProps}>
                {newProps.children}
                {/* <div className="subtask-top" style={{height:25, width:props.width-20}}> */}
                <div className="subtask-top" style={{height:25}}>
                    {props.subtask.getName()}
                </div>
                {/* <div className = "subtask-bottom" style={{height:25, width:props.width-20}}> */}
                <div className = "subtask-bottom" style={{height:25}}>
                    {props.subtask.getId()}
                </div>
            </NodeToDecorate>
        )
    }
    return wrapperComponent;
}