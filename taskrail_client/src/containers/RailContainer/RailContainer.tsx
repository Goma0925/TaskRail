import "./RailContainer.css";
import { useRef, useEffect, useState, Fragment } from "react";
import Rail from "../../components/Rail/Rail";
import BackgroundWeekCalendar from "../../components/BackgroundWeekCalendar/BackgroundWeekCalendar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store"
import AddTaskParentButton from "../../components/AddTaskParentButton/AddTaskParentButton";
import { SetSubtaskNodeWidth } from "../../redux/modules/RailUi/RailUiActions";

const RailContainer: React.FC = () => {
    // Get subtasks and task parents
    const taskParentIds = useSelector((state: RootState)=> state.taskData.taskParents.allIds);
    const taskParentsById = useSelector((state: RootState)=> state.taskData.taskParents.byId);
    const subtasksById = useSelector((state:RootState)=>{
        return state.taskData.subtasks.byId;
    });

    // Define task nodes sizes
    const railUi = useSelector((state:RootState)=>state.railUi);
    const outerContainerWidth = railUi.railUiWidth;
    const taskParentNodeWidth = 100;
    const minSubtaskNodeWidth = 100;
    const calculatedSubtaskNodeWidth = (outerContainerWidth - taskParentNodeWidth) / 7;  
    const subtaskNodeWidth =  calculatedSubtaskNodeWidth > minSubtaskNodeWidth? calculatedSubtaskNodeWidth : minSubtaskNodeWidth;

    // Retrieve other necessary info for Rail from redux.
    const railUiSelection = useSelector((state: RootState)=>state.railUi.selection);
    const displayRangeStartDate = useSelector((state:RootState)=>state.railUi.displayRangeStartDate);

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(new SetSubtaskNodeWidth(subtaskNodeWidth));
    });
    return (
        <div className="rail-container">
            <BackgroundWeekCalendar 
                subtaskNodeWidth={railUi.subtaskNodeWidth}
                displayRangeStartDate={displayRangeStartDate}
            />
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
    );
}

export default RailContainer;