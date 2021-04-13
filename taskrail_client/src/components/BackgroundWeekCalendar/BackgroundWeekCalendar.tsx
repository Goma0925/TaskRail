import { useState } from "react";
import "./BackgroundWeekCalendar.css";

interface BackgroundWeekCalendarProps {
  subtaskNodeWidth: number;
  displayRangeStartDate: Date;
  taskParentSectionWidth: number;
  calendarBorderWidth: number;
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
        let today = new Date();
        let currDateIndicatorActive: boolean = false;
        if (
          today.getUTCDate() == newDate.getUTCDate() &&
          today.getUTCMonth() == newDate.getUTCMonth() &&
          today.getUTCFullYear() == newDate.getUTCFullYear()
        ) {
          currDateIndicatorActive = true;
        }
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
              <div className={`indicator ${currDateIndicatorActive?" active":""}`}>
                <div className="day-of-week">{dayOfWeek}</div>
                <div className="date">{dayOfMonth}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
