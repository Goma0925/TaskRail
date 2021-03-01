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
                <input type="checkbox" name="vehicle1" value="Bike"/>
            </NodeToDecorate>
        )
    }
    return wrapperComponent;
}