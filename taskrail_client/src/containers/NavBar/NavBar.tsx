import React from "react";
import { useSelector } from "react-redux";
import WeekPaginationButton from "../../components/BackgroundWeekCalendar/CalendarPagination/WeekPaginationButton";
import { RootState } from "../../redux/store";
import "./NavBar.css";

export default function NavBar(){
    const displayRangeStartDate = useSelector((state:RootState)=>{
        return state.pagination.displayRangeStartDate;
    })
    return (
    <div className="nav"> 
        <div className="title">Stay on Track!</div> 
        <WeekPaginationButton displayRangeStartDate={displayRangeStartDate}></WeekPaginationButton>
    </div>
    )
}