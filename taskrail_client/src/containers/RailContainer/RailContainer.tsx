import "./RailContainer.css";
import React, { useRef, useEffect, useState, Fragment } from "react";
import Rail from "../../components/Rail/Rail";
import BackgroundWeekCalendar from "../../components/BackgroundWeekCalendar/BackgroundWeekCalendar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AddTaskParentButton from "../../components/AddTaskParentButton/AddTaskParentButton";
import { SelectItem } from "../../redux/modules/RailUi/RailUiActions";

const RailContainer: React.FC = () => {
  const dispatch = useDispatch();
  // Get subtasks and task parents
  const taskParentIds = useSelector(
    (state: RootState) => state.taskData.taskParents.allIds
  );
  const taskParentsById = useSelector(
    (state: RootState) => state.taskData.taskParents.byId
  );
  const subtasksById = useSelector((state: RootState) => {
    return state.taskData.subtasks.byId;
  });

  // Define task nodes sizes
  const railUi = useSelector((state: RootState) => state.railUi);
  const taskParentNodeWidth = railUi.taskParentNodeWidth;
  const subtaskNodeWidth = railUi.subtaskNodeWidth;
  const calendarBorderWidth = railUi.calendarBorderWidth;
  const taskParentSectionWidth = railUi.taskParentSectionWidth;

  // Retrieve other necessary info for Rail from redux.
  const railUiSelection = useSelector(
    (state: RootState) => state.railUi.selection
  );
  const displayRangeStartDate = useSelector(
    (state: RootState) => state.pagination.displayRangeStartDate
  );
  
  const unSelectItem = (event: React.MouseEvent) => {    
    dispatch(new SelectItem({type: "NONE", itemId: ""}));
  }

  return (
    <div className="rail-view-panel" onClick={unSelectItem}>
      <BackgroundWeekCalendar
        subtaskNodeWidth={railUi.subtaskNodeWidth}
        taskParentSectionWidth={railUi.taskParentSectionWidth}
        displayRangeStartDate={displayRangeStartDate}
        calendarBorderWidth={calendarBorderWidth}
      />
      <div className="rail-container">
        {taskParentIds.map((id) => {
          const currentFrameSubtaskIds = taskParentsById[
            id
          ].getSubtaskIdsFromCurrentFrame();
          const subtasks = currentFrameSubtaskIds.map(
            (id) => subtasksById[id]
          );
          
          return (
            <Fragment key={id}>
              <Rail
                taskParent={taskParentsById[id]}
                subtasks={subtasks}
                railUiSelection={railUiSelection}
                displayRangeStartDate={displayRangeStartDate}
                subtaskNodeWidth={subtaskNodeWidth}
                taskParentNodeWidth={taskParentNodeWidth}
                taskParentSectionWidth={taskParentSectionWidth}
                key={id}
              ></Rail>
              <hr className="rail-divider"/>
            </Fragment>
          );
        })}
        <AddTaskParentButton></AddTaskParentButton>
      </div>
    </div>
  );
};

export default RailContainer;
