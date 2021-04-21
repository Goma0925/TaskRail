// Custom paragraph textbox that runs onSave funtion on enter.
import React, { useEffect, useRef, useState } from "react";
import "./EditableTextbox.css";

interface EditableTextboxProps {
  className?: string;
  updateTextTo: string;
  placeholder?: string;
  onSave: (text: string) => void;
  unfocusOnEnterKey: boolean;
  noLineBreak?: boolean;
  focus?: boolean;
}

export default function EditableTextbox(props: EditableTextboxProps) {
  const [text, setText] = useState(
    props.updateTextTo ? props.updateTextTo : ""
  );
  const textBoxRef = useRef<HTMLParagraphElement>(null);
  const placeHolder = props.placeholder ? props.placeholder : "";

  const saveText = (event: React.ChangeEvent<HTMLParagraphElement>) => {
    const newText = event.target.textContent ? event.target.textContent : "";
    props.onSave(newText);
  };

  const saveOnEnter = (event: React.KeyboardEvent) => {
    if (!props.unfocusOnEnterKey) {
      return;
    }
    if (event.key == "Enter") {
      if (textBoxRef.current) {
        textBoxRef.current.blur();
      }
    }
    return;
  };

  useEffect(() => {
    setText(props.updateTextTo);
  }, [props.updateTextTo]);

  useEffect(() => {
    if (textBoxRef.current) {
      textBoxRef.current.focus();
    }
  }, [props.focus]);

  let className = "editable-textbox";
  className += props.className ? " " + props.className : "";
  className += props.noLineBreak ? " no-line-break" : "";

  return (
    <p
      ref={textBoxRef}
      data-placeholder={props.placeholder}
      className={className}
      contentEditable="true"
      onKeyDown={saveOnEnter}
      onBlur={saveText}
      suppressContentEditableWarning={true}
    >
      {text}
    </p>
  );
}
