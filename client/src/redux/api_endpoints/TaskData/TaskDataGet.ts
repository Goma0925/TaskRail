import baseUrl from "../BaseUrl";

const GET = {
    workspaces:{
        getOneById: 
            (workspaceId:string) => baseUrl+`/taskdata/workspaces/${workspaceId}`,
        getAll:
            () =>  baseUrl+`/taskdata/workspaces` 
    },
    
    subtasks: {
        getAllByHierarchy: 
            (workspaceId: string, taskParentId: string)=> baseUrl+`/taskdata/workspaces/${workspaceId}/taskparents/${taskParentId}/subtasks`,
    }
}
export default GET;