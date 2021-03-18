import "./Rail.css";
import {ReactNode, useEffect} from "react";
import {useDispatch} from "react-redux";

import { SetSubtaskNodeWidth } from "../../redux/modules/RailUi/RailUiActions";

import TaskNode from "../TaskNode/TaskNode";
import WithSubtaskSkin from "../TaskNode/Decorators/WithSubtaskSkin/WithSubtaskSkin";
import ColumnBox from "../ColumnBox/ColumnBox";
import TaskParent from "../../models/TaskParent";
import { Fragment } from "react";
import AddSubtaskButton from "../AddSubtaskButton/AddSubtaskButton";
import Subtask from "../../models/Subtask";
import WithSelectableSubtask from "../TaskNode/Decorators/WithSelectableSubtask/WithSelectableSubtask";
import { RailUiSelection } from "../../redux/modules/RailUi/RailUiReducers";
import TaskParentNode from "../TaskNode/TaskParentNode";

interface RailProps{
    taskParent: TaskParent;
    sortedSubtasks: Subtask[];
    railUiSelection: RailUiSelection;
    displayRangeStartDate: Date;
    taskParentNodeWidth: number;
    subtaskNodeWidth: number;
}

export default function Rail (props: RailProps) {    
    const dispatch = useDispatch();  
    const displayRangeStartDate = props.displayRangeStartDate;
    
    //Categorize subtasks by day of week
    const subtasksByDay:{[day: number]: Subtask[]} = {};
    var subtaskDay:number;//Sunday=0
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
            <ColumnBox key={day} width={props.subtaskNodeWidth}>
                {
                    subtasksOfDay.map((subtask)=>{
                        const Node = WithSelectableSubtask(WithSubtaskSkin(TaskNode));
                        // Construct subtask tasknode here.
                        return (
                            <Fragment key={subtask.getId()}>
                                <Node subtask={subtask} width={props.subtaskNodeWidth} railUiSelection={props.railUiSelection}></Node>
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
            <div className="task-parent-section" style={{width: props.taskParentNodeWidth}}>
                {/* Render task parent node here */}
                <TaskParentNode 
                    taskParent={props.taskParent} 
                    railUiSelection={props.railUiSelection} 
                    width={props.taskParentNodeWidth}
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