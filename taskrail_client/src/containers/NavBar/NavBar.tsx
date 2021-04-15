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
import Login from "../../components/GoogleAuth/Login";

export default function NavBar() {
  const displayRangeStartDate = useSelector((state: RootState) => {
    return state.pagination.displayRangeStartDate;
  });
  const workspaceName = useSelector((state: RootState) => {
    return state.taskData.workspaces.currentWorkspace?.getName();
  });
  const dispatch = useDispatch();
  const dispatchAddWorkspace = () => {
    const newWorkspace = new Workspace("Test Workspace", "", []);

    dispatch(operations.createWorkspaceOp(newWorkspace));
  };
  const dispatchDeleteWorkspace = () => {
    dispatch(operations.deleteWorkspaceOp("6077a4bc6e0a501c8fff4b4a"));
  };
  const dispatchUpdateWorkspace = () => {
    const updatedWorkspace = new Workspace(
      "Changed Workspace",
      "6077a4bc6e0a501c8fff4b4a",
      []
    );
    dispatch(operations.updateWorkspaceOp(updatedWorkspace));
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
      <div style={{float: 'right'}}>
        <Login/>
      </div>
    </div>
  );
}
