import React from "react";
import Workspace from "../../models/Workspace";

export default function WorkspaceList() {

    let workspace1 = new Workspace("Jibraan", "Workspace1");
    let workspace2 = new Workspace("Amon", "Workspace2");
    let workspace3 = new Workspace("Michael", "Workspace3");
    let workspace4 = new Workspace("Noah", "Workspace4");

    let workspaces = [workspace1, workspace2, workspace3, workspace4];
    
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