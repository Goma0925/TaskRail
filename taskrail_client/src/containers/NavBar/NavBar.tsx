import React from "react";
import { useSelector } from "react-redux";
import WeekPaginationButton from "../../components/BackgroundWeekCalendar/CalendarPagination/WeekPaginationButton";
import { RootState } from "../../redux/store";
import "./NavBar.css";

export default function NavBar(){
    const displayRangeStartDate = useSelector((state:RootState)=>{
        return state.pagination.displayRangeStartDate;
    });
    const workspaceName = useSelector((state:RootState)=>{
        return state.taskData.workspace.currentWorkspace?.getName();
    })
    return (
    <div className="nav"> 
        <div className="title">{workspaceName}</div> 
        <WeekPaginationButton displayRangeStartDate={displayRangeStartDate}></WeekPaginationButton>
    </div>
    )
}