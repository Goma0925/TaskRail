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
  
  // After component mount, load all the data
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn == null) {
      dispatch(loginOp());
    }
    else if (!contentLoaded) {
      console.log("isLoggedIn: " + isLoggedIn);
      dispatch(loadAllWorkspaces());
    }
  }, [isLoggedIn, contentLoaded]);

  // return (
  //   <>
  //     {contentLoaded ? (
  //       <SplitPane
  //         top={<NavBar />}
  //         center={<RailContainer />}
  //         right={<SideInfoBarContainer />}
  //       />
  //     ) : (
  //       <Preloader></Preloader>
  //     )}
  //   </>
  // );

  if (isLoggedIn == null) {
    return (
      <Preloader></Preloader>
    );
  }
  else if (!isLoggedIn) { // load landing page
    return (
      <LoginPage></LoginPage>
    )
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
