import "./Rail.css";
import React, {createRef, ReactNode, useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../redux/store";

import { SetSubtaskNodeWidth } from "../../redux/modules/RailUi/RailUiActions";

import TaskNode, { TaskNodeProps } from "../TaskNode/TaskNode";
import WithCheckBox from "../TaskNode/Decorators/WithCheckBox";
import WithSubtaskSkin from "../TaskNode/Decorators/WithSubtaskSkin/WithSubtaskSkin";
import ColumnBox from "../ColumnBox/ColumnBox";
import TaskParent from "../../models/TaskParent";
import { Fragment } from "react";

interface RailProps{
    taskParent: TaskParent;
    outerContainerWidth: number
}

export default function Rail (props: RailProps) {
    const dispatch = useDispatch();  

    const outerContainerWidth = props.outerContainerWidth;
    const taskParentNodeWidth = 100;
    const minSubtaskNodeWidth = 100;

    const calculatedSubtaskNodeWidth = (outerContainerWidth - taskParentNodeWidth) / 7;  
    
    const subtaskNodeWidth =  calculatedSubtaskNodeWidth > minSubtaskNodeWidth? calculatedSubtaskNodeWidth : minSubtaskNodeWidth;
    
    dispatch(new SetSubtaskNodeWidth(subtaskNodeWidth));

    const weekFrame = useSelector((state:RootState)=>{
        return state.weekPagination.currentFrame;
    });
    const taskParent = props.taskParent;
    const subtaskIdsByDate = weekFrame[taskParent.getId()];

<<<<<<< HEAD
    const decoratedNodes = [...Array(7)].map(() => {
        return WithCheckBox((WithSubtaskSkin(TaskNode)));
    })
=======
    const columnBoxes: ReactNode[] = subtaskIdsByDate.map((subtaskIds: string[], dayIndex)=>{
        // subtaskIds is an array containing the subtask IDs for the particular day.
        // Retrieve subtask instances to render for the particular day: eg) Monday.
        const subtasksOfDay = subtaskIds.map((id)=>{
            return taskParent.getSubtask(id);
        })
        const col = (
            <ColumnBox key={dayIndex}>
                {
                    subtasksOfDay.map((subtask)=>{
                        const Node = WithSubtaskSkin(TaskNode);
                        // Construct tasknode here.
                        return (
                            <Fragment key={subtask.getId()}>
                                <Node subtask={subtask} width={subtaskNodeWidth}></Node>
                            </Fragment>
                        );
                    })
                }
            </ColumnBox>
        );
        return col;
    });
    
>>>>>>> 3d3cf3fedfc9670be09909db16a60e9aad582d4c
    return (
        <>
        <div 
            className="task-rail" 
        >
            <div className="task-parent-section" style={{width: taskParentNodeWidth}}>
                {/* Render task parent node here */}
                {/* <TaskNode width={taskParentNodeWidth}></TaskNode> */}
            </div>
            <div className="subtask-section">
            {
<<<<<<< HEAD
                decoratedNodes.map(DecoratedNode =>{
                    return <DecoratedNode className="hi" width={100}></DecoratedNode>
=======
                // decoratedNodes.map((DecoratedNode, i)=>{
                //     return <>
                //         <DecoratedNode className="subtask-node" width={subtaskNodeWidth}></DecoratedNode>
                //     </>
                // })
                columnBoxes.map((Col: ReactNode)=>{
                    return Col;
>>>>>>> 3d3cf3fedfc9670be09909db16a60e9aad582d4c
                })
            }
            </div>
        </div>
        </>
    );
};