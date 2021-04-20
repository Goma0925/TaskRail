import { useDispatch } from "react-redux";
import { SelectItem } from "../../redux/modules/RailUi/RailUiActions";
import { createTaskParentOp } from "../../redux/modules/TaskData/TaskDataOperations";
import "./AddTaskParentButton.css";

export default function AddTaskParentButton(){
    const dispatch = useDispatch();
    const addTaskParent = (event:React.MouseEvent<HTMLButtonElement>)=>{        
        dispatch(createTaskParentOp(""));
    }
    return (
        <button className="add-taskparent-button is-primary" onClick={addTaskParent}>
            <span>New Task Set</span>
        </button>
        )
}