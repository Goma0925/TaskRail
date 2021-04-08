import { useDispatch } from "react-redux";
import { createSubtaskOp } from "../../redux/modules/TaskData/TaskDataOperations";
import "./AddSubtaskButton.css";

interface AddSubtaskButtonProps{
    taskParentId: string;
    assignedDate: Date;
}

export default function AddSubtaskButton(props: AddSubtaskButtonProps){
    const dispatch = useDispatch();
    const addSubtask = (event:React.MouseEvent<HTMLDivElement>)=>{
        // Add a new subtask on click        
        dispatch(createSubtaskOp("New task 1", props.taskParentId, props.assignedDate));
    }
    return (
        <div className="add-subtask-btn" onClick={addSubtask}>
            <span className="plus-icon show-on-hover">＋</span>
        </div>)
}