import { useState } from "react";
import "./BackgroundWeekCalendar.css";

interface BackgroundWeekCalendarProps {
  subtaskNodeWidth: number;
  displayRangeStartDate: Date;
  taskParentSectionWidth: number;
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

        let day_of_week = newDate.toString().split(" ")[0].toUpperCase();
        let day_of_month = newDate.toString().split(" ")[2].toUpperCase();
        return (
          <div
            key={i}
            className="calendar-divider"
            style={{
              width: props.subtaskNodeWidth,
            }}
          >
            <div className="Label">
              <h2 className="day_of_week">{day_of_week}</h2>
              <h1 className="day_of_month">{day_of_month}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
}
