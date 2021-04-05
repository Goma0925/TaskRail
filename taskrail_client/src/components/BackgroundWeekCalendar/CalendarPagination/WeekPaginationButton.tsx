import { getMonthStr, getNDaysLater } from "../../../helpers/DateTime";
import { paginateNextWeek, paginatePrevWeek } from "../../../redux/modules/Pagination/PaginationOperations";
import "./WeekPagination.css";

interface WeekPaginationButton{
    displayRangeStartDate: Date;
}

export default function WeekPaginationButton(props: WeekPaginationButton){
    var monthLabel = getMonthStr(props.displayRangeStartDate);

    const displayRangeEndDate = getNDaysLater(props.displayRangeStartDate, 7);
    if (props.displayRangeStartDate.getMonth() == displayRangeEndDate.getMonth()){
        monthLabel = getMonthStr(props.displayRangeStartDate);
    }else{
        monthLabel = getMonthStr(props.displayRangeStartDate) + " - " + getMonthStr(displayRangeEndDate);
    }

    const jumpPrevWeek = ()=>{
        paginatePrevWeek(props.displayRangeStartDate);
    }
    const jumpNextWeek = ()=>{
        paginateNextWeek(props.displayRangeStartDate);
    }
    return (
        <>
        <div className="week-pagination">
            <a href="#" onClick={jumpPrevWeek}>❮</a>
            <a href="#" onClick={jumpNextWeek}>❯</a>
        </div>
        <div className="week-pagination-label">{monthLabel}</div>
        </>
    );
}