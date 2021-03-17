import {useState} from "react";
import "./BackgroundWeekCalendar.css";

interface BackgroundWeekCalendarProps{
    subtaskNodeWidth: number;
    displayRangeStartDate: Date;
}

export default function BackgroundWeekCalendar(props: BackgroundWeekCalendarProps){
    return (
    <div className="background-week-calendar">
        {
            [...Array(7)].map((_, i)=>{                              
                const xPosition = props.subtaskNodeWidth*i;
               return <div 
                        key={i}
                        className="calendar-divider" 
                        style={{right:xPosition}}
                        />
            })
        }
    </div>
    )
}