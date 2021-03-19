import "./RailContainer.css";
import { useRef, useEffect, useState, Fragment } from "react";
import Rail from "../../components/Rail/Rail";
import BackgroundWeekCalendar from "../../components/BackgroundWeekCalendar/BackgroundWeekCalendar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store"
import AddTaskParentButton from "../../components/AddTaskParentButton/AddTaskParentButton";

const RailContainer: React.FC = () => {
    // Get subtasks and task parents
    const taskParentIds = useSelector((state: RootState)=> state.taskData.taskParents.allIds);
    const taskParentsById = useSelector((state: RootState)=> state.taskData.taskParents.byId);
    const subtasksById = useSelector((state:RootState)=>{
        return state.taskData.subtasks.byId;
    });

    // Define task nodes sizes
    const railUi = useSelector((state:RootState)=>state.railUi);
    const taskParentNodeWidth = railUi.taskParentNodeWidth;
    const subtaskNodeWidth =  railUi.subtaskNodeWidth;

    // Retrieve other necessary info for Rail from redux.
    const railUiSelection = useSelector((state: RootState)=>state.railUi.selection);
    const displayRangeStartDate = useSelector((state:RootState)=>state.railUi.displayRangeStartDate);

    const dispatch = useDispatch();
    return (
        <div className="rail-view-panel">
            <BackgroundWeekCalendar 
            subtaskNodeWidth={railUi.subtaskNodeWidth}
            displayRangeStartDate={displayRangeStartDate}
            />
            <div className="rail-container">
                {   
                    taskParentIds.map((id)=>{
                        const currentFrameSubtaskIds = taskParentsById[id].getSubtaskIdsFromCurrentFrame();
                        const sortedSubtasks = currentFrameSubtaskIds.map(id=>subtasksById[id]);
                        return (
                            <Fragment key={id}>
                                <Rail 
                                    taskParent={taskParentsById[id]} 
                                    sortedSubtasks={sortedSubtasks}
                                    railUiSelection={railUiSelection}
                                    displayRangeStartDate={displayRangeStartDate}
                                    subtaskNodeWidth={subtaskNodeWidth}
                                    taskParentNodeWidth={taskParentNodeWidth}
                                    key={id}
                                ></Rail> 
                            </Fragment>
                        );
                    })
                }
                <AddTaskParentButton></AddTaskParentButton>
            </div>
        </div>
    );
}

export default RailContainer;