import "./RailContainer.css";
import { useRef, useEffect, useState } from "react";
import Rail from "../../components/Rail/Rail";
import BackgroundWeekCalendar from "../../components/BackgroundWeekCalendar/BackgroundWeekCalendar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store"
import TaskParent from "../../models/TaskParent";

const RailContainer: React.FC = () => {
    const workspace = useSelector((state: RootState)=> state.taskData.currentWorkspace);
    var taskParents:{[id: string]: TaskParent } = {};
    if (workspace){
        taskParents = workspace.getTaskParents();
    }

    const keys = Object.keys(taskParents);
    return (
        <div className="rail-container">
            <BackgroundWeekCalendar/>
            {
                Object.keys(taskParents).map((id)=>{
                    return <Rail taskParent={taskParents[id]}></Rail>
                })

            }
        </div>
    );
}

export default RailContainer;