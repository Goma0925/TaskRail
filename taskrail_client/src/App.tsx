import React from 'react';
// import { NavBar, SideMenu, SideInfoBar} from "./containers/";
import { NavBar} from "./containers/NavBar";
import { SideInfoBar } from "./containers/index"; // just export components from index.ts in containers

function App() {
  return (
    <>
      <NavBar></NavBar>
      <SideInfoBar text={"some text"}></SideInfoBar>
    </>
  );
}

export default App;
