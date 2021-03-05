import React from "react";
import Workspace from "../../models/Workspace";

export default function WorkspaceList() {

    let workspace1 = new Workspace("Workspace1", "id1");
    let workspace2 = new Workspace("Workspace2", "id2");
    let workspace3 = new Workspace("Workspace3", "id3");

    let workspaces = [workspace1, workspace2, workspace3];
    
    return <ul className="WorkspaceList">
    {
        workspaces.map(
            (Workspace) => {
                return (
                    <div className="sidemenu-item">
                        <div className="sidemenu-item-text">{Workspace.getName()}</div>
                    </div>
                )
            }
        )
    }
    </ul>
}