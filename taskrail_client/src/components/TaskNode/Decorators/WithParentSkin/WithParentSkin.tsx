import {TaskNodeProps} from "../../TaskNode"
import {produce} from "immer";
import TaskParent from "../../../../models/TaskParent";
import "./WithParentSkin.css";

interface WithParentSkinProps{
    taskparent: TaskParent;
}

export default function WithParentSkin<GenericProps>(NodeToDecorate: React.ComponentType<GenericProps>) 
{
    const wrapperComponent = (props: TaskNodeProps&WithParentSkinProps&GenericProps) => {
        // Copy the props and append a new skin class.
        var newProps = produce(props, draftProps=>{
            draftProps.className = "parent-skin";
            draftProps.className += props.className? props.className: "";
        })
        console.log("in WithParentSkin", newProps);
        
        return (
            <NodeToDecorate {...newProps}>
                {newProps.children}
                <div className="taskparent-skin" style={{height:25}}>
                    Name: {props.taskparent.getName()}
                </div>
            </NodeToDecorate>
        )
    }
    return wrapperComponent;
}