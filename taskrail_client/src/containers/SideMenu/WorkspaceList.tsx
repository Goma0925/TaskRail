import React from "react";
import Workspace from "../../models/Workspace";

export default function WorkspaceList() {

    let workspace1 = new Workspace("Workspace1");
    let workspace2 = new Workspace("Workspace2");
    let workspace3 = new Workspace("Workspace3");

    let workspaces = [workspace1, workspace2, workspace3];
    
    return <div className="WorkspaceList">
    {
        workspaces.map(
            (Workspace) => {
                return <p>{Workspace.name}</p>
            }
        )
    }
    </div>
}