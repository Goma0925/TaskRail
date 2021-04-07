import "./WithSubtaskSkin.css"
import {TaskNodeProps} from "../../TaskNode"
import {produce} from "immer";
import SubTask from "../../../../models/ClientModels/Subtask";
import { useDispatch } from "react-redux";
import { UpdateSubtask } from "../../../../redux/modules/TaskData/TaskDataActions";

interface WithSubtaskSkinProps{
    subtask: SubTask;
}

export default function WithSubtaskSkin<GenericProps>(NodeToDecorate: React.ComponentType<GenericProps>) 
{
    const dispatch = useDispatch();
    const wrapperComponent = (props: TaskNodeProps&WithSubtaskSkinProps&GenericProps) => {
        // Copy the props and append a new skin class.
        var newProps = produce(props, draftProps=>{
            draftProps.className = "subtask-skin";
            draftProps.className += props.className? props.className: "";
        })

        // const topId = "subtask-top-text " + props.subtask.getId();
        // const bottomId = "subtask-bottom-text " + props.subtask.getId();

        // const onClickTop=()=>{
        //     const topText = document.getElementById(topId);
        //     if (topText === null) {
        //         console.log('subtask top text is empty, therefore uneditable')
        //     } else {
        //         topText.contentEditable = "true";
        //     }
        // }

        // const onClickBottom=()=>{
        //     const bottomText = document.getElementById(bottomId);
        //     if (bottomText === null) {
        //         console.log('subtask top text is empty, therefore uneditable')
        //     } else {
        //         bottomText.contentEditable = "true";
        //     }
        // }

        function handleTopChange(event: any) {
            let updatedSubtask = props.subtask.getCopy();
            updatedSubtask.setName(event.target.textContent);
            dispatch(new UpdateSubtask(updatedSubtask));
        }

        function handleBottomChange(event: any) {
            /* In the final product, you probably don't 
               want to let the user change the id. */
            let updatedSubtask = props.subtask.getCopy();
            updatedSubtask.setId(event.target.textContent);
            dispatch(new UpdateSubtask(updatedSubtask));
        }
        
        return (
            <NodeToDecorate {...newProps}>
                {newProps.children}
                {/* <div className="subtask-top" style={{height:25, width:props.width-20}}> */}
                <div className="subtask-top" style={{height:25}}>
                    <p contentEditable={true} onBlur={handleTopChange}>
                        {props.subtask.getName()}</p>
                </div>
                {/* <div className = "subtask-bottom" style={{height:25, width:props.width-20}}> */}
                <div className = "subtask-bottom" style={{height:25}}>
                    <p contentEditable={true} onBlur={handleBottomChange}>
                        {props.subtask.getId()}</p>
                </div>
            </NodeToDecorate>
        )
    }
    return wrapperComponent;
}