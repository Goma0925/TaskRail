
import React from 'react';
import "./App.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import { SplitPane, NavBar, SideInfoBar, SideMenu, RailContainer } from "./containers/index"; // just export components from index.ts in containers

function App() {
  return (
    <Provider store={store}>
      <SplitPane 
        top={<NavBar/>}
        left={<SideMenu/>} 
        center={<RailContainer />} 
        right={<SideInfoBar/>}
      />
    </Provider>
  );
}

export default App;