// Custom paragraph textbox that runs onSave funtion on enter.
import React, { useEffect, useRef, useState } from "react"

interface EditableTextboxProps{
    className: string;
    updateTextTo: string;
    onSave: (text: string) => void;
    blurOnEnter: boolean;
}

export default function EditableTextbox(props: EditableTextboxProps){
    const [text, setText] = useState(props.updateTextTo? props.updateTextTo: "");
    const textBoxRef = useRef<HTMLParagraphElement>(null);
    const saveText = (event: React.ChangeEvent<HTMLParagraphElement>) => {
        const newText = event.target.textContent?event.target.textContent: "";
        props.onSave(newText);
    }

    const saveOnEnter = (event: React.KeyboardEvent)=>{
        if (event.key == "Enter"){
            if (textBoxRef.current){
                textBoxRef.current.blur();
            }
        }
    }

    useEffect(()=>{
        setText(props.updateTextTo);
    }, [props.updateTextTo]);

    return (
    <p
        ref={textBoxRef}
        className={props.className}
        contentEditable="true"
        onKeyDown={saveOnEnter}
        onBlur={saveText}
        suppressContentEditableWarning={true}
    >
        {text}
    </p>
    )
}