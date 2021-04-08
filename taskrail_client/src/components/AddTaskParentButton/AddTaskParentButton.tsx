import { useDispatch } from "react-redux";
import { createTaskParentOp } from "../../redux/modules/TaskData/TaskDataOperations";
import "./AddTaskParentButton.css";

export default function AddTaskParentButton(){
    const dispatch = useDispatch();
    const addTaskParent = (event:React.MouseEvent<HTMLButtonElement>)=>{        
        dispatch(createTaskParentOp("New taskset"));
    }
    return (
        <button className="add-taskparent" onClick={addTaskParent}>
            <span>Add new task set</span>
        </button>
        )
}