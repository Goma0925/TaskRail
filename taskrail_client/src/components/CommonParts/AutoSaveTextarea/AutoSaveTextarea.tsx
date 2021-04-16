import { useState } from "react";

interface AutoSaveTextareaProps{
    initialText: string;
    onSave: (text: string) => {};
    className: string;
}

export default function AutoSaveTextarea(props: AutoSaveTextareaProps){
    const [noteText, setNoteText] = useState(props.initialText);
    const [noteSaveTimer, setNoteSaveTimer] = useState(setTimeout(()=>{}, 0));
  
    const startNoteSaveCountDown = (event: any)=>{
      // Set an interval function to trigger a few seconds after a user finishes typing in the text area.
      // Clear the previous timer for saving note
      clearTimeout(noteSaveTimer);
      // Set timer that triggers in two seconds after the user finishes typing.
      const timerId = setTimeout(()=>{
        console.log("saving...");
        submitNoteChange(event);
      }, 2000);
      setNoteSaveTimer(timerId);
    }
  
    function handleNoteChange(event: any){
      //Save note text in component.
      setNoteText(event.target.value);
    }
  
    function submitNoteChange(event: any) {
      // Submit the note text change to the server.
      // update this type in future
      let updatedSubtask = subtask.getCopy();
      updatedSubtask.setNote(event.target.value);
      dispatch(updateSubtaskOp(updatedSubtask));
    }

    return (
    <textarea
        value={noteText}
        placeholder="Note"
        onBlur={submitNoteChange}
        onKeyUp={startNoteSaveCountDown} 
        onChange={handleNoteChange}
        className="textarea"
    />
    )
}