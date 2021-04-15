import React from "react";
import { useDispatch, useSelector } from "react-redux";
import WeekPaginationButton from "../../components/BackgroundWeekCalendar/CalendarPagination/WeekPaginationButton";
import { RootState } from "../../redux/store";
import { AppDispatch } from "../../redux/redux-utils/ReduxUtils";
import "./NavBar.css";
import * as Actions from "../../redux/modules/TaskData/TaskDataActions";
import Workspace from "../../models/ClientModels/Workspace";
import TaskParent from "../../models/ClientModels/TaskParent";
import * as operations from "../../redux/modules/TaskData/TaskDataOperations";

export default function NavBar() {
  const displayRangeStartDate = useSelector((state: RootState) => {
    return state.pagination.displayRangeStartDate;
  });
  const workspaceName = useSelector((state: RootState) => {
    return state.taskData.workspaces.currentWorkspace?.getName();
  });
  const dispatch = useDispatch();
  const dispatchAddWorkspace = () => {
    const newWorkspace = new Workspace("Test Workspace", "202", []);

    dispatch(new Actions.AddWorkspace(newWorkspace));
  };
  const dispatchDeleteWorkspace = () => {
    dispatch(new Actions.DeleteWorkspace("202"));
  };
  const dispatchUpdateWorkspace = () => {
    const updatedWorkspace = new Workspace("Changed Workspace", "202", ["303"]);
    dispatch(new Actions.UpdateWorkspace(updatedWorkspace));
  };
  return (
    <div className="nav">
      <div className="title">{workspaceName}</div>
      <WeekPaginationButton
        displayRangeStartDate={displayRangeStartDate}
      ></WeekPaginationButton>
      <input
        type="button"
        value="Add Workspace"
        onClick={dispatchAddWorkspace}
      />
      <input
        type="button"
        value="Delete Workspace"
        onClick={dispatchDeleteWorkspace}
      />
      <input
        type="button"
        value="Update Workspace"
        onClick={dispatchUpdateWorkspace}
      />
    </div>
  );
}
