import baseUrl from "../BaseUrl";

const POST = {
    workspaces: {
        create: () => baseUrl + `/users/1/workspaces`
    },
    taskParents: {
        createForWorkspace: (workspaceId: string) => baseUrl + `/users/1/workspaces/${workspaceId}/taskparents`
    },
    sutasks: {
        createByHierarchy: (workspaceId: string, taskParentId: string) => baseUrl + `/users/:userId/workspaces/${workspaceId}/taskparents/${taskParentId}/subtasks`
    }
}

export default POST;