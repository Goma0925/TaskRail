
import React from 'react';
import "./App.css";
import store, { RootState } from "./redux/store";
import { Provider, useSelector } from "react-redux";
import { SplitPane, NavBar, SideInfoBarContainer, SideMenu, RailContainer } from "./containers/index"; // just export components from index.ts in containers

function App() {
  return (
    <Provider store={store}>
      <SplitPane 
        top={<NavBar/>}
        left={<SideMenu/>} 
        center={<RailContainer />} 
        right={<SideInfoBarContainer/>}
      />
    </Provider>
  );
}

export default App;