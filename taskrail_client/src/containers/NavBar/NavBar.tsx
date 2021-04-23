import { useSelector } from "react-redux";
import WeekPaginationButton from "../../components/BackgroundWeekCalendar/CalendarPagination/WeekPaginationButton";
import { RootState } from "../../redux/store";
import "./NavBar.css";
import WorkspaceComponent from "../NavBar/WorkspaceComponent";
import * as Actions from "../../redux/modules/TaskData/TaskDataActions";
import Workspace from "../../models/ClientModels/Workspace";
import TaskParent from "../../models/ClientModels/TaskParent";
import * as operations from "../../redux/modules/TaskData/TaskDataOperations";
import Login from "../../components/GoogleAuth/Login";
import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { JsxElement } from "typescript";
import WorkspaceList from "../SideMenu/WorkspaceList";
import Logout from "../../components/GoogleAuth/Logout";

export default function NavBar() {
  const displayRangeStartDate = useSelector((state: RootState) => {
    return state.pagination.displayRangeStartDate;
  });

  return (
    <div className="nav">
      <WorkspaceComponent></WorkspaceComponent>
      <WeekPaginationButton
        displayRangeStartDate={displayRangeStartDate}
      ></WeekPaginationButton>
      {/* <Login/> */}
      <Logout/>
    </div>
  );
}
