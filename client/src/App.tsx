import React, { useEffect } from "react";
import "./common_css/App.css";
import "./common_css/bulma.min.css";
import { RootState } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  SplitPane,
  NavBar,
  SideInfoBarContainer,
  SideMenu,
  RailContainer,
} from "./containers/index"; // just export components from index.ts in containers
import { Preloader } from "./components/Preloader/Preloader";
import {
  loadAllWorkspaces,
  loadCurrentWorkspaceContent,
} from "./redux/modules/TaskData/TaskDataOperations";
import { ThunkDispatch } from "redux-thunk";
import { loginOp, SignupOp } from "./redux/modules/User/UserOperation";
import LoginPage from "./containers/LoginPage/LoginPage";

function App() {
  const contentLoaded = useSelector(
    (state: RootState) => state.railUi.contentLoaded
  );
  const isLoggedIn = useSelector(
    (state: RootState) => state.user.isLoggedIn
  );
  const workspace = useSelector(
    (state: RootState)=> state.taskData.workspaces.currentWorkspace
  )
  
  // After component mount, load all the data
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn == null) {      
      dispatch(loginOp());
    }
    else if (!contentLoaded && isLoggedIn) {
      dispatch(loadAllWorkspaces());
    }
  }, [isLoggedIn, contentLoaded]);

  if (isLoggedIn == false) { // load landing page
    return (
      <LoginPage></LoginPage>
    )
  }
  if (isLoggedIn == null || !contentLoaded) {
    return (
      <Preloader></Preloader>
    );
  }
  else { // load main contains
    return (
      <>
          <SplitPane
            top={<NavBar />}
            center={<RailContainer />}
            right={<SideInfoBarContainer />}
          />
      </>
    );
  }

}

export default App;
