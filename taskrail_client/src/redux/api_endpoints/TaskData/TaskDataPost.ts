import baseUrl from "../BaseUrl";

const POST = {
  workspaces: {
    createOne: () => baseUrl + `/taskdata/workspaces`,
  },
  taskParents: {
    createOneByHierarchy: (workspaceId: string) =>
      baseUrl + `/taskdata/workspaces/${workspaceId}/taskparents`,
  },
  subtasks: {
    createOneByHierarchy: (workspaceId: string, taskParentId: string) =>
      baseUrl +
      `/taskdata/workspaces/${workspaceId}/taskparents/${taskParentId}/subtasks`,
  },
};

export default POST;
