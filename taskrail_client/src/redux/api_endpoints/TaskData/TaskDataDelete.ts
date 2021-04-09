import baseUrl from "../BaseUrl";

const DELETE = {
    workspaces: {
        deleteOneById: 
            (workspaceId:string) => baseUrl + `/users/:userId/workspaces/${workspaceId}`
    },
    taskParents: {
        deleteOneByHierarchy: 
            (workspaceId: string, taskParentId: string) => baseUrl + `/users/:userId/workspaces/${workspaceId}/taskparents/${taskParentId}`
    },
    sutasks: {
        deleteOneByHierarchy: 
            (workspaceId: string, taskParentId: string, subtaskId:string) => baseUrl + `/users/:userId/workspaces/${workspaceId}/taskparents/${taskParentId}/subtasks/${subtaskId}`
    }
}

export default DELETE;