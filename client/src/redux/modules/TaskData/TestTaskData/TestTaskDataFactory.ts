import Subtask from "../../../../models/ClientModels/Subtask";
import TaskParent from "../../../../models/ClientModels/TaskParent";
import Workspace from "../../../../models/ClientModels/Workspace";

function getPreviousSunday(d: Date) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day; // adjust when day is sunday
  return new Date(d.setDate(diff));
}

const taskParentsNum = 3;
const allTaskParentIds = [...Array(taskParentsNum)].map((_, i) => i.toString());

const allWorkspaceIds = ["WS-1"];
const workspace = new Workspace(
  "My first workspace",
  allWorkspaceIds[0],
  allTaskParentIds
);

const taskParents = allTaskParentIds.map(
  (id) => new TaskParent("TaskParent-" + id, id, null, [], false)
);

// Create subtasks for each task parent.
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const subtasks: Subtask[] = [];
const allSubtaskIds: string[] = [];
var subtaskId = 0;
allTaskParentIds.map((taskParentId, taskParentIndex) => {
  const monday = getPreviousSunday(new Date());
  [...Array(14)].map((_, dayIndex) => {
    if ((dayIndex + taskParentIndex) % 2 == 0) {
      const assignedDate = getPreviousSunday(new Date());
      assignedDate.setDate(monday.getDate() + dayIndex);
      subtasks.push(
        new Subtask(
          "Subtask on " + (assignedDate.getMonth()+1) + "/" +assignedDate.getDate() + "(" + days[assignedDate.getDay()]+")",
          subtaskId.toString(),
          taskParentId,
          assignedDate,
          assignedDate
        )
      );
      taskParents[taskParentIndex].addSubtaskIdToCurrentFrame(
        subtaskId.toString()
      );
      allSubtaskIds.push(subtaskId.toString());
      subtaskId += 1;
    }
  });
});

const taskParentById: { [taskParentId: string]: TaskParent } = {};
taskParents.map((taskParent) => {
  taskParentById[taskParent.getId()] = taskParent;
});

const subtaskbyId: { [subtask: string]: Subtask } = {};
subtasks.map((subtask) => {
  subtaskbyId[subtask.getId()] = subtask;
});

export default {
  workspace,
  allWorkspaceIds,
  taskParentById,
  allTaskParentIds,
  subtaskbyId,
  allSubtaskIds,
};
