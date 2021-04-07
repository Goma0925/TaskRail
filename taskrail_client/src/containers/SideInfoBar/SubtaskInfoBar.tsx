import Subtask from "../../models/ClientModels/Subtask";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { UpdateSubtask } from "../../redux/modules/TaskData/TaskDataActions";

// Typescript uses interfaces (static, compile-time checking)
// We also have PropTypes by React.js which does run-time type checking
interface SideInfoBarProps {
  subtask: Subtask;
}

/** SideInfoBar's props must have the same
shape as the Props interface object **/
export function SubtaskInfoBar(props: SideInfoBarProps) {
  // const [text, setText] = useState(props?.text);
  var months: { [name: string]: string } = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  const subtask = props.subtask;
  const title = subtask.getName();
  const complete = subtask.getStatus();
  const deadline = subtask.getSubtaskDeadline();
  const note = subtask.getNote();
  const dispatch = useDispatch();
  function return_date_str(date: Date) {
    let date_str = date.toString();
    let split_up_date = date_str.split(" ");
    let returning_str =
      split_up_date[3] +
      "-" +
      months[split_up_date[1]] +
      "-" +
      split_up_date[2];

    console.log(returning_str);
    return returning_str;
  }
  function handleNoteChange(event: any) {
    // update this type in future
    let updatedSubtask = subtask.getCopy();
    updatedSubtask.setNote(event.target.value);
    dispatch(new UpdateSubtask(updatedSubtask));
  }
  function handleDateChange(event: any) {
    var split_str = event.target.value.split("-");
    var year = Number(split_str[0]);
    var month = Number(split_str[1]) - 1;
    var day = Number(split_str[2]);
    var returning_date = new Date(year, month, day);
    var updatedSubtask = subtask.getCopy();
    updatedSubtask.setSubtaskDeadline(returning_date);
    dispatch(new UpdateSubtask(updatedSubtask));
  }

  function handleTitleChange(event: any) {
    let updatedSubtask = subtask.getCopy();
    updatedSubtask.setName(event.target.textContent);
    dispatch(new UpdateSubtask(updatedSubtask));
  }

  function handleCheckboxChange(event: any) {
    let updatedSubtask = subtask.getCopy();
    if (event.target.checked) {
      updatedSubtask.completeTask();
    } else {
      updatedSubtask.uncompleteTask();
    }
    dispatch(new UpdateSubtask(updatedSubtask));
  }

  return (
    <div className="sideinfo-bar">
      <div className="TitleAndCheckbox">
        <input
          type="checkbox"
          checked={complete}
          className="Checkbox"
          onClick={handleCheckboxChange}
        />
        <h1
          className="Title"
          contentEditable={"true"}
          onBlur={handleTitleChange}
          suppressContentEditableWarning={true}
        >
          {title}
        </h1>
      </div>
      <hr />
      <div className="InputList">
        <div className="Deadline">
          <h3 className="DeadlineLabel">Deadline:</h3>
          <input
            type="date"
            value={return_date_str(deadline)}
            onChange={handleDateChange}
            className="DeadlineInput"
          />
        </div>
        <div className="Note">
          <h3 className="NoteLabel">Note:</h3>
          <textarea
            value={note}
            onChange={handleNoteChange}
            className="NoteInput"
          />
        </div>
      </div>
    </div>
  );
}

export default SubtaskInfoBar;
