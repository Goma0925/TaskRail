import baseUrl from "../BaseUrl";

const POST = {
    workspaces: {
        createOne: () => baseUrl + `/users/1/workspaces`
    },
    taskParents: {
        createOneByHierarchy: (workspaceId: string) => baseUrl + `/users/1/workspaces/${workspaceId}/taskparents`
    },
    sutasks: {
        createOneByHierarchy: (workspaceId: string, taskParentId: string) => baseUrl + `/users/:userId/workspaces/${workspaceId}/taskparents/${taskParentId}/subtasks`
    }
}

export default POST;