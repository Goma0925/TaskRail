import "./Rail.css";
import {createRef, ReactNode, useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../redux/store";

import { SetSubtaskNodeWidth } from "../../redux/modules/RailUi/RailUiActions";

import TaskNode, { TaskNodeProps } from "../TaskNode/TaskNode";
import WithCheckBox from "../TaskNode/Decorators/WithCheckBox";
import WithSubtaskSkin from "../TaskNode/Decorators/WithSubtaskSkin/WithSubtaskSkin";
import ColumnBox from "../ColumnBox/ColumnBox";
import TaskParent from "../../models/TaskParent";
import { Col } from "react-bootstrap";

interface RailProps{
    taskParent: TaskParent;
}

export default function Rail (props: RailProps) {
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

    const weekFrame = useSelector((state:RootState)=>{
        return state.weekPagination.currentFrame;
    });
    const taskParent = props.taskParent;
    const subtaskIdsByDate = weekFrame[taskParent.getId()];

    const columnBoxes: ReactNode[] = subtaskIdsByDate.map((subtaskIds: string[])=>{
        // subtaskIds is an array containing the subtask IDs for the particular day.
        // Retrieve subtask instances to render for the particular day: eg) Monday.
        const subtasksOfDay = subtaskIds.map((id)=>{
            return taskParent.getSubtask(id);
        })
        const col = (
            <ColumnBox>
                {
                    subtasksOfDay.map((subtask)=>{
                        console.log("Subtask instance:", subtask);
                        const Node = WithSubtaskSkin(TaskNode);
                        // Construct tasknode here.
                        return <Node width={subtaskNodeWidth}></Node>
                    })
                }
            </ColumnBox>
        );
        return col;
    });
    
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
                // decoratedNodes.map((DecoratedNode, i)=>{
                //     return <>
                //         <DecoratedNode className="subtask-node" width={subtaskNodeWidth}></DecoratedNode>
                //     </>
                // })
                columnBoxes.map((Col: ReactNode)=>{
                    return Col;
                })
            }
            </div>
        </div>
        </>
    );
};