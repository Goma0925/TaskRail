import React from 'react';
// import { NavBar, SideMenu, SideInfoBar} from "./containers/";
import { NavBar, SideInfoBar, SideMenu } from "./containers/index"; // just export components from index.ts in containers

function App() {
  return (
    <>
      <NavBar></NavBar>
      <SideMenu></SideMenu>
      <SideInfoBar text={"some text"}></SideInfoBar>
    </>
  );
}

export default App;
