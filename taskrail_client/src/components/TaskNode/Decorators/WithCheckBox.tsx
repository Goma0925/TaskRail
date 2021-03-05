import {useState} from "react"
import {TaskNodeProps} from "../TaskNode"
import TaskNode from "../TaskNode"

export default function WithCheckBox(NodeToDecorate: React.ComponentType<TaskNodeProps>) 
{
    const wrapperComponent = (props: TaskNodeProps) => {
        console.log("In withCheckBox", props);
        
        return (
            <NodeToDecorate {...props}>
                {props.children}
                <div className="checkbox-container">
                    <input type="checkbox"/>
                </div>
            </NodeToDecorate>
        )
    }
    return wrapperComponent;
}