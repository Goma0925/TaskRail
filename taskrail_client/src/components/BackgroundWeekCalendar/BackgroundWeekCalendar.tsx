import {useState} from "react";
import "./BackgroundWeekCalendar.css";

interface BackgroundWeekCalendarProps{
    subtaskNodeWidth: number;
    displayRangeStartDate: Date;
}

export default function BackgroundWeekCalendar(props: BackgroundWeekCalendarProps){
    const leftColWidth = 100;
    const dateColWidth = 100;
    const [minRailWidth, setMinRailWidth] = useState(dateColWidth*7 + leftColWidth);

    const subtasks = [{}, {}, {}, {}];    
    return (
    <div className="background-week-calendar">
        {
            [...Array(7)].map((_, i)=>{                              
                const xPosition = props.subtaskNodeWidth*i;
               return <div className="calendar-divider" style={{right:xPosition}}></div>          
            })
        }
    </div>
    )
}