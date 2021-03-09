import { useDispatch } from "react-redux";
import { createSubtaskOnRailOp } from "../../redux/modules/Pagination/PaginationOperations";
import "./AddSubtaskButton.css";

interface AddSubtaskButtonProps{
    taskParentId: string;
    assignedDate: Date;
}

export default function AddSubtaskButton(props: AddSubtaskButtonProps){
    const dispatch = useDispatch();
    const addSubtask = (event:React.MouseEvent<HTMLDivElement>)=>{
        // Add a new subtask on click        
        createSubtaskOnRailOp("New task", props.taskParentId, props.assignedDate);
    }
    return (
        <div className="add-subtask-btn" onClick={addSubtask}>
            <span className="plus-icon show-on-hover">＋</span>
        </div>)
}