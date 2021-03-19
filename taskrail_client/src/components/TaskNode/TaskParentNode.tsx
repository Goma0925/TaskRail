import { propTypes } from "react-bootstrap/esm/Image";
import WithSelectableTaskParent, { WithSelectableTaskParentProps } from "./Decorators/WithSelectableTaskParent/WithSelectableTaskParent";
import TaskNode, { TaskNodeProps } from "./TaskNode";

type TaskParentNodeProps = WithSelectableTaskParentProps&TaskNodeProps;

export default function TaskParentNode(props: TaskParentNodeProps){
    const TaskParentNode = WithSelectableTaskParent(TaskNode);
    return <TaskParentNode 
                width={props.width}
                // height={30} 
                taskParent={props.taskParent} 
                railUiSelection={props.railUiSelection}>
            </TaskParentNode>
}