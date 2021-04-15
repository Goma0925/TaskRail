import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import WeekPaginationButton from "../../components/BackgroundWeekCalendar/CalendarPagination/WeekPaginationButton";
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

export default function NavBar() {
  const dispatch = useDispatch();

  const displayRangeStartDate = useSelector((state: RootState) => {
    return state.pagination.displayRangeStartDate;
  });
  let workspaceId = useSelector((state: RootState) => {
    return state.taskData.workspaces.currentWorkspace?.getId();
  });
  let workspaceName = useSelector((state: RootState) => {
    return state.taskData.workspaces.currentWorkspace?.getName();
  });
  let workspacesArray = useSelector((state: RootState) => {
    return state.taskData.workspaces.byId;
  });
  let workspacesIdArray = useSelector((state: RootState) => {
    return state.taskData.workspaces.allIds;
  });

  const workspaceNames = Object.keys(workspacesArray).map((key: string) => {
    return workspacesArray[key].getName();
  });

  const [nameInput, setNameInput] = useState(
    <div
      contentEditable="true"
      onBlur={handleNameChange}
      key={workspaceId}
      placeholder="Workspace Name"
    >
      {workspaceName}
    </div>
  );
  const setDefaultNameInput = (name?: string | undefined) => {
    setNameInput(
      <div
        contentEditable="true"
        onBlur={handleNameChange}
        key={workspaceId}
        placeholder="Workspace Name"
      >
        {name ? name : workspaceName}
      </div>
    );
  };

  const setInputNameInput = (
    id: string,
    operation: boolean,
    placeHolder?: string | undefined
  ) => {
    //Force focus on the name of the workspace
    setNameInput(
      <input
        className="input"
        type="text"
        placeholder={placeHolder}
        onBlur={(event) => {
          if (
            event.target.value &&
            event.target.value.length &&
            event.target.value.trim()
          ) {
            if (!operation) {
              dispatch(
                operations.updateWorkspaceOp(
                  new Workspace(event.target.value, id, [])
                )
              );
            } else {
              dispatch(
                operations.createWorkspaceOp(
                  new Workspace(event.target.value, "", []),
                  true
                )
              );
            }
            setDefaultNameInput(event.target.value);
          } else {
            if (!operation) {
              setDefaultNameInput(workspacesArray[id].getName());
            } else {
              setDefaultNameInput(workspaceName);
            }
          }
        }}
        autoFocus
      />
    );
  };
  const [dropDown, setDropDown] = useState(true);
  const [dropDownMenu, setDropDownMenu] = useState(<div />);
  const focusName = (
    id: string,
    operation: boolean,
    placeHolder?: string | undefined
  ) => {
    placeHolder = placeHolder ? placeHolder : workspacesArray[id].getName();
    if (!operation) {
      dispatch(operations.loadCurrentWorkspaceContent(id));
    }
    setInputNameInput(id, operation, placeHolder);
  };

  const TurnOffDropDownMenu = () => {
    setDropDownMenu(<div />);
  };

  const TurnOnDropDownMenu = () => {
    setDropDownMenu(
      <div className="dropdown-menu" id="dropdown-menu2" role="menu">
        <div className="dropdown-content">
          {Object.keys(workspacesArray).map((id: string) => {
            return (
              <div>
                <a
                  href="javascript:;"
                  className="dropdown-item"
                  onClick={() => {
                    workspaceName = workspacesArray[id].getName();
                    dispatch(operations.loadCurrentWorkspaceContent(id));
                    setNameInput(
                      <div
                        contentEditable="true"
                        onBlur={handleNameChange}
                        key={workspaceId}
                        placeholder="Workspace Name"
                      >
                        {workspacesArray[id].getName()}
                      </div>
                    );
                  }}
                >
                  {workspacesArray[id].getName()}
                </a>
                <div className="card">
                  <footer className="card-footer">
                    <a
                      href="javascript:;"
                      className="card-footer-item"
                      onClick={() => {
                        focusName(id, false);
                      }}
                    >
                      Rename
                    </a>
                    <a
                      href="javascript:;"
                      className="card-footer-item"
                      onClick={() => {
                        if (Object.keys(workspacesArray).length > 1) {
                          dispatch(operations.deleteWorkspaceOp(id));
                          TurnOffDropDownMenu();
                          dispatch(
                            operations.loadCurrentWorkspaceContent(
                              workspacesIdArray[0]
                            )
                          );
                          setDefaultNameInput(
                            workspacesArray[workspacesIdArray[0]].getName()
                          );
                        }
                      }}
                    >
                      Delete
                    </a>
                  </footer>
                </div>
              </div>
            );
          })}

          <hr className="dropdown-divider" />
          <a
            href="javascript:;"
            className="dropdown-item"
            onClick={() => {
              focusName("", true, "Workspace Name");
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
    );
  };
  const dropDownRender = () => {
    setDropDown(!dropDown);
    console.log("DropDown:", dropDown);
    if (dropDown) {
      TurnOnDropDownMenu();
    } else {
      TurnOffDropDownMenu();
    }
  };

  function handleNameChange(event: React.FocusEvent<HTMLHeadingElement>) {
    if (
      event.target.textContent &&
      workspaceId &&
      event.target.textContent != ""
    ) {
      const updatedWorkspace = new Workspace(
        event.target.textContent,
        workspaceId,
        []
      );
      dispatch(operations.updateWorkspaceOp(updatedWorkspace));
      if (!dropDown) {
        dropDownRender();
        dropDownRender();
      }
    } else if (!event.target.textContent && workspaceId) {
      event.target.textContent = "Name";
      const updatedWorkspace = new Workspace(
        event.target.textContent,
        workspaceId,
        []
      );
      dispatch(operations.updateWorkspaceOp(updatedWorkspace));
      if (!dropDown) {
        dropDownRender();
        dropDownRender();
      }
    }
  }

  return (
    <div className="nav">
      <div
        className="dropdown is-active"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            // Not triggered when swapping focus between children
            setDropDown(false);
            setDropDownMenu(<div />);
          }
        }}
      >
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu2"
            onClick={dropDownRender}
          >
            {nameInput}
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
        {dropDownMenu}
      </div>
      <WeekPaginationButton
        displayRangeStartDate={displayRangeStartDate}
      ></WeekPaginationButton>
    </div>
  );
}
