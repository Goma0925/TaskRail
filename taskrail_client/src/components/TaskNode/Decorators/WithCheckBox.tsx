import {TaskNodeProps} from "../TaskNode"

export default function WithCheckBox(NodeToDecorate: React.ComponentType<TaskNodeProps>) 
{
    const wrapperComponent = (props: TaskNodeProps) => {        
        return (
            <NodeToDecorate {...props}>
                {props.children}
                <input type="checkbox" name="vehicle1" value="Bike"/>
            </NodeToDecorate>
        )
    }
    return wrapperComponent;
}