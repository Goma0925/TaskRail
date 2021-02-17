import React from 'react';
import { NavBar } from "./containers/NavBar/NavBar";
import { RailContainer } from "./containers/RailContainer/RailContainer";

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <RailContainer width={window.innerWidth} height={window.innerHeight}></RailContainer>
    </div>
  );
}

export default App;
