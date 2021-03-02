import "./Rail.css";
import {createRef, useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../redux/store";

import { SetSubtaskNodeWidth } from "../../redux/modules/RailUi/RailUiActions";

import TaskNode, { TaskNodeProps } from "../TaskNode/TaskNode";
import WithCheckBox from "../TaskNode/Decorators/WithCheckBox";
import WithSubtaskSkin from "../TaskNode/Decorators/WithSubtaskSkin/WithSubtaskSkin";


export default function Rail () {
    const dispatch = useDispatch();

    const outerContainerWidth = useSelector((state:RootState)=>state.railUi.railUiWidth)
    const taskParentNodeWidth = 100;
    const minSubtaskNodeWidth = 100;

    const subtasks = [{}, {}, {}, {}];  
    const calculatedSubtaskNodeWidth = (outerContainerWidth - taskParentNodeWidth) / 7;  
    console.log("calculatedSubtaskNodeWidth",calculatedSubtaskNodeWidth);
    
    const subtaskNodeWidth =  calculatedSubtaskNodeWidth > minSubtaskNodeWidth? calculatedSubtaskNodeWidth : minSubtaskNodeWidth;
    console.log("subtaskNodeWidth", subtaskNodeWidth);
    
    dispatch(new SetSubtaskNodeWidth(subtaskNodeWidth));

    const decoratedNodes = [...Array(7)].map(() => {
        return TaskNode;
    })
    return (
        <>
        <div 
            className="task-rail" 
        >
            <div className="task-parent-section" style={{width: taskParentNodeWidth}}>
                {/* Render task parent node here */}
                <TaskNode width={taskParentNodeWidth}></TaskNode>
            </div>
            <div className="subtask-section">
            {
                decoratedNodes.map((DecoratedNode, i)=>{
                    return <>
                        <DecoratedNode className="subtask-node" width={subtaskNodeWidth}></DecoratedNode>
                    </>
                })
            }
            </div>
        </div>
        </>
    );
};