import produce from "immer";
import { useDispatch } from "react-redux";
import { UpdateTaskParent } from "../../redux/modules/TaskData/TaskDataActions";
import WithCheckBox from "./Decorators/WithCheckBox";
import WithSelectableTaskParent, { WithSelectableTaskParentProps } from "./Decorators/WithSelectableTaskParent/WithSelectableTaskParent";
import TaskNode, { TaskNodeProps } from "./TaskNode";

type TaskParentNodeProps = WithSelectableTaskParentProps&TaskNodeProps;

export default function TaskParentNode(props: TaskParentNodeProps){
    // const TaskParentNode = WithSelectableTaskParent(WithCheckBox(TaskNode));
    const TaskParentNode = WithSelectableTaskParent(TaskNode);
    // define function ^
    const dispatch = useDispatch();
    const completeTaskParent = ()=>{
        const prevTaskParent = props.taskParent;
        if (prevTaskParent.isComplete()){
            // Create a new taskparent with complete=false
            // const newTaskParent = new TaskParent(
            //     prevTaskParent.getName(),
                
            // );
        }else{
            // Create a new taskparent with complete=true

            // const newTaskParent = new TaskParent(
            //     prevTaskParent.getName(),
                
            // );
            // dispatch(new UpdateTaskParent(taskParent))

        }
    };

    //When the taskparent is complete, fade the taskparent
    // var fadeOverlay;
    // if (props.taskParent.isComplete()){
    //     // 
    //     // fadeOverlay = <div className="complete-overlay"></div>;
    //     props.className += " faded"
    // }else{
    //     // fadeOverlay = <div className="complete-overlay"></div>;
    //     props.className += " unfaded"
    // }

    function onClickCheckbox(event: any) {
        let updatedTaskParent = props.taskParent.getCopy();
        if (updatedTaskParent.isComplete()) {
            updatedTaskParent.uncompleteTask();
            // unfade all children
            // if (props.children != null) {
            //     props.children.map(()=>{

            //     })
            // }
            /* stuck here right now ^ */
        } else {
            updatedTaskParent.completeTask();
            // fade all children
        }
        dispatch(new UpdateTaskParent(updatedTaskParent));
    }

    var newProps = produce(props, draftProps=>{
        // Append className
        // draftProps.className = props.className + " faded";
        if (props.taskParent.isComplete()) {
            draftProps.className = " faded";
        }  
        // draftProps.className += props.className? props.className: "";
    });

    return <TaskParentNode {...newProps}
                {...newProps.children}
                width={props.width}
                // height={30} 
                // onClickCheckBox={functionA}
                taskParent={props.taskParent} 
                railUiSelection={props.railUiSelection}>
                <div className="checkbox-container">
                    <input type="checkbox" className="float-checkbox" onClick={onClickCheckbox}/>
                </div>
            </TaskParentNode>
}