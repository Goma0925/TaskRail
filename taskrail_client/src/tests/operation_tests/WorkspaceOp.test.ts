import configureMockStore from 'redux-mock-store'
import * as TaskDataOperations from "../../redux/modules/TaskData/TaskDataOperations";
import * as TaskDataActions from "../../redux/modules/TaskData/TaskDataActions";
import * as ClientModels from "../../models/ClientModels";
import {middleware} from "../../redux/store";

// Use the same middleware as the production redux store.
const mockStore = configureMockStore(middleware);

describe('Checking if workspace operation dispatch proper actions', () => {
    it('should dispatch AddWorkspace action properly.(without TaskParent IDs as a parameter) ', () => {
      const store = mockStore();
      const workspaceToCreate = new ClientModels.Workspace(
        "TestName: Workspace 1", 
        "TestID: ABCDEFG12345678"
      );
      
      const expectedActions = [
        new TaskDataActions.AddWorkspace(workspaceToCreate),
      ];

      // Dispatch the operation to check a proper action is dispatched.
      const w = store.dispatch(
        TaskDataOperations.createWorkspaceOp(workspaceToCreate),
        // {type:"TEST ACTION"}
      ).then(()=>{
        // Check expected actions are dispatched after dispatching the operation.
        console.log("Dispatched actions:", store.getActions());
        expect(store.getActions()).toEqual(expectedActions);
      })
    })
  })
  