import "./RailContainer.css";
import { useRef, useEffect, useState, Fragment } from "react";
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
    };
    const railUiWidth = useSelector((state:RootState)=>state.railUi.railUiWidth)


    const keys = Object.keys(taskParents);
    return (
        <div className="rail-container">
            <BackgroundWeekCalendar/>
            {
                Object.keys(taskParents).map((id)=>{
                    return (
                        <Fragment key={id}>
                            <Rail 
                                taskParent={taskParents[id]} 
                                outerContainerWidth={railUiWidth}
                                key={id}
                            ></Rail> 
                        </Fragment>
                    );
                })

            }
        </div>
    );
}

export default RailContainer;