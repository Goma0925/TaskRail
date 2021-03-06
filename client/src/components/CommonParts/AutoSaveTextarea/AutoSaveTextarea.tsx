import { text } from "@fortawesome/fontawesome-svg-core";
import React, { useEffect, useRef, useState } from "react";

// Custom Textarea that runs onSave function when
// 1) the user finishes typing and 
// 2) the textarea is unfocused.

interface AutoSaveTextareaProps{
    className?: string;
    //updateValueTo is set to the default value of the textarea. Whenever a new value is passed, it updates the text value
    updateValueTo?: string; 
    placeholder?: string;
    onSave: (text: string)=>void;
}

export default function AutoSaveTextarea(props: AutoSaveTextareaProps){ 
    const [noteSaveTimer, setNoteSaveTimer] = useState(setTimeout(()=>{}, 0));
    const [text, setText] = useState(props.updateValueTo?props.updateValueTo:"");
  
    const startNoteSaveCountDown = ()=>{
      // Set an interval function to trigger a few seconds after a user finishes typing in the text area.
      // Clear the previous timer for saving note
      clearTimeout(noteSaveTimer);
      // Set timer that triggers in two seconds after the user finishes typing.
      const newText = text;
      const timerId = setTimeout(()=>{
        saveTextChange(newText);
      }, 2000);
      setNoteSaveTimer(timerId);
    }

    const saveTextChange = (text: string) => {
      // Submit the note text change to the server.
      props.onSave(text);
    };

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>)=>{
      setText(event.target.value);
    }

    //Update the text value when props.value change.
    useEffect(()=>{
      setText(props.updateValueTo?props.updateValueTo:"");
    }, [props.updateValueTo])

    return (
    <textarea
        value={text}
        placeholder={props.placeholder}
        onBlur={()=>{saveTextChange(text)}}
        onChange={onChange}
        onKeyUp={startNoteSaveCountDown} 
        className={props.className}
    />
    )
}
