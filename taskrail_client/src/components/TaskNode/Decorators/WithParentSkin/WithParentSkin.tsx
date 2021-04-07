import {TaskNodeProps} from "../../TaskNode"
import {produce} from "immer";
import TaskParent from "../../../../models/ClientModels/TaskParent"; 
import "./WithParentSkin.css";
import { useDispatch } from "react-redux";
import { UpdateTaskParent } from "../../../../redux/modules/TaskData/TaskDataActions";

interface WithParentSkinProps{
    taskparent: TaskParent;
}

export default function WithParentSkin<GenericProps>(NodeToDecorate: React.ComponentType<GenericProps>) 
{
    const dispatch = useDispatch();
    const wrapperComponent = (props: TaskNodeProps&WithParentSkinProps&GenericProps) => {
        // Copy the props and append a new skin class.
        var newProps = produce(props, draftProps=>{
            draftProps.className = "parent-skin";
            draftProps.className += props.className? props.className: "";
        })
        console.log("in WithParentSkin", newProps);

        function onChangeName(event: any) {
            let updatedTaskParent = props.taskparent.getCopy();
            updatedTaskParent.setName(event.target.textContent);
            dispatch(new UpdateTaskParent(updatedTaskParent));
        }
        
        return (
            <NodeToDecorate {...newProps}>
                {newProps.children}
                <div className="taskparent-skin" style={{height:25}}>
                    <p contentEditable={true} onBlur={onChangeName}>
                        {props.taskparent.getName()}</p>
                </div>
            </NodeToDecorate>
        )
    }
    return wrapperComponent;
}