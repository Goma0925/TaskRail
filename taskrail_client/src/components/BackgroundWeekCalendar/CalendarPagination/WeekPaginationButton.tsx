import { getMonthAndDay, getMonthStr, getNDaysLater, getPreviousSunday } from "../../../helpers/DateTime";
import { setWeekStartDate } from "../../../redux/modules/Pagination/PaginationOperations";
import "./WeekPagination.css";

interface WeekPaginationButton{
    displayRangeStartDate: Date;
}

export default function WeekPaginationButton(props: WeekPaginationButton){
    var monthLabel = getMonthStr(props.displayRangeStartDate);

    const displayRangeEndDate = getNDaysLater(props.displayRangeStartDate, 7);
    if (props.displayRangeStartDate.getMonth() == displayRangeEndDate.getMonth()){
        monthLabel = getMonthAndDay(props.displayRangeStartDate);
    }else{
        monthLabel = getMonthAndDay(props.displayRangeStartDate) + " - " + getMonthAndDay(displayRangeEndDate);
    }

    const jumpToPrevWeek = ()=>{
        const oneWeekLater = getNDaysLater(props.displayRangeStartDate , -7);
        setWeekStartDate(oneWeekLater);
    }
    const jumpToCurrWeek = ()=>{
        const currentWeekSunday = getPreviousSunday(new Date());
        setWeekStartDate(currentWeekSunday);
    }
    const jumpToNextWeek = ()=>{
        const oneWeekBefore = getNDaysLater(props.displayRangeStartDate , 7);
        setWeekStartDate(oneWeekBefore);
    }
    return (
        <>
        <div className="week-pagination">
            <a href="#" onClick={jumpToPrevWeek}>❮</a>
            <a href="#" onClick={jumpToCurrWeek}>Today</a>
            <a href="#" onClick={jumpToNextWeek}>❯</a>
        </div>
        <div className="week-pagination-label">{monthLabel}</div>
        </>
    );
}