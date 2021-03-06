import configureMockStore from 'redux-mock-store'
import * as TaskDataOperations from "../../redux/modules/TaskData/TaskDataOperations";
import * as TaskDataActions from "../../redux/modules/TaskData/TaskDataActions";
import * as ClientModels from "../../models/ClientModels";
import {middleware, RootState} from "../../redux/store";
import { AppDispatch } from '../../redux/redux-utils/ReduxUtils';

// Use the same middleware as the production redux store.
const mockStore = configureMockStore<RootState, AppDispatch>(middleware);

describe('Checking if workspace operation dispatch proper actions', () => {
    it('should dispatch '+TaskDataActions.AddWorkspace.name+' action properly.', () => {
      // Temporarily commented out due to the issue API not able to accept test requests without taken.

      // const store = mockStore();
      // const workspaceToCreate = new ClientModels.Workspace(
      //   "TestName: Workspace 1", 
      //   "TestID: ABCDEFG12345678"
      // );
      
      // const expectedActions = [
      //   new TaskDataActions.AddWorkspace(workspaceToCreate),
      // ];

      // // Dispatch the operation to check a proper action is dispatched.
      // store.dispatch(
      //   TaskDataOperations.createWorkspaceOp(workspaceToCreate)
      // ).then(()=>{
      //   // Check expected actions are dispatched after dispatching the operation.
      //   expect(store.getActions()).toEqual(expectedActions);
      // })
    });

    it("should dispatch "+TaskDataActions.DeleteWorkspace.name+" action" , ()=>{
      // const store = mockStore();
      // const testWorkspaceId = "Test Workspace ID";

      // const expectedActions = [
      //   new TaskDataActions.DeleteWorkspace(testWorkspaceId),
      // ];

      // // Dispatch the operation to check a proper action is dispatched.
      // store.dispatch(
      //   TaskDataOperations.deleteWorkspaceOp(testWorkspaceId)
      // ).then(()=>{
      //   // Check expected actions are dispatched after dispatching the operation.
      //   expect(store.getActions()).toEqual(expectedActions);
      // })
    })
  })
  