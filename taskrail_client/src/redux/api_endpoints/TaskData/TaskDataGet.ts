import baseUrl from "../BaseUrl";

const GET = {
    workspaces:{
        getOneById: 
            (workspaceId:string) => baseUrl+`/users/1/workspaces/${workspaceId}`,
        getAll:
            () =>  baseUrl+`/users/1/workspaces` 
    },
    
    subtasks: {
        getAllByHierarchy: 
            (workspaceId: string, taskParentId: string)=> baseUrl+`/users/:userId/workspaces/${workspaceId}/taskparents/${taskParentId}/subtasks`,
    }
}
export default GET;