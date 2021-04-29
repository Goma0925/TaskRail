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
                <p className="no-side-bar-message">Nothing is selected</p>
            </div>;
            break;
        default:
            SideInfoBarContent = <div>
                <h1>Default Side Bar</h1>
            </div>
    }
        return <>{SideInfoBarContent}</>;
}
