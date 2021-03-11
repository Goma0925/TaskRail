import "./Rail.css";
import React, {createRef, ReactNode, useEffect, useRef, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../redux/store";

import { SetSubtaskNodeWidth } from "../../redux/modules/RailUi/RailUiActions";

import TaskNode, { TaskNodeProps } from "../TaskNode/TaskNode";
import WithCheckBox from "../TaskNode/Decorators/WithCheckBox"; // not an error. vscode why
import WithSubtaskSkin from "../TaskNode/Decorators/WithSubtaskSkin/WithSubtaskSkin";
import ColumnBox from "../ColumnBox/ColumnBox";
import TaskParent from "../../models/TaskParent";
import { Fragment } from "react";
import AddSubtaskButton from "../AddSubtaskButton/AddSubtaskButton";
import SubTask from "../../models/Subtask";
import Subtask from "../../models/Subtask";
import WithSelectableSubtask from "../TaskNode/Decorators/WithSelectable/WithSelectableSubtask";

interface RailProps{
    taskParent: TaskParent;
    sortedSubtasks: SubTask[];
    displayRangeStartDate: Date;
    outerContainerWidth: number;
}

export default function Rail (props: RailProps) {    
    const dispatch = useDispatch();  

    const outerContainerWidth = props.outerContainerWidth;
    const taskParentNodeWidth = 100;
    const minSubtaskNodeWidth = 100;

    const calculatedSubtaskNodeWidth = (outerContainerWidth - taskParentNodeWidth) / 7;  
    
    const subtaskNodeWidth =  calculatedSubtaskNodeWidth > minSubtaskNodeWidth? calculatedSubtaskNodeWidth : minSubtaskNodeWidth;
    
    dispatch(new SetSubtaskNodeWidth(subtaskNodeWidth));

    const displayRangeStartDate = props.displayRangeStartDate;
    
    //Categorize subtasks by day of week
    const subtasksByDay:{[day: number]: Subtask[]} = {};
    var subtaskDay:number;
    props.sortedSubtasks.map((subtask:Subtask)=>{
        subtaskDay = subtask.getAssignedDate().getDay();
        if (!(subtaskDay in subtasksByDay)){
            subtasksByDay[subtaskDay] = [];
        }
        subtasksByDay[subtaskDay].push(subtask);
    })

    const columnBoxes: ReactNode[] = [];
    [...Array(7)].map((_, day)=>{
        const subtasksOfDay = subtasksByDay[day]? subtasksByDay[day]:[];
        const assignedDate = new Date(displayRangeStartDate.getTime());
        assignedDate.setDate(displayRangeStartDate.getDate()+day);
        columnBoxes.push(
            <ColumnBox key={day} width={subtaskNodeWidth}>
                {
                    subtasksOfDay.map((subtask)=>{
                        const Node = WithSelectableSubtask(WithSubtaskSkin(TaskNode));
                        // Construct tasknode here.
                        return (
                            <Fragment key={subtask.getId()}>
                                <Node subtask={subtask} width={subtaskNodeWidth}></Node>
                            </Fragment>
                        );
                    })
                }
                <AddSubtaskButton taskParentId={props.taskParent.getId()} assignedDate={assignedDate}></AddSubtaskButton>
            </ColumnBox>
        );
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
                columnBoxes.map((Col: ReactNode)=>{
                    return Col;
                })
            }
            </div>
        </div>
        </>
    );
};