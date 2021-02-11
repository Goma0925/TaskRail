import React from "react";
import "./style.css"
// Jibraan's work
export class NavBar extends React.Component{
    constructor(props: any){
        super(props);
    }

    render(){
        return  <div className="NavBar"> 
                        <h1 className="MotivationalSpeech">Stay on Track!</h1> 
                </div>;
    }
}