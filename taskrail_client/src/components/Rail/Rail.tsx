import "./Rail.css";
import React, {ReactNode, useEffect} from "react";
import {useDispatch} from "react-redux";

import TaskNode from "../TaskNode/TaskNode";
import WithSubtaskSkin from "../TaskNode/Decorators/WithSubtaskSkin/WithSubtaskSkin";
import ColumnBox from "../ColumnBox/ColumnBox";
import TaskParent from "../../models/ClientModels/TaskParent";
import { Fragment } from "react";
import AddSubtaskButton from "../AddSubtaskButton/AddSubtaskButton";
import Subtask from "../../models/ClientModels/Subtask";
import WithSelectableSubtask from "../TaskNode/Decorators/WithSelectableSubtask/WithSelectableSubtask";
import { RailUiSelection } from "../../redux/modules/RailUi/RailUiReducers";
import TaskParentNode from "../TaskNode/TaskParentNode";
import WithCheckBox from "../TaskNode/Decorators/WithCheckBox";
import { getDateStr, getNDaysLater } from "../../helpers/DateTime";
import { UpdateSubtask } from "../../redux/modules/TaskData/TaskDataActions";
import SubtaskNode from "../TaskNode/SubtaskNode";

interface RailProps{
    taskParent: TaskParent;
    subtasks: Subtask[];
    railUiSelection: RailUiSelection;
    displayRangeStartDate: Date;
    taskParentNodeWidth: number;
    subtaskNodeWidth: number;
    calendarBorderWidth: number;
}

export default function Rail (props: RailProps) {    
    const displayRangeStartDate = props.displayRangeStartDate;
    
    //Categorize subtasks by day of week
    const subtasksByDate:{[date: string]: Subtask[]} = {};
    var subtaskDate:string;//Sunday=0
    console.log("Before filter subs:", props.subtasks);

    props.subtasks.map((subtask:Subtask)=>{
        subtaskDate = getDateStr(subtask.getAssignedDate());
        if (!(subtaskDate in subtasksByDate)){
            subtasksByDate[subtaskDate] = [];
        }
        subtasksByDate[subtaskDate].push(subtask);
    });
    console.log("After filter subts:", subtasksByDate);
    
    
    const columnBoxes: ReactNode[] = [];
    [...Array(7)].map((_, dayIndex)=>{
        // Get date object from start date to seven days later.
        var date = getNDaysLater(displayRangeStartDate, dayIndex);        
        const dateStr = getDateStr(date);  
        console.log("dateStr", dateStr);
      
        // Get all the subtasks in an array for the particular day to render them.
        const subtasksOfDay = subtasksByDate[dateStr]? subtasksByDate[dateStr]:[];        
        const assignedDate = date;
        columnBoxes.push(
            <ColumnBox key={dateStr}>
                {
                    subtasksOfDay.length>0? subtasksOfDay.map((subtask)=>{
                        // const Node = WithSelectableSubtask(WithCheckBox(WithSubtaskSkin(TaskNode)));
                        
                        // Construct subtask tasknode here.
                        // ^ Pass in event listener for CheckBox.
                        return (
                            <Fragment key={subtask.getId()}>
                                <SubtaskNode 
                                    subtask={subtask} 
                                    width={props.subtaskNodeWidth} 
                                    railUiSelection={props.railUiSelection}
                                    parent={props.taskParent}>
                                </SubtaskNode>
                            </Fragment>
                        );
                    }):
                    // If no subtasks, render dummy node.
                    [...Array(1)].map(()=>{                        
                        const PlaceholderNode = TaskNode;
                        return <PlaceholderNode width={props.subtaskNodeWidth + 4} height={0}></PlaceholderNode>
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
            <div className="task-parent-section" style={{width: props.taskParentNodeWidth}}>
                {/* Render task parent node here */}
                <TaskParentNode 
                    // pass in function here
                    taskParent={props.taskParent} 
                    railUiSelection={props.railUiSelection} 
                    width={props.taskParentNodeWidth}
                    subtasks={props.subtasks}
                />
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