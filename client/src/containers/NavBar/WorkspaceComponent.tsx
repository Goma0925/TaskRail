import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import WeekPaginationButton from "../../components/BackgroundWeekCalendar/CalendarPagination/WeekPaginationButton";
import EditableTextbox from "../../components/CommonParts/EditableTextbox/EditableTextbox";
import AutoSaveTextarea from "../../components/CommonParts/AutoSaveTextarea/AutoSaveTextarea";
import { RootState } from "../../redux/store";
import { AppDispatch } from "../../redux/redux-utils/ReduxUtils";
import "./NavBar.css";
import * as Actions from "../../redux/modules/TaskData/TaskDataActions";
import Workspace from "../../models/ClientModels/Workspace";
import TaskParent from "../../models/ClientModels/TaskParent";
import * as operations from "../../redux/modules/TaskData/TaskDataOperations";
import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { JsxElement } from "typescript";
import WorkspaceList from "../SideMenu/WorkspaceList";
import { SelectItem } from "../../redux/modules/RailUi/RailUiActions";
import { rename } from "fs";

export default function WorkspaceComponent() {
  const dispatch = useDispatch();

  const workspaceId = useSelector((state: RootState) => {
    return state.taskData.workspaces.currentWorkspace?.getId();
  });
  const workspaceName = useSelector((state: RootState) => {
    return state.taskData.workspaces.currentWorkspace?.getName();
  });
  let workspacesArray = useSelector((state: RootState) => {
    return state.taskData.workspaces.byId;
  });
  let workspacesIdArray = useSelector((state: RootState) => {
    return state.taskData.workspaces.allIds;
  });

  const [showingDropdown, setShowingDropdown] = useState("hidden"); //Show or hide drop down
  const [focusBool, setFocusBool] = useState(false); //Focus on the name of workspace

  const Save = (name: string) => {
    if (workspaceId && workspaceName) {
      if (name.trim()) {
        dispatch(
          operations.updateWorkspaceOp(new Workspace(name, workspaceId))
        );
        setFocusBool(false);
      } else {
        operations.updateWorkspaceOp(new Workspace(workspaceName, workspaceId));
      }
    }
  };

  const addWorkspace = () => {
    dispatch(
      operations.createWorkspaceOp(
        new Workspace("Untitled Workspace", ""),
        true
      )
    );
  };

  const renameWorkspace = (id: string) => {
    dispatch(operations.loadCurrentWorkspaceContent(id));
    setFocusBool(true);
  };

  const deleteWorkspace = (id: string) => {
    if (workspacesIdArray.length > 1) {
      if (id == workspaceId) {
        const nextId = workspacesIdArray[workspacesIdArray.indexOf(id) + 1]
          ? workspacesIdArray[workspacesIdArray.indexOf(id) + 1]
          : workspacesIdArray[workspacesIdArray.indexOf(id) - 1];
        dispatch(operations.loadCurrentWorkspaceContent(nextId));
      }
      dispatch(operations.deleteWorkspaceOp(id));
    }
  };
  return (
    <div className="workspace-selector">
      <div className="dropdown is-active">
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={() => {
              if (showingDropdown == "hidden") {
                setShowingDropdown("showingDropdown");
              } else {
                setShowingDropdown("hidden");
              }
            }}
          >
            <EditableTextbox
              className="DropdownButton"
              updateTextTo={workspaceName ? workspaceName : ""}
              placeholder="Task Step Title"
              onSave={Save}
              unfocusOnEnterKey={true}
              focus={focusBool}
            />
            <span className="icon is-small">
              <FontAwesomeIcon
                className="fas fa-angle-down"
                aria-hidden="true"
                icon={faAngleDown}
                size="sm"
              />
            </span>
          </button>
        </div>
        <div
          className={"dropdown-menu" + " " + showingDropdown}
          id="dropdown-menu"
          role="menu"
        >
          <div className="dropdown-content">
            <div className="Workspace Names">
              {Object.keys(workspacesArray).map((id: string) => {
                if (id != workspaceId) {
                  return (
                    <div>
                      <a
                        href="javascript:;"
                        className="dropdown-item"
                        onClick={() => {
                          if (showingDropdown != "hidden") {
                            setShowingDropdown("hidden");
                            dispatch(
                              operations.loadCurrentWorkspaceContent(id)
                            );
                          }
                        }}
                      >
                        {workspacesArray[id].getName()}
                      </a>
                      <span className="is-small">
                        <div className="card">
                          <footer className="card-footer">
                            <a //RENAME LINK CARD
                              href="javascript:;"
                              className="card-footer-item rename"
                              onClick={() => {
                                renameWorkspace(id);
                              }}
                            >
                              RENAME
                            </a>
                            <a //DELETE LINK CARD
                              href="javascript:;"
                              className="card-footer-item deleteCard"
                              onClick={() => {
                                deleteWorkspace(id);
                              }}
                            >
                              DELETE
                            </a>
                          </footer>
                        </div>
                      </span>
                    </div>
                  );
                }
              })}
            </div>
            <hr className="dropdown-divider" />
            <a
              href="javascript:;"
              className="dropdown-item"
              onClick={() => {
                addWorkspace();
              }}
            >
              <span className="icon is-small">
                <FontAwesomeIcon
                  className="fas fa-angle-down"
                  aria-hidden="true"
                  icon={faPlus}
                  size="sm"
                />
              </span>
              Add Workspace
            </a>
          </div>
        </div>
      </div>

      <div className={showingDropdown}></div>
    </div>
  );
}
