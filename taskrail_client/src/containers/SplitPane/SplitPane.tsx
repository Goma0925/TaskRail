import {useEffect, useState, createRef, useRef} from "react";
import "./split-pane.css";
import SidePane from "./SidePane";
import { SetRailUiWidth } from "../../redux/modules/RailUi/RailUiActions"
import { useDispatch } from "react-redux";

interface SplitPaneProps{
    top: React.ReactNode;
    left: React.ReactNode;
    center: React.ReactNode;
    right: React.ReactNode;
}

const SplitPane: React.FC<SplitPaneProps> = (props)=>{
    const topRef = createRef<HTMLDivElement>();//HTML ref for top component
    const [contentHeight, setContentHeight] = useState(0);
    const [leftWidth, setLeftWidth] = useState<number>(150);
    const [rightWidth, setRightWidth] = useState<number>(200);
    const [leftSeparatorXPos, setLeftSeparatorXPos] = useState<undefined | number>(undefined);
    const [rightSeparatorXPos, setRightSeparatorXPos] = useState<undefined | number>(undefined);
    const [isLeftDragging, setIsLeftDragging] = useState(false);
    const [isRightDragging, setIsRightDragging] = useState(false);
    const centerRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const startDraggingForLeftPane = (e: React.MouseEvent) => {
        setIsLeftDragging(true);
        setLeftSeparatorXPos(e.clientX);
    };

    const startDraggingForRightPane = (e: React.MouseEvent) => {
        setIsRightDragging(true);
        setRightSeparatorXPos(e.clientX);
    };

    const onMouseUp = (e: React.MouseEvent) => {
        setIsLeftDragging(false);
        setIsRightDragging(false);
        updatePaneDimentions();
    };

    const updatePaneDimentions = () => {
        // Update each pane width to Redux for the other components to use the dimentions.
        const centerWidth = centerRef.current?.clientWidth? centerRef.current?.clientWidth:0;
        dispatch(new SetRailUiWidth(centerWidth));
    }

    const onMouseMove = (e: MouseEvent) => {        
        if (isLeftDragging && leftSeparatorXPos!==undefined) {
            const newLeftWidth = leftWidth + e.clientX - leftSeparatorXPos;
            setLeftSeparatorXPos(e.clientX);
            setLeftWidth(newLeftWidth);
        }
        else if (isRightDragging && rightSeparatorXPos!==undefined){
            const newRightWidth = rightWidth + rightSeparatorXPos - e.clientX;
            setRightSeparatorXPos(e.clientX);
            setRightWidth(newRightWidth);
        };
    };

    useEffect(() => {
        document.addEventListener('mousemove', onMouseMove);
        window.addEventListener("resize", updatePaneDimentions);
        updatePaneDimentions();
        // Set function for the component unmount
        return () => {
            // Remove eventlisterners on unmount
            document.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener("resize", updatePaneDimentions)
        };
    });

    useEffect(()=>{
        // Calculate the content section's height. Need this absolute height
        // to use overflow:scroll CSS in each content-col.
        const topHeight = topRef.current?.clientHeight? topRef.current?.clientHeight: 0;
        setContentHeight(window.innerHeight - topHeight);
    });

    return (
        <div className="split-pane-container"  onMouseUp={onMouseUp}>
            <div className="top-pane" ref={topRef}>{props.top}</div>
            <div className="content-section" style={{height: contentHeight}}>
                <SidePane className="left-pane content-col" paneWidth={leftWidth} setPaneWidth={setLeftWidth}>
                    {props.left}
                </SidePane>
                
                <div className="divider" onMouseDown={startDraggingForLeftPane}/>

                <div className="center-pane content-col" ref={centerRef}>{props.center}</div>

                <div className="divider content-col" onMouseDown={startDraggingForRightPane}/>

                <SidePane className="right-pane content-col" paneWidth={rightWidth} setPaneWidth={setRightWidth}>
                    {props.right}
                </SidePane>
            </div>
        </div>
    );
}
export default SplitPane;