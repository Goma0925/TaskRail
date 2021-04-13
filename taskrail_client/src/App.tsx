
import React, { useEffect } from 'react';
import "./common_css/App.css";
import { RootState } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { SplitPane, NavBar, SideInfoBarContainer, SideMenu, RailContainer } from "./containers/index"; // just export components from index.ts in containers
import { Preloader } from './components/Preloader/Preloader';
import { loadAllContentOp } from './redux/modules/TaskData/TaskDataOperations';
import { ThunkDispatch } from 'redux-thunk';

function App() {
  const contentLoaded = useSelector((state: RootState)=>state.railUi.contentLoaded);
  // After component mount, load all the data
  const dispatch = useDispatch();
  useEffect(()=>{
    if (!contentLoaded){
      dispatch(loadAllContentOp("606fd3592e50394f8ff44e80"));
    }
  }, [])

  return (
    <>
    {
      contentLoaded?
      <SplitPane 
        top={<NavBar/>}
        left={<SideMenu/>} 
        center={<RailContainer />} 
        right={<SideInfoBarContainer/>}
      />:
      <Preloader></Preloader>
    }
    </>
  );
}

export default App;