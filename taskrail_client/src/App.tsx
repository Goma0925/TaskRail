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
import { loginOp } from "./redux/modules/User/UserOperation";

function App() {
  const contentLoaded = useSelector(
    (state: RootState) => state.railUi.contentLoaded
  );
  const isLoggedIn = useSelector(
    (state: RootState) => state.user.isLoggedIn
  );
  // After component mount, load all the data
  const dispatch = useDispatch();
  useEffect(() => {
    // if (isLoggedIn == null) {
      dispatch(loginOp());
    // }
    if (!contentLoaded) {
      dispatch(loadAllWorkspaces());
    }
  }, []);

  return (
    <>
      {contentLoaded ? (
        <SplitPane
          top={<NavBar />}
          center={<RailContainer />}
          right={<SideInfoBarContainer />}
        />
      ) : (
        <Preloader></Preloader>
      )}
    </>
  );
}

export default App;
