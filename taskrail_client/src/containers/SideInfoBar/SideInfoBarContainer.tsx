import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SubtaskInfoBar from "./SubtaskInfoBar";
import TaskParentInfoBar from "./TaskParentInfoBar";

export default function SideInfoBarContainer() {
    const [selectionType, itemId] = useSelector((state:RootState)=>{
        return [state.railUi.selection.type, state.railUi.selection.itemId];
    })

    const subtask = useSelector((state:RootState)=>state.taskData.subtasks.byId[itemId]);
    const taskParent = useSelector((state: RootState)=>state.taskData.taskParents.byId[itemId]);
    var SideInfoBarContent:React.ReactNode;
    switch (selectionType){
        case "SUBTASK":
            SideInfoBarContent = <SubtaskInfoBar subtask={subtask}/>
            break;
        case "TASKPARENT":
            SideInfoBarContent = <TaskParentInfoBar taskParent={taskParent}></TaskParentInfoBar>
            break;
        case "NONE":
            SideInfoBarContent = <div>
                <h1>None Side Bar</h1>
            </div>;
            break;
        default:
            SideInfoBarContent = <div>
                <h1>Default Side Bar</h1>
            </div>
    }
        return(
            <div>{SideInfoBarContent}</div>
        )
    // }
}
