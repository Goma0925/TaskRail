import { useDispatch } from "react-redux";
import {TaskNodeProps} from "../TaskNode"

export interface CheckBoxProps {
    onClick?: (event:React.MouseEvent) => void | (()=>{});
    nodeType?: String;
}

export default function WithCheckBox<GenericProps>(NodeToDecorate: React.ComponentType<GenericProps>) 
{
    const dispatch = useDispatch();
    const onClickComplete=()=>{

    }
    const wrapperComponent = (props: TaskNodeProps&CheckBoxProps&GenericProps) => { 
        return (
            <NodeToDecorate {...props}>
                {props.children}
                <div className="checkbox-container">
                    <input type="checkbox" className="float-checkbox" onClick={props.onClick}/>
                </div>
            </NodeToDecorate>
        )
    }
    return wrapperComponent;
}