import baseUrl from "../BaseUrl";

const GET = {
    workspaces:{
        byId: 
            (workspaceId:string) => baseUrl+`/users/1/workspaces/${workspaceId}`,
        all:
            () =>  baseUrl+`/users/1/workspaces` 
    },
    
    subtasks: {
        allByHierarchy: 
            (workspaceId: string, taskParentId: string)=> baseUrl+`/users/:userId/workspaces/${workspaceId}/taskparents/${taskParentId}/subtasks`,
    }
}
export default GET;