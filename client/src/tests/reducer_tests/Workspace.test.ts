import { TaskParent, Workspace } from "../../models/ClientModels";
import {
  AddWorkspace,
  DeleteWorkspace,
  UpdateWorkspace,
  SetCurrentWorkspace,
  UnsetCurrentWorkspace,
} from "../../redux/modules/TaskData/TaskDataActions";
import TaskDataReducers, {
  initialTaskDataState,
  TaskDataState,
} from "../../redux/modules/TaskData/TaskDataReducers";
import { getDummyWorkspace } from "../utils/ReduxDummyData";

describe("TaskDataReducers with Workspace", () => {
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

  it("should handle" + AddWorkspace.name + "action", () => {
    const workspace1 = new Workspace("TEST WORKSPACE 1", "WS_TEST_ID_1", [
      "TP_TEST_1",
      "TP_TEST_2",
    ]);
    const workspace2 = new Workspace("TEST WORKSPACE 2", "WS_TEST_ID_2", [
      "TP_TEST_1",
    ]);

    let expectedState: TaskDataState = dummyInitialState;
    let newState = TaskDataReducers(
      dummyInitialState,
      new AddWorkspace(workspace1)
    );

    expectedState.workspaces.byId[workspace1.getId()] = workspace1;
    expectedState.workspaces.allIds = expectedState.workspaces.allIds.concat([
      workspace1.getId(),
    ]);
    expect(newState).toEqual(expectedState);

    newState = TaskDataReducers(expectedState, new AddWorkspace(workspace2));
    expectedState.workspaces.byId[workspace2.getId()] = workspace2;
    expectedState.workspaces.allIds.push(workspace2.getId());

    expect(newState).toEqual(expectedState);
  });

  it("should handle" + DeleteWorkspace.name + "action", () => {
    const workspace1 = new Workspace("TEST WORKSPACE 1", "WS_TEST_ID_1", [
      "TP_TEST_1",
      "TP_TEST_2",
    ]);
    const workspace2 = new Workspace("TEST WORKSPACE 2", "WS_TEST_ID_2", [
      "TP_TEST_1",
    ]);

    let stateWithOneWS = TaskDataReducers(
      dummyInitialState,
      new AddWorkspace(workspace1)
    );

    let stateWithTwoWS = TaskDataReducers(
      stateWithOneWS,
      new AddWorkspace(workspace2)
    );

    let stateAfterDeletion = TaskDataReducers(
      stateWithTwoWS,
      new DeleteWorkspace(workspace2.getId())
    );

    expect(stateAfterDeletion).toEqual(stateWithOneWS);
  });

  it("should handle" + UpdateWorkspace.name + "action", () => {
    const beforeUpdateWS = new Workspace("TEST WORKSPACE 1", "WS_TEST_ID_1", [
      "TP_TEST_1",
      "TP_TEST_2",
    ]);
    const afterUpdateWS = new Workspace("TEST WORKSPACE 2", "WS_TEST_ID_1", [
      "TP_TEST_1",
    ]);

    let expectedState = dummyInitialState;

    let newState = TaskDataReducers(
      dummyInitialState,
      new AddWorkspace(beforeUpdateWS)
    );

    let afterUpdateState = TaskDataReducers(
      newState,
      new UpdateWorkspace(afterUpdateWS)
    );

    expectedState.workspaces.allIds.push(afterUpdateWS.getId());
    expectedState.workspaces.byId[afterUpdateWS.getId()] = afterUpdateWS;

    expect(expectedState).toEqual(afterUpdateState);
  });

  it(
    "should handle" +
      SetCurrentWorkspace.name +
      "action as well as" +
      UnsetCurrentWorkspace.name +
      "action",
    () => {
      const workspace1 = new Workspace("TEST WORKSPACE 1", "WS_TEST_ID_1", [
        "TP_TEST_1",
        "TP_TEST_2",
      ]);
      const workspace2 = new Workspace("TEST WORKSPACE 2", "WS_TEST_ID_2", [
        "TP_TEST_1",
      ]);

      let expectedState = dummyInitialState;

      let newState = TaskDataReducers(
        TaskDataReducers(dummyInitialState, new AddWorkspace(workspace1)),
        new AddWorkspace(workspace2)
      ); //Add two workspaces

      //Add both workspaces to expected state as well
      expectedState.workspaces.allIds.push(workspace1.getId());
      expectedState.workspaces.allIds.push(workspace2.getId());
      expectedState.workspaces.byId[workspace1.getId()] = workspace1;
      expectedState.workspaces.byId[workspace2.getId()] = workspace2;

      newState = TaskDataReducers(
        newState,
        new SetCurrentWorkspace(workspace2)
      );

      expectedState.workspaces.currentWorkspace = workspace2;

      expect(newState).toEqual(expectedState);

      newState = TaskDataReducers(
        newState,
        new UnsetCurrentWorkspace(workspace2)
      );

      expectedState.workspaces.currentWorkspace = undefined;

      expect(newState).toEqual(expectedState);

      newState = TaskDataReducers(
        newState,
        new SetCurrentWorkspace(workspace1)
      );

      expectedState.workspaces.currentWorkspace = workspace1;

      expect(newState).toEqual(expectedState);

      newState = TaskDataReducers(
        newState,
        new UnsetCurrentWorkspace(workspace1)
      );

      expectedState.workspaces.currentWorkspace = undefined;

      expect(newState).toEqual(expectedState);
    }
  );
});
