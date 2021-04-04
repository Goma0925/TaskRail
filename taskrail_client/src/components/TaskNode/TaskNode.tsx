import Subtask from "../../models/Subtask";
import React from 'react';

export interface TaskNodeProps {
    className?: string;
    children?: React.ReactNode[] | React.ReactNode;
    width: number;
    height?: number;
    onClick?: (event:React.MouseEvent) => void | (()=>{});
    onClickHandlers?: ((event:React.MouseEvent) => void | (()=>{}))[];
}

const TaskNode:React.FC<TaskNodeProps> = (props: TaskNodeProps) => {  
    var className = "node";
    className += props.className? " " + props.className: "";
    
    // Accumulate all the event handler functions passed in.
    const onClickHandlers:((event:React.MouseEvent) => void | (()=>{}))[] = [];
    if (props.onClickHandlers){
        props.onClickHandlers.map((handler)=>onClickHandlers.push(handler));
    }
    if (props.onClick){
        onClickHandlers.push(props.onClick);
    }
    // Event listener to run all the event handlers
    const onClick = (e: React.MouseEvent)=>{
        if (props.onClickHandlers){
            props.onClickHandlers.map((handler)=>{
                handler(e);
            });
        };
    };
    return (
        <div className={className} style={{width:props.width, height:props.height || 50}} onClick={onClick}>
            {props.children}
        </div>
    )
}

export default TaskNode;