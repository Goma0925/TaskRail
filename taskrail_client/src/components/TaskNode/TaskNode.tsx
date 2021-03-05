import { MutableRefObject } from "react";
import { Ref } from "react";
import "./test.css";

export interface TaskNodeProps {
    className?: string;
    children?: React.ReactNode[] | React.ReactNode;
    width: number;
}

const TaskNode:React.FC<TaskNodeProps> = (props: TaskNodeProps) => {
    console.log("in TaskNode", props.width);
    
    return (
        <div className={"node "+props.className} style={{width:props.width, height:50}} >
            {props.children}
        </div>
    )
}

export default TaskNode;