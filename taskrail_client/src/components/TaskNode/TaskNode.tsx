import Subtask from "../../models/Subtask";
import React from 'react';

export interface TaskNodeProps {
    className?: string;
    children?: React.ReactNode[] | React.ReactNode;
    width: number;
}

const TaskNode:React.FC<TaskNodeProps> = (props: TaskNodeProps) => {    
    return (
        <div 
            className={"node "+props.className} 
            style={{width:props.width, height:50}} 
        >
            {props.children}
        </div>
    )
}

export default TaskNode;