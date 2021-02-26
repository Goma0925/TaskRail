export interface TaskNodeProps {
    children?: React.ReactNode[] | React.ReactNode;
    width: number;
}

const TaskNode:React.FC<TaskNodeProps> = (props: TaskNodeProps) => {
    return (
        <div class-name="node" style={{width:props.width, height:50}} >
            {props.children}
        </div>
    )
}

export default TaskNode;