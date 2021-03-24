import { propTypes } from "react-bootstrap/esm/Image";
import WithCheckBox from "./Decorators/WithCheckBox";
import WithSelectableTaskParent, { WithSelectableTaskParentProps } from "./Decorators/WithSelectableTaskParent/WithSelectableTaskParent";
import TaskNode, { TaskNodeProps } from "./TaskNode";

type TaskParentNodeProps = WithSelectableTaskParentProps&TaskNodeProps;

export default function TaskParentNode(props: TaskParentNodeProps){
    const TaskParentNode = WithSelectableTaskParent(WithCheckBox(TaskNode));
    // define function ^
    return <TaskParentNode 
                width={props.width}
                // height={30} 
                // pass in function here
                taskParent={props.taskParent} 
                railUiSelection={props.railUiSelection}>
            </TaskParentNode>
}