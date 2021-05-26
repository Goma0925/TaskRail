import { useDispatch } from "react-redux";
import { classNameConcatenator } from "../../helpers/CssStyle";
import { SelectItem } from "../../redux/modules/RailUi/RailUiActions";
import { createTaskParentOp } from "../../redux/modules/TaskData/TaskDataOperations";
import styles from "./AddTaskParentButton.module.css";

const classList = classNameConcatenator(styles);

export default function AddTaskParentButton(){
    const dispatch = useDispatch();
    const addTaskParent = (event:React.MouseEvent<HTMLButtonElement>)=>{        
        dispatch(createTaskParentOp(""));
    }
    return (
        <button className={classList(["add-taskparent-button", "is-primary"])} onClick={addTaskParent}>
            <span>New Task Set</span>
        </button>
        )
}