import "./WithSubtaskSkin.css"
import {useState} from "react"
import {TaskNodeProps} from "../../TaskNode"
import TaskNode from "../../TaskNode"
import {produce} from "immer";

export default function WithSubtaskSkin(NodeToDecorate: React.ComponentType<TaskNodeProps>) 
{
    const wrapperComponent = (props: TaskNodeProps) => {
        // Copy the props and append a new skin class.
        var newProps = produce(props, draftProps=>{
            draftProps.className = "subtask-skin" + props.className? props.className: "";
        })
        return (
            <NodeToDecorate {...newProps}>
                {newProps.children}
                <p>Hello</p>
            </NodeToDecorate>
        )
    }
    return wrapperComponent;
}