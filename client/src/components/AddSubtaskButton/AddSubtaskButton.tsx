import { useDispatch } from "react-redux";
import { classNameConcatenator } from "../../helpers/CssStyle";
import { createSubtaskOp } from "../../redux/modules/TaskData/TaskDataOperations";
import styles from "./AddSubtaskButton.module.css";

const classList = classNameConcatenator(styles);

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
        dispatch(createSubtaskOp("", props.taskParentId, props.assignedDate));
    }
    return (
        <div 
            className={styles["add-subtask-btn"]}
            onClick={addSubtask} 
            style={{width: props.width, height:props.height}}>
            <span className={classList(["plus-icon", "show-on-hover"])}>＋</span>
        </div>)
}