import { Workspace } from "../../models/ClientModels";
import { TaskDataState } from "../../redux/modules/TaskData/TaskDataReducers";

export function getDummyWorkspace(){
    const dummyWorkspaceId = "WorkspaceID-1";
    const dummyWorkspaceName = "Dummy Workspace";
    const dummyWorkspace = new Workspace(dummyWorkspaceName, dummyWorkspaceId);
    return {
        currentWorkspace: dummyWorkspace,
        byId: {
            [dummyWorkspaceId]: dummyWorkspace
        },
        allIds: [dummyWorkspaceId],
    }
}