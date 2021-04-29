import { TaskParent } from "../../models/ClientModels";
import { AddTaskParent, UpdateTaskParent } from "../../redux/modules/TaskData/TaskDataActions";
import TaskDataReducers, { initialTaskDataState, TaskDataState } from "../../redux/modules/TaskData/TaskDataReducers"

describe('TaskDataReducers with TaskParent', () => {
    it('should return the initial state', () => {
      expect(TaskDataReducers(undefined, {type: "ANY_TEST_ACTION"})).toEqual(initialTaskDataState);
    });
  
    it('should handle '+ AddTaskParent.name +' action', () => {
        const taskParent1 = new TaskParent("Test TaskParent 1", "TP_TEST_ID1", new Date(), ["1:Subtask_id1", "1:Subtask_id2"], false);
        const taskParent2 = new TaskParent("Test TaskParent 2", "TP_TEST_ID2", new Date(), ["2:Subtask_id1", "2:Subtask_id2"], false);

        let expectedState: TaskDataState = JSON.parse(JSON.stringify(initialTaskDataState)); //Deep copy initialState
        
        // Add the first taskparent 
        expectedState.taskParents.byId[taskParent1.getId()] = taskParent1;
        expectedState.taskParents.allIds.push(taskParent1.getId());
        // Get the updated state
        let newState = TaskDataReducers(
            initialTaskDataState, 
            new AddTaskParent(taskParent1)
        );
        expect(newState).toEqual(expectedState);

        // Add the second taskparent
        expectedState.taskParents.byId[taskParent2.getId()] = taskParent2;
        expectedState.taskParents.allIds.push(taskParent2.getId());
        // Get the updated state
        newState = TaskDataReducers(
            expectedState,
            new AddTaskParent(taskParent2)
        )
        expect(newState).toEqual(expectedState);        
  });

  it('should handle '+UpdateTaskParent.name+' action', () => {
    let expectedState: TaskDataState = JSON.parse(JSON.stringify(initialTaskDataState)); //Deep copy initialState
    const taskParentId = "TP_TEST_ID1";
    const initialTaskParent = new TaskParent("Test TaskParent 1", taskParentId, new Date(), ["1:Subtask_id1", "1:Subtask_id2"], false);
    const updatedTaskParent = new TaskParent("New TaskParent Name", taskParentId, new Date, ["1:Subtask_id1", "1:Subtask_id2"], true)

    let newState = TaskDataReducers(
        initialTaskDataState, 
        new AddTaskParent(initialTaskParent)
    )
    // Set the updated the taskparent 
    expectedState.taskParents.byId[updatedTaskParent.getId()] = updatedTaskParent;
    expectedState.taskParents.allIds.push(updatedTaskParent.getId());
    expect(
        TaskDataReducers(
            expectedState,
            new UpdateTaskParent(updatedTaskParent)
        )
    ).toEqual(expectedState);        
})
});