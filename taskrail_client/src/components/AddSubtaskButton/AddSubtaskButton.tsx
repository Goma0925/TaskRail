import { useDispatch } from "react-redux";
import TaskParent from "../../models/TaskParent";
import { CreateSubtaskOp } from "../../redux/modules/Pagination/PaginationOperations";
import { CreateSubtask } from "../../redux/modules/TaskData/TaskDataActions";
import "./AddSubtaskButton.css";

interface AddSubtaskButtonProps{
    taskParentId: string;
    assignedDate: Date;
}

export default function AddSubtaskButton(props: AddSubtaskButtonProps){
    const dispatch = useDispatch();
    const addSubtask = (event:React.MouseEvent<HTMLDivElement>)=>{
        // Add a new subtask on click        
        CreateSubtaskOp("New task", props.taskParentId, props.assignedDate);
    }
    return (
        <div className="add-subtask-btn" onClick={addSubtask}>
            <span className="plus-icon show-on-hover">＋</span>
        </div>)
}