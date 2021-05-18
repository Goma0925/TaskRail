import { TaskParent, Subtask } from "../../models/ClientModels";
import {
  AddTaskParent,
  DeleteTaskParent,
  UpdateTaskParent,
  ClearTaskParents,
  AddSubtask,
  DeleteSubtask,
  UpdateSubtask,
  ClearSubtasks,
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

  it("should handle " + AddSubtask.name + "action", () => {
    const taskParent1 = new TaskParent(
      "Test TaskParent 1",
      "TP_TEST_ID1",
      new Date(),
      ["1:Subtask_id1", "1:Subtask_id2"],
      false
    );
    const subtask1 = new Subtask(
      "Test_Subtask_1",
      "SUBTASK_TEST_ID_1",
      "TP_TEST_ID1",
      new Date(),
      new Date()
    );
    let expectedState: TaskDataState = JSON.parse(
      JSON.stringify(initialTaskDataState)
    ); //Deep copy initialState
    // Add the first taskparent
    expectedState.workspaces = getDummyWorkspace();

    let newState = TaskDataReducers(
      TaskDataReducers(dummyInitialState, new AddTaskParent(taskParent1)),
      new AddSubtask(subtask1)
    );
    expectedState.subtasks.allIds.push(subtask1.getId());
    expectedState.subtasks.byId[subtask1.getId()] = subtask1;

    let currentWorkpace = expectedState.workspaces.currentWorkspace;
    // Make sure taskparent ID is added to the current workspace.
    expectedState.workspaces.currentWorkspace.setTaskParentIds(
      currentWorkpace.getTaskParentIds().concat(taskParent1.getId())
    );
    // Add the taskparent object to byId
    expectedState.taskParents.byId[taskParent1.getId()] = taskParent1;
    // Add taskparent ID to the allIds array.
    expectedState.taskParents.allIds = expectedState.taskParents.allIds.concat([
      taskParent1.getId(),
    ]);
    expect(expectedState).toEqual(newState);
  });

  it("should handle " + DeleteSubtask.name + "action", () => {
    const taskParent1 = new TaskParent(
      "Test TaskParent 1",
      "TP_TEST_ID1",
      new Date(),
      ["1:Subtask_id1", "1:Subtask_id2"],
      false
    );
    const subtask1 = new Subtask(
      "Test_Subtask_1",
      "SUBTASK_TEST_ID_1",
      "TP_TEST_ID1",
      new Date(),
      new Date()
    );
    let expectedState: TaskDataState = JSON.parse(
      JSON.stringify(initialTaskDataState)
    ); //Deep copy initialState
    // Add the first taskparent
    expectedState.workspaces = getDummyWorkspace();

    let newState = TaskDataReducers(
      TaskDataReducers(dummyInitialState, new AddTaskParent(taskParent1)),
      new AddSubtask(subtask1)
    );
    expectedState.subtasks.allIds.push(subtask1.getId());
    expectedState.subtasks.byId[subtask1.getId()] = subtask1;

    let currentWorkpace = expectedState.workspaces.currentWorkspace;
    // Make sure taskparent ID is added to the current workspace.
    expectedState.workspaces.currentWorkspace.setTaskParentIds(
      currentWorkpace.getTaskParentIds().concat(taskParent1.getId())
    );
    // Add the taskparent object to byId
    expectedState.taskParents.byId[taskParent1.getId()] = taskParent1;
    // Add taskparent ID to the allIds array.
    expectedState.taskParents.allIds = expectedState.taskParents.allIds.concat([
      taskParent1.getId(),
    ]);
    taskParent1.setSubtaskIdsToCurrentFrame(
      expectedState.taskParents.byId[taskParent1.getId()]
        .getSubtaskIdsFromCurrentFrame()
        .concat([subtask1.getId()])
    );
    expect(expectedState).toEqual(newState);

    newState = TaskDataReducers(newState, new DeleteSubtask(subtask1.getId()));

    expectedState.subtasks.allIds.splice(
      expectedState.subtasks.allIds.indexOf(subtask1.getId()),
      1
    );
    delete expectedState.subtasks.byId[subtask1.getId()];

    taskParent1
      .getSubtaskIdsFromCurrentFrame()
      .splice(
        taskParent1.getSubtaskIdsFromCurrentFrame().indexOf(subtask1.getId()),
        1
      );

    expect(expectedState).toEqual(newState);
  });

  it("should handle " + UpdateSubtask.name + "action", () => {
    const taskParent1 = new TaskParent(
      "Test TaskParent 1",
      "TP_TEST_ID1",
      new Date(),
      ["1:Subtask_id1", "1:Subtask_id2"],
      false
    );
    const subtask1 = new Subtask(
      "Test_Subtask_1",
      "SUBTASK_TEST_ID_1",
      "TP_TEST_ID1",
      new Date(),
      new Date()
    );
    let expectedState: TaskDataState = JSON.parse(
      JSON.stringify(initialTaskDataState)
    ); //Deep copy initialState
    // Add the first taskparent
    expectedState.workspaces = getDummyWorkspace();

    let newState = TaskDataReducers(
      TaskDataReducers(dummyInitialState, new AddTaskParent(taskParent1)),
      new AddSubtask(subtask1)
    );
    expectedState.subtasks.allIds.push(subtask1.getId());
    expectedState.subtasks.byId[subtask1.getId()] = subtask1;

    let currentWorkpace = expectedState.workspaces.currentWorkspace;
    // Make sure taskparent ID is added to the current workspace.
    expectedState.workspaces.currentWorkspace.setTaskParentIds(
      currentWorkpace.getTaskParentIds().concat(taskParent1.getId())
    );
    // Add the taskparent object to byId
    expectedState.taskParents.byId[taskParent1.getId()] = taskParent1;
    // Add taskparent ID to the allIds array.
    expectedState.taskParents.allIds = expectedState.taskParents.allIds.concat([
      taskParent1.getId(),
    ]);
    taskParent1.setSubtaskIdsToCurrentFrame(
      expectedState.taskParents.byId[taskParent1.getId()]
        .getSubtaskIdsFromCurrentFrame()
        .concat([subtask1.getId()])
    );
    expect(expectedState).toEqual(newState);

    let subtask2 = new Subtask(
      "Test_Subtask_Update",
      "SUBTASK_TEST_ID_1",
      "TP_TEST_ID1",
      new Date(),
      new Date()
    );

    newState = TaskDataReducers(newState, new UpdateSubtask(subtask2));

    expectedState.subtasks.byId[subtask1.getId()] = subtask2;

    expect(expectedState).toEqual(newState);
  });

  it("should handle " + ClearSubtasks.name + "action", () => {
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
