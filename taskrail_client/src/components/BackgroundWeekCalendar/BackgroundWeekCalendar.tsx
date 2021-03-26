import { useState } from "react";
import "./BackgroundWeekCalendar.css";

interface BackgroundWeekCalendarProps {
  subtaskNodeWidth: number;
  displayRangeStartDate: Date;
  taskParentSectionWidth: number;
  calendarBorderWidth:number;
}

export default function BackgroundWeekCalendar(
  props: BackgroundWeekCalendarProps
) {
  return (
    <div
      className="background-week-calendar"
      style={{
        marginLeft: props.taskParentSectionWidth,
      }}
    >
      {[...Array(7)].map((_, i) => {
        let newDate = new Date(props.displayRangeStartDate);
        newDate.setDate(newDate.getDate() + i);

        let dayOfWeek = newDate.toString().split(" ")[0].toUpperCase();
        let dayOfMonth = newDate.toString().split(" ")[2].toUpperCase();
        return (
          <div
            key={i}
            className="calendar-divider"
            style={{
              width: props.subtaskNodeWidth,
              // borderLeft: props.calendarBorderWidth
            }}
          >
            <div className="date-label">
              <h2 className="day-of-week">{dayOfWeek}</h2>
              <h1 className="date">{dayOfMonth}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
}
