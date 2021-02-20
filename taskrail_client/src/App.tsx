
import React from 'react';

// import { NavBar, SideMenu, SideInfoBar} from "./containers/";
import { Layout, NavBar, SideInfoBar, SideMenu, RailContainer } from "./containers/index"; // just export components from index.ts in containers

function App() {
  return (
    <> 
      <Layout componentLeft={<SideMenu/>} componentCenter={<RailContainer width={800} height={500}/>} componentRight={<SideInfoBar/>}></Layout>
    </>
  );
}

export default App;