import "./Rail.css";
import React, {ReactNode, useEffect} from "react";
import TaskNode from "../TaskNode/TaskNode";
import ColumnBox from "../ColumnBox/ColumnBox";
import TaskParent from "../../models/ClientModels/TaskParent";
import { Fragment } from "react";
import AddSubtaskButton from "../AddSubtaskButton/AddSubtaskButton";
import Subtask from "../../models/ClientModels/Subtask";
import { RailUiSelection } from "../../redux/modules/RailUi/RailUiReducers";
import TaskParentNode from "../TaskNode/TaskParentNode/TaskParentNode";
import { getDateStr, getNDaysLater } from "../../helpers/DateTime";
import SubtaskNode from "../TaskNode/SubtaskNode/SubtaskNode";

interface RailProps{
    taskParent: TaskParent;
    subtasks: Subtask[];
    railUiSelection: RailUiSelection;
    displayRangeStartDate: Date;
    taskParentNodeWidth: number;
    taskParentSectionWidth: number;
    subtaskNodeWidth: number;
}

export default function Rail (props: RailProps) {    
    const displayRangeStartDate = props.displayRangeStartDate;
    
    //Categorize subtasks by day of week
    const subtasksByDate:{[date: string]: Subtask[]} = {};
    var subtaskDate:string;//Sunday=0

    props.subtasks.map((subtask:Subtask)=>{
        subtaskDate = getDateStr(subtask.getAssignedDate());
        if (!(subtaskDate in subtasksByDate)){
            subtasksByDate[subtaskDate] = [];
        }
        subtasksByDate[subtaskDate].push(subtask);
    });
    
    const columnBoxes: ReactNode[] = [];
    // Loop for everyday in the week.
    [...Array(7)].map((_, dayIndex)=>{
        // Get date object from start date to seven days later.
        var date = getNDaysLater(displayRangeStartDate, dayIndex);        
        const dateStr = getDateStr(date);  
      
        // Get all the subtasks in an array for the particular day to render them.
        const subtasksOfDay = subtasksByDate[dateStr]? subtasksByDate[dateStr]:[];        
        const assignedDate = date;
        columnBoxes.push(
            <ColumnBox key={dateStr}>
                {
                    subtasksOfDay.map((subtask)=>{
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
                    })
                }
                <AddSubtaskButton 
                            taskParentId={props.taskParent.getId()}
                            assignedDate={assignedDate}
                            width={props.subtaskNodeWidth}
                            height={50}
                />            
            </ColumnBox>
        );
    });

    return (
        <>
        <div 
            className="task-rail"
        >
            <div 
                className="rail-horizontal-line" 
                style={{
                    // Later, change this dynamically according to the rail color.
                    backgroundColor: "#ff5f5c", 
                    top: 28, //Need to have a better way to set this.
                    marginLeft: 30
                }}
            />
            <div className="task-parent-section" style={{width: props.taskParentSectionWidth}}>
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