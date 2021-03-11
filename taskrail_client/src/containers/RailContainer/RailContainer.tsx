import "./RailContainer.css";
import { useRef, useEffect, useState, Fragment } from "react";
import Rail from "../../components/Rail/Rail";
import BackgroundWeekCalendar from "../../components/BackgroundWeekCalendar/BackgroundWeekCalendar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store"
import TaskParent from "../../models/TaskParent";
import AddTaskParentButton from "../../components/AddTaskParentButton/AddTaskParentButton";

const RailContainer: React.FC = () => {
    // var taskParents:{[id: string]: TaskParent } = {};
    const taskParentIds = useSelector((state: RootState)=> state.taskData.taskParents.allIds);
    const taskParentsById = useSelector((state: RootState)=> state.taskData.taskParents.byId);
    const subtasksById = useSelector((state:RootState)=>{
        return state.taskData.subtasks.byId;
    });


    const railUiWidth = useSelector((state:RootState)=>state.railUi.railUiWidth)
    return (
        <div className="rail-container">
            <BackgroundWeekCalendar/>
            {   
                taskParentIds.map((id)=>{
                    const currentFrameSubtaskIds = taskParentsById[id].getSubtaskIdsFromCurrentFrame();
                    const sortedSubtasks = currentFrameSubtaskIds.map(id=>subtasksById[id]);
                    return (
                        <Fragment key={id}>
                            <Rail 
                                taskParent={taskParentsById[id]} 
                                sortedSubtasks={sortedSubtasks}
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