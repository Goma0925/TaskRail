import "./RailContainer.css";
import { useRef, useEffect, useState, Fragment } from "react";
import Rail from "../../components/Rail/Rail";
import BackgroundWeekCalendar from "../../components/BackgroundWeekCalendar/BackgroundWeekCalendar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store"
import TaskParent from "../../models/TaskParent";
import AddTaskParentButton from "../../components/AddTaskParentButton/AddTaskParentButton";

const RailContainer: React.FC = () => {
    var taskParents:{[id: string]: TaskParent }|undefined = {};
    taskParents = useSelector((state: RootState)=> state.taskData.currentWorkspace?.getTaskParents());

    console.log("New taskparents:", taskParents);
    const railUiWidth = useSelector((state:RootState)=>state.railUi.railUiWidth)
    
    return (
        <div className="rail-container">
            <BackgroundWeekCalendar/>
            {
                Object.keys(taskParents?taskParents:{}).map((id)=>{
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
            <AddTaskParentButton></AddTaskParentButton>
        </div>
    );
}

export default RailContainer;