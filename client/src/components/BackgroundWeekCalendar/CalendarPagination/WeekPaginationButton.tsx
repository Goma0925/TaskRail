import React from "react";
import { getMonthAndDay, getMonthStr, getNDaysLater, getPreviousSunday } from "../../../helpers/DateTime";
import { setWeekStartDate } from "../../../redux/modules/Pagination/PaginationOperations";
import "./WeekPagination.css";

interface WeekPaginationButton{
    displayRangeStartDate: Date;
}

export default function WeekPaginationButton(props: WeekPaginationButton){
    const displayRangeEndDate = getNDaysLater(props.displayRangeStartDate, 7);
    let monthLabel = getMonthStr(props.displayRangeStartDate);
    monthLabel = getMonthAndDay(props.displayRangeStartDate) + " - " + getMonthAndDay(displayRangeEndDate);

    const jumpToPrevWeek = (event: React.MouseEvent)=>{
        event.preventDefault();
        const oneWeekLater = getNDaysLater(props.displayRangeStartDate , -7);
        setWeekStartDate(oneWeekLater);
    }
    const jumpToCurrWeek = (event: React.MouseEvent)=>{
        event.preventDefault();
        const currentWeekSunday = getPreviousSunday(new Date());
        setWeekStartDate(currentWeekSunday);
    }
    const jumpToNextWeek = (event: React.MouseEvent)=>{
        event.preventDefault();
        const oneWeekBefore = getNDaysLater(props.displayRangeStartDate , 7);
        setWeekStartDate(oneWeekBefore);
    }
    return (
        <>
        <div className="week-pagination">
            <a href="/" className="pagination-previous" onClick={jumpToPrevWeek}>❮</a>
            <a href="/" className="pagination-link" onClick={jumpToCurrWeek}>Today</a>
            <a href="/" className="pagination-next" onClick={jumpToNextWeek}>❯</a>
        </div>
        <div className="week-pagination-label">{monthLabel}</div>
        </>
    );
}