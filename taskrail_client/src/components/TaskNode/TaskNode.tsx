import Subtask from "../../models/Subtask";
import React from 'react';

export interface TaskNodeProps {
    className?: string;
    children?: React.ReactNode[] | React.ReactNode;
    width: number;
    onClick?: (event:React.MouseEvent<HTMLDivElement>) => void | (()=>{});
}

const TaskNode:React.FC<TaskNodeProps> = (props: TaskNodeProps) => {    
    var className = "node";
    className += props.className? " " + props.className: "";
    console.log(className);
    
    // if (props.className){
    //     className += " " + props.className;
    // }
    return (
        <div className={className} style={{width:props.width, height:50}} >
            {props.children}
        </div>
    )
}

export default TaskNode;