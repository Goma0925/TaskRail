import React from "react";
import ReactFlow from 'react-flow-renderer';
import { TaskNode } from "../../components/RailParts/TaskNode"
import "./bg-skins.css";

export class RailContainer extends React.Component{
    elements: any[];
    constructor(props: any){
      super(props);
      this.elements = [
        {
          id: '1',
          type: 'input', // input node
          data: { label: 'Input Node' },
          position: { x: 250, y: 25 },
        },
        // default node
        {
          id: '2',
          // you can also pass a React component as a label
          data: { label: <div>Default Node</div> },
          position: { x: 100, y: 125 },
        },
        {
          id: '3',
          type: 'custom', // output node
          data: { label: 'Output Node' },
          position: { x: 250, y: 250 },
        },
        // animated edge
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3' },
      ];
    }
  
    render() {
      const self = this;
      const displayHeight = 700;
      const displayWidth = 1000;
      const backgroundSkinClass = "bg-skin-blue-sea";
      return <>
                <div className={"rail-container ".concat(backgroundSkinClass)} style={{height: displayHeight, width:displayWidth}}>
                    <ReactFlow nodeTypes={{ custom: TaskNode }} elements={self.elements} />
                </div>
             </>
    }
}