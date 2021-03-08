import { useDispatch } from "react-redux";
import TaskParent from "../../models/TaskParent";
import { CreateTaskParentOp } from "../../redux/modules/TaskData/TaskDataOperations";
import "./AddTaskParentButton.css";

export default function AddTaskParentButton(){
    const dispatch = useDispatch();
    const addTaskParent = (event:React.MouseEvent<HTMLButtonElement>)=>{
        // Add a new subtask on click        
        CreateTaskParentOp("New taskset");
    }
    return (
        <button className="add-taskparent" onClick={addTaskParent}>
            <span>Add new task set</span>
        </button>
        )
}