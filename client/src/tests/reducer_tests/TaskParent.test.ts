import { TaskParent, Subtask } from "../../models/ClientModels";
import {
  AddTaskParent,
  DeleteTaskParent,
  UpdateTaskParent,
  ClearTaskParents,
  AddSubtask,
} from "../../redux/modules/TaskData/TaskDataActions";
import TaskDataReducers, {
  initialTaskDataState,
  TaskDataState,
} from "../../redux/modules/TaskData/TaskDataReducers";
import { getDummyWorkspace } from "../utils/ReduxDummyData";

describe("TaskDataReducers with TaskParent", () => {
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

  it("should handle " + AddTaskParent.name + " action", () => {
    const taskParent1 = new TaskParent(
      "Test TaskParent 1",
      "TP_TEST_ID1",
      new Date(),
      ["1:Subtask_id1", "1:Subtask_id2"],
      false
    );
    const taskParent2 = new TaskParent(
      "Test TaskParent 2",
      "TP_TEST_ID2",
      new Date(),
      ["2:Subtask_id1", "2:Subtask_id2"],
      false
    );
    let expectedState: TaskDataState = dummyInitialState; //Deep copy initialState

    // Add the first taskparent
    let newState = TaskDataReducers(
      dummyInitialState,
      new AddTaskParent(taskParent1)
    );
    // Get the expected state with the first taskparent
    let currentWorkpace = expectedState.workspaces.currentWorkspace;
    // Make sure taskparent ID is added to the current workspace.
    expectedState.workspaces.currentWorkspace.setTaskParentIds(
      currentWorkpace.getTaskParentIds().concat(taskParent1.getId())
    );
    expectedState.workspaces.byId[currentWorkpace.getId()].setTaskParentIds(
      currentWorkpace.getTaskParentIds().concat(taskParent1.getId())
    );
    // Add the taskparent object to byId
    expectedState.taskParents.byId[taskParent1.getId()] = taskParent1;
    // Add taskparent ID to the allIds array.
    expectedState.taskParents.allIds = expectedState.taskParents.allIds.concat([
      taskParent1.getId(),
    ]);
    expect(newState).toEqual(expectedState);

    // Add the second taskparent
    newState = TaskDataReducers(expectedState, new AddTaskParent(taskParent2));
    // Get the expected state with the second taskparent
    expectedState.taskParents.byId[taskParent2.getId()] = taskParent2;
    expectedState.taskParents.allIds.push(taskParent2.getId());
    expect(newState).toEqual(expectedState);
  });

  it("should handle " + UpdateTaskParent.name + " action", () => {
    let expectedState: TaskDataState = dummyInitialState; //Deep copy initialState
    const taskParentId = "TP_TEST_ID1";
    const initialTaskParent = new TaskParent(
      "Test TaskParent 1",
      taskParentId,
      new Date(),
      ["1:Subtask_id1", "1:Subtask_id2"],
      false
    );
    const updatedTaskParent = new TaskParent(
      "New TaskParent Name",
      taskParentId,
      new Date(),
      ["1:Subtask_id1", "1:Subtask_id2"],
      true
    );

    let beforeUpdateState = TaskDataReducers(
      dummyInitialState,
      new AddTaskParent(initialTaskParent)
    );

    // Update the taskparent
    let updatedState = TaskDataReducers(
      beforeUpdateState,
      new UpdateTaskParent(updatedTaskParent)
    );
    // Set the updated the taskparent in the expected state
    expectedState.taskParents.byId[updatedTaskParent.getId()] =
      updatedTaskParent;
    expectedState.taskParents.allIds.push(updatedTaskParent.getId());
    expect(updatedState).toEqual(expectedState);
  });

  it("should handle " + DeleteTaskParent.name + " action", () => {
    const taskParent1 = new TaskParent(
      "Test TaskParent 1",
      "TP_TEST_ID1",
      new Date(),
      [],
      false
    );
    const taskParent2 = new TaskParent(
      "Test TaskParent 2",
      "TP_TEST_ID2",
      new Date(),
      [],
      false
    );
    const subtask = new Subtask("Test Subtask", "SUBTASK_ID1", taskParent2.getId(), new Date(), new Date());

    // Create two dummy taskparents in Redux as setup.,
    let stateWithOneTp = TaskDataReducers(
      dummyInitialState,
      new AddTaskParent(taskParent1)
    );
    let stateWithTwoTp = TaskDataReducers(
      stateWithOneTp,
      new AddTaskParent(taskParent2)
    );
    let stateWithTwoTpAndSubtask = TaskDataReducers(
      stateWithTwoTp,
      new AddSubtask(subtask)
    );

    // Delete just taskparent 2
    let stateAfterDeletion = TaskDataReducers(
      stateWithTwoTpAndSubtask,
      new DeleteTaskParent(taskParent2.getId())
    );

    // State should be left with only one taskparent.
    expect(stateAfterDeletion).toStrictEqual(stateWithOneTp);
  });

  it("should handle" + ClearTaskParents.name + "action", () => {
    const taskParent1 = new TaskParent(
      "Test TaskParent 1",
      "TP_TEST_ID1",
      new Date(),
      ["1:Subtask_id1", "1:Subtask_id2"],
      false
    );
    const taskParent2 = new TaskParent(
      "Test TaskParent 2",
      "TP_TEST_ID2",
      new Date(),
      ["2:Subtask_id1", "2:Subtask_id2"],
      false
    );
    const subtask1 = new Subtask(
      "TEST_SUBTASK_1",
      "SUBTASK_TEST_ID_1",
      "TP_TEST_ID1",
      new Date(),
      new Date()
    );
    const subtask2 = new Subtask(
      "TEST_SUBTASK_2",
      "SUBTASK_TEST_ID_2",
      "TP_TEST_ID1",
      new Date(),
      new Date()
    );
    const subtask3 = new Subtask(
      "TEST_SUBTASK_3",
      "SUBTASK_TEST_ID_3",
      "TP_TEST_ID2",
      new Date(),
      new Date()
    );
    const subtask4 = new Subtask(
      "TEST_SUBTASK_4",
      "SUBTASK_TEST_ID_4",
      "TP_TEST_ID2",
      new Date(),
      new Date()
    );
    let expectedState: TaskDataState = dummyInitialState; //Deep copy initialState

    // Add the first taskparent
    let newState = TaskDataReducers(
      dummyInitialState,
      new AddTaskParent(taskParent1)
    );
    newState = TaskDataReducers(newState, new AddTaskParent(taskParent2)); //Add second taskparent
    newState = TaskDataReducers(newState, new AddSubtask(subtask1)); //Add first subtask
    newState = TaskDataReducers(newState, new AddSubtask(subtask2)); //Add second subtask
    newState = TaskDataReducers(newState, new AddSubtask(subtask3)); //Add third subtask
    newState = TaskDataReducers(newState, new AddSubtask(subtask4)); //Add fourth subtask
    newState = TaskDataReducers(newState, new ClearTaskParents()); //Clear taskparents

    expect(expectedState).toEqual(newState);
  });
});
