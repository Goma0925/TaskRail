import { useSelector } from "react-redux";
import Subtask from "../../models/Subtask";
import TaskParent from "../../models/TaskParent";
import { RootState } from "../../redux/store";
import SubtaskInfoBar from "./SubtaskInfoBar";

export default function SideInfoBarContainer() {
    const [selectionType, itemId] = useSelector((state:RootState)=>{
        return [state.railUi.selection.type, state.railUi.selection.itemId];
    })
    // switch(selectionType){
    //     case "SUBTASK":
    //         return (
    //             <SubtaskInfoBar></SubtaskInfoBar>
    //         )
    //     break;
    // }
        // const taskParents = useSelector((state:RootState)=>{
        //     return state.taskData.currentWorkspace?.getTaskParent()
        // })
    var subtask_obj = useSelector((state:RootState)=>{
        return state.taskData.subtasks.byId[itemId];
    })
    var Subtask:React.ReactNode;
    switch (selectionType){
        case "SUBTASK":
            Subtask = <SubtaskInfoBar subtask={subtask_obj}/>
            break;
        case "TASKPARENT":
            Subtask = <div>
                <h1>TaskParent Side Bar</h1>
            </div>
            break;
        case "NONE":
            Subtask = <div>
                <h1>None Side Bar</h1>
            </div>;
            break;
        default:
            Subtask = <div>
                <h1>Default Side Bar</h1>
            </div>
    }
        return(
            <div>{Subtask}</div>
        )
    // }
}
