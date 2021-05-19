// import configureMockStore from "redux-mock-store";
// import * as TaskDataOperations from "../../redux/modules/TaskData/TaskDataOperations";
// import * as TaskDataActions from "../../redux/modules/TaskData/TaskDataActions";
// import * as ClientModels from "../../models/ClientModels";
// import middleware, { RootState } from "../../redux/store";
// import { AppDispatch } from "../../redux/redux-utils/ReduxUtils";

// // Use the same middleware as the production redux store.
// const mockStore = configureMockStore<RootState, AppDispatch>(middleware);

describe("Checking of load current workspace operation does load the current workspace.", () => {
  it("should dispatch LoadCurrentWorkspaceOp operation properly based on the id that is passed in.\
//      It should clear subtasks, taskparents in the redux store, and should add a new workspace to the \
//      redux store with its taskparents and containing that specific workspace's attributes", () => {
//     // const store = mockStore();
//     // const workspaceId = "6079b3ec310aea90e2589f3e";
//     // const workspace = new ClientModels.Workspace("new workspace", workspaceId);
//     // const expectedActions = [
//     //   new TaskDataActions.ClearSubtasks(),
//     //   new TaskDataActions.ClearSubtasks(),
//     //   new TaskDataActions.AddWorkspace(workspace),
//     //   new TaskDataActions.SetCurrentWorkspace(workspace),
//     // ];

//     // Dispatch the operation to check a proper action is dispatched.
//     // store
//     //   .dispatch(
//     //     TaskDataOperations.loadCurrentWorkspaceContent(workspaceId)
//     //     // {type:"TEST ACTION"}
//     //   )
//     //   .then(() => {
//     //     // Check expected actions are dispatched after dispatching the operation.
//     //     console.log("Dispatched actions:", store.getActions());
//     //     expect(store.getActions()).toEqual(expectedActions);
//     //   });
//     //   console.log("Dispatched actions:", store.getActions());

  });
});
