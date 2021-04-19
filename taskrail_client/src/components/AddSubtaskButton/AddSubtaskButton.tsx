import { useDispatch } from "react-redux";
import { createSubtaskOp } from "../../redux/modules/TaskData/TaskDataOperations";
import "./AddSubtaskButton.css";

interface AddSubtaskButtonProps{
    taskParentId: string;
    assignedDate: Date;
    width: number;
    height: number;
}

export default function AddSubtaskButton(props: AddSubtaskButtonProps){
    const dispatch = useDispatch();
    const addSubtask = (event:React.MouseEvent<HTMLDivElement>)=>{
        // Add a new subtask on click        
        dispatch(createSubtaskOp("Task step", props.taskParentId, props.assignedDate));
    }
    return (
        <div 
            className="add-subtask-btn" 
            onClick={addSubtask} 
            style={{width: props.width, height:props.height}}>
            <span className="plus-icon show-on-hover">＋</span>
        </div>)
}