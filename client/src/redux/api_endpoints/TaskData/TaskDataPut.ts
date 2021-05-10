import baseUrl from "../BaseUrl";

const PUT = {
    workspaces: {
        byId: 
            (workspaceId:string) => baseUrl + `/taskdata/workspaces/${workspaceId}`
    },
    taskParents: {
        updateOneByHierarchy: 
            (workspaceId: string, taskParentId: string) => baseUrl + `/taskdata/workspaces/${workspaceId}/taskparents/${taskParentId}`
    },
    subtasks: {
        updateOneByHierarchy: 
            (workspaceId: string, subtaskId: string) => baseUrl + `/taskdata/workspaces/${workspaceId}/taskparents/${subtaskId}/subtasks`
    }
}

export default PUT;