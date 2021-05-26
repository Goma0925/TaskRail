import { useState } from "react";
import { classNameConcatenator } from "../../helpers/CssStyle";
import styles from "./BackgroundWeekCalendar.module.css";

const classList = classNameConcatenator(styles);

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
      className={classList(["background-week-calendar"])}
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
            className={styles["calendar-divider"]}
            style={{
              width: props.subtaskNodeWidth,
            }}
          >
            <div className={styles["date-label"]}>
              <div className={classList(["indicator", currDateIndicatorActive?"active":""])}>
                <div className={styles["day-of-week"]}>{dayOfWeek}</div>
                <div className={styles["date"]}>{dayOfMonth}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
