import "./WithSubtaskSkin.css"
import {useState} from "react"
import {TaskNodeProps} from "../../TaskNode"
import TaskNode from "../../TaskNode"

export default function WithSubtaskSkin(NodeToDecorate: React.ComponentType<TaskNodeProps>) 
{
    const wrapperComponent = (props: TaskNodeProps) => {
        return (
            <NodeToDecorate {...props}>
                {props.children}
            </NodeToDecorate>
        )
    }
    return wrapperComponent;
}