import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import WeekPaginationButton from "../../components/BackgroundWeekCalendar/CalendarPagination/WeekPaginationButton";
import EditableTextbox from "../../components/CommonParts/EditableTextbox/EditableTextbox";
import AutoSaveTextarea from "../../components/CommonParts/AutoSaveTextarea/AutoSaveTextarea";
import { RootState } from "../../redux/store";
import { AppDispatch } from "../../redux/redux-utils/ReduxUtils";
import "./NavBar.css";
import * as Actions from "../../redux/modules/TaskData/TaskDataActions";
import Workspace from "../../models/ClientModels/Workspace";
import TaskParent from "../../models/ClientModels/TaskParent";
import * as operations from "../../redux/modules/TaskData/TaskDataOperations";
import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { JsxElement } from "typescript";
import WorkspaceList from "../SideMenu/WorkspaceList";
import { SelectItem } from "../../redux/modules/RailUi/RailUiActions";

export default function WorkspaceComponent() {
  const dispatch = useDispatch();

  const workspaceId = useSelector((state: RootState) => {
    return state.taskData.workspaces.currentWorkspace?.getId();
  });
  const workspaceName = useSelector((state: RootState) => {
    return state.taskData.workspaces.currentWorkspace?.getName();
  });
  let workspacesArray = useSelector((state: RootState) => {
    return state.taskData.workspaces.byId;
  });
  let workspacesIdArray = useSelector((state: RootState) => {
    return state.taskData.workspaces.allIds;
  });

  const [showingDropdown, setShowingDropdown] = useState(false);

  return <div></div>;
}
