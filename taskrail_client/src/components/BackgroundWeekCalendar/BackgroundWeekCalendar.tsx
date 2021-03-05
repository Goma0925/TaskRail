import { BackgroundProps } from "react-flow-renderer";
import {useState} from "react";
import "./BackgroundWeekCalendar.css";



export default function BackgroundWeekCalendar(){
    const leftColWidth = 100;
    const dateColWidth = 100;
    const [minRailWidth, setMinRailWidth] = useState(dateColWidth*7 + leftColWidth);

    const subtasks = [{}, {}, {}, {}];    
    const [subtaskNodeSize] = useState({
        width: (minRailWidth / 7) > dateColWidth? (minRailWidth / subtasks.length): dateColWidth,
    });
    return (
    <div className="background-week-calendar">
        {
            [...Array(7)].map((_, i)=>{                
                // return <div className="date-divider" style={{right: props.dateColWidth*i}}/>
            })
        }
    </div>
    )
}