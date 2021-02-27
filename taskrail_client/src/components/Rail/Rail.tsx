import "./Rail.css";
import {useState} from "react";
import TaskNode, { TaskNodeProps } from "../TaskNode/TaskNode";
import WithCheckBox from "../TaskNode/Decorators/WithCheckBox";
import WithSubtaskSkin from "../TaskNode/Decorators/WithSubtaskSkin/WithSubtaskSkin";

interface RailProps{
    minNodeSize: number;
    leftColWidth: number;
}

export default function Rail (props: RailProps) {
    const leftColWidth = 200;
    const minNodeSize = 80;
    const [minRailWidth, setMinRailWidth] = useState(minNodeSize*7 + leftColWidth);
    const subtasks = [{}, {}, {}, {}];    
    const [nodeSize, setNodeSize] = useState({
        width: (minRailWidth / subtasks.length) > minNodeSize? (minRailWidth / subtasks.length): minNodeSize,
    });
    const numDays = 7;

    const decoratedNodes = [...Array(7)].map(() => {
        return WithCheckBox(TaskNode);
    })
    return (
        <>
        <div 
            className="task-rail" 
            style={{minWidth:minRailWidth}}
        >
            <div className="task-parent-section" style={{width: leftColWidth}}>
                {/* Render task parent node here */}
                <TaskNode width={100}></TaskNode>
            </div>
            {
                decoratedNodes.map(DecoratedNode =>{
                    return <DecoratedNode width={nodeSize.width}></DecoratedNode>
                })
            }
        </div>
        </>
    );
};