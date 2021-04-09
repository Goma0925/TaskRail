import baseUrl from "../BaseUrl";

const PUT = {
    workspaces: {
        byId: 
            (workspaceId:string) => baseUrl + `/users/:userId/workspaces/${workspaceId}`
    },
    taskParents: {
        updateOneByHierarchy: 
            (workspaceId: string, taskParentId: string) => baseUrl + `/users/:userId/workspaces/${workspaceId}/taskparents/${taskParentId}`
    },
    sutasks: {
        updateOneByHierarchy: 
            (workspaceId: string, taskParentId: string) => baseUrl + `/users/:userId/workspaces/${workspaceId}/taskparents/${taskParentId}/subtasks`
    }
}

export default PUT;