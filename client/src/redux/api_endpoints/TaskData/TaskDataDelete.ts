import baseUrl from "../BaseUrl";

const DELETE = {
    workspaces: {
        deleteOneById: 
            (workspaceId:string) => baseUrl + `/taskdata/workspaces/${workspaceId}`
    },
    taskParents: {
        deleteOneByHierarchy: 
            (workspaceId: string, taskParentId: string) => baseUrl + `/taskdata/workspaces/${workspaceId}/taskparents/${taskParentId}`
    },
    sutasks: {
        deleteOneByHierarchy: 
            (workspaceId: string, taskParentId: string, subtaskId:string) => baseUrl + `/taskdata/workspaces/${workspaceId}/taskparents/${taskParentId}/subtasks/${subtaskId}`
    }
}

export default DELETE;