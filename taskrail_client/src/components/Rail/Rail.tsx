import "./style.css";
import {useState} from "react";
import TaskNode, { TaskNodeProps } from "../TaskNode/TaskNode";
import WithCheckBox from "../TaskNode/Decorators/WithCheckBox";
import WithSubtaskSkin from "../TaskNode/Decorators/WithSubtaskSkin/WithSubtaskSkin";

const Rail: React.FC = () => {
    const [railHeight, setHeight] = useState(500);
    const [railWidth, setWidth] = useState(700);
    const subtasks = [{}, {}, {}, {}];
    const numDays = 7;
    const [nodeSize, setNodeSize] = useState({
        width: railWidth / subtasks.length,
    });
    const decoratedNodes = [...Array(7)].map(() => {
        return WithSubtaskSkin(TaskNode);
    })
    return (
        <div 
            className="task-rail" 
            // style={{height:railHeight, width:railWidth}}
        >
        {
            decoratedNodes.map(DecoratedNode =>{
                return <DecoratedNode width={nodeSize.width}></DecoratedNode>
            })
        }
        </div>
    );
}

export default Rail;