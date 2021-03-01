// import "./test.css";

export interface TaskNodeProps {
    children?: React.ReactNode[] | React.ReactNode;
    width: number;
    className?: string;
}

const TaskNode:React.FC<TaskNodeProps> = (props: TaskNodeProps) => {
    var className = "node";
    className += props.className? " " + props.className: "";
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