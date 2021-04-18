// Custom paragraph textbox that runs onSave funtion on enter.
import React, { useEffect, useRef, useState } from "react"
import "./EditableTextbox.css";

interface EditableTextboxProps{
    className: string;
    updateTextTo: string;
    onSave: (text: string) => void;
    unfocusOnEnterKey: boolean;
    noLineBreak?: boolean;
}

export default function EditableTextbox(props: EditableTextboxProps){
    const [text, setText] = useState(props.updateTextTo? props.updateTextTo: "");
    const textBoxRef = useRef<HTMLParagraphElement>(null);
    const saveText = (event: React.ChangeEvent<HTMLParagraphElement>) => {
        const newText = event.target.textContent?event.target.textContent: "";
        props.onSave(newText);
    }

    const saveOnEnter = (event: React.KeyboardEvent)=>{
        if (!props.unfocusOnEnterKey){
            return;
        }
        if (event.key == "Enter"){
            if (textBoxRef.current){
                textBoxRef.current.blur();
            }
        }
        return;
    }

    useEffect(()=>{
        setText(props.updateTextTo);
    }, [props.updateTextTo]);


    let className = "editable-textbox";
    className += props.className? " "+props.className : "";
    className += props.noLineBreak? " no-line-break": "";
    console.log("className", className);
    
    return (
    <p
        ref={textBoxRef}
        className={className}
        contentEditable="true"
        onKeyDown={saveOnEnter}
        onBlur={saveText}
        suppressContentEditableWarning={true}
    >
        {text}
    </p>
    )
}