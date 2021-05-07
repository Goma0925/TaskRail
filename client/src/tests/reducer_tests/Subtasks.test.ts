import { Subtask, TaskParent, Workspace } from "../../models/ClientModels";
import {
  AddSubtask,
  AddTaskParent,
  ClearSubtasks,
} from "../../redux/modules/TaskData/TaskDataActions";
import TaskDataReducers, {
  initialTaskDataState,
  TaskDataState,
} from "../../redux/modules/TaskData/TaskDataReducers";
import { getDummyWorkspace } from "../utils/ReduxDummyData";

describe("TaskDataReducers with Subtasks", () => {
  let dummyInitialState: TaskDataState;
  beforeEach(() => {
    //Initialize a initial redux state that has a dummy workplace set.
    dummyInitialState = JSON.parse(JSON.stringify(initialTaskDataState)); //Deep copy initialState
    dummyInitialState.workspaces = getDummyWorkspace();
  });

  it("should return the initial state", () => {
    expect(TaskDataReducers(undefined, { type: "TEST_ACTION" })).toEqual(
      initialTaskDataState
    );
  });

  it("should handle" + ClearSubtasks.name + "action", () => {
    //Clear Subtasks test
    const taskparent = new TaskParent("TEST_TP_1", "TEST_TP_ID_1", new Date());
    const subtask1 = new Subtask(
      "TEST_SUBTASK_1",
      "SUBTASK_TEST_ID_1",
      "TEST_TP_ID_1",
      new Date(),
      new Date()
    );
    const subtask2 = new Subtask(
      "TEST_SUBTASK_1",
      "SUBTASK_TEST_ID_2",
      "TEST_TP_ID_1",
      new Date(),
      new Date()
    );

    taskparent.addSubtaskIdToCurrentFrame("SUBTASK_TEST_ID_1");
    taskparent.addSubtaskIdToCurrentFrame("SUBTASK_TEST_ID_2");

    let expectedState = dummyInitialState;

    let newState = TaskDataReducers(
      dummyInitialState,
      new AddTaskParent(taskparent)
    );

    expectedState.taskParents.byId[taskparent.getId()] = taskparent;
    expectedState.taskParents.allIds.push(taskparent.getId());

    let currentWorkpace = expectedState.workspaces.currentWorkspace;

    expectedState.workspaces.currentWorkspace.setTaskParentIds(
      currentWorkpace.getTaskParentIds().concat(taskparent.getId())
    );

    expect(expectedState).toEqual(newState);

    newState = TaskDataReducers(newState, new AddSubtask(subtask1));

    newState = TaskDataReducers(newState, new AddSubtask(subtask2));

    newState = TaskDataReducers(newState, new ClearSubtasks());

    expect(newState).toEqual(expectedState);
  });
});
