import React, { Component, useState } from "react";
import Navbar from "../NavBar/NavBar";
import "./style.css"

interface LayoutProps{
    componentLeft: React.ReactNode;
    componentCenter: React.ReactNode;
    componentRight: React.ReactNode;
}


// // Jibraan's work
const Layout:React.FC<LayoutProps> = (props) => {
    return (
        <div>
            <div className="Navbar">
                <Navbar />
            </div>
            <div className="left">
                {props.componentLeft}
            </div>
            <div className="center">
                {props.componentCenter}
            </div>
            <div className="right">
                {props.componentRight}
            </div>
        </div>
    )
}

export default Layout;