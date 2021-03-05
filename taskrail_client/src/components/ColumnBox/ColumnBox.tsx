import {ReactNode} from "react";

interface ColumnBoxProps{
    children?: ReactNode|ReactNode[];
}

export default function ColumnBox(props: ColumnBoxProps){
    return (
        <div className="col-box">
            {props.children}
        </div>
    );
}