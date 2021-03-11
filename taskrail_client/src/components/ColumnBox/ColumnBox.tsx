import {ReactNode} from "react";

interface ColumnBoxProps{
    children?: ReactNode|ReactNode[];
    width: number;
}

export default function ColumnBox(props: ColumnBoxProps){
    return (
        <div className="col-box" style={{width:props.width}}>
            {props.children}
        </div>
    );
}