
import React from 'react';
import "./App.css";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";
import { SplitPane, NavBar, SideInfoBarContainer, SideMenu, RailContainer } from "./containers/index"; // just export components from index.ts in containers
import { Preloader } from './components/Preloader/Preloader';

function App() {
  const contentLoaded = useSelector((state: RootState)=>state.railUi.contentLoaded);
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