import { useSelector } from "react-redux";
import WeekPaginationButton from "../../components/BackgroundWeekCalendar/CalendarPagination/WeekPaginationButton";
import { RootState } from "../../redux/store";
import "./NavBar.css";
import WorkspaceComponent from "../NavBar/WorkspaceComponent";

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
    </div>
  );
}
