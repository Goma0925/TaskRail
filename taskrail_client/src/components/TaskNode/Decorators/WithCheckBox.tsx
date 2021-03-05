import {TaskNodeProps} from "../TaskNode"

export default function WithCheckBox(NodeToDecorate: React.ComponentType<TaskNodeProps>) 
{
    const wrapperComponent = (props: TaskNodeProps) => {        
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