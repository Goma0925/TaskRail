// Custom datepicker that has a simpler API than the normal date picker input.
// runs onDateChange function everytime the date changes.
import React, { useEffect, useState } from "react";
import { getDateStr, parseLocalDateFromDateStr } from "../../../helpers/DateTime";

interface SmartDatePickerProps{
    className?: string;
    updateDateTo?: Date; // When a new value is passed, it will update the date to display.
    onDateChange: (newDate: Date) => void; //Function to run on date change.
}

export default function SmartDatePicker (props: SmartDatePickerProps){
    const [date, setDate] = useState(props.updateDateTo);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        if (event.target.value){
            const newDate = parseLocalDateFromDateStr(event.target.value);
            props.onDateChange(newDate);
        }
    }

    useEffect(()=>{
        if (props.updateDateTo){
            setDate(props.updateDateTo);
        }
    }, [props.updateDateTo]);

    return (
        <input
        type="date"
        value={date? getDateStr(date): ""}
        onChange={onChange}
        className={props.className}
      />
    );
}