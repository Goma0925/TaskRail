import "./RailContainer.css";
import { useRef, useEffect, useState } from "react";
import Rail from "../../components/Rail/Rail";
import BackgroundWeekCalendar from "../../components/BackgroundWeekCalendar/BackgroundWeekCalendar";

const RailContainer: React.FC = () => {
    return (
        <div className="rail-container">
            <BackgroundWeekCalendar/>
            {/* <Rail minNodeSize={80} leftColWidth={200}></Rail>*/}
            <Rail></Rail> 
        </div>
    );
}

export default RailContainer;