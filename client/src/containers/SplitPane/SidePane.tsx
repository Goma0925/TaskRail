import {createRef, useEffect} from "react";

interface SidePaneProps{
    children: React.ReactNode[] | React.ReactNode;
    paneWidth: number | undefined;
    setPaneWidth: (value: number) => void;
    className?: string;
  }

const SidePane: React.FunctionComponent<SidePaneProps> = (props: SidePaneProps) => {
    const paneEleRef = createRef<HTMLDivElement>();
    useEffect(() => {
      if (paneEleRef.current) {
        if (!props.paneWidth) {
          // If props.paneWidth is not set, get the pane element's size.
          props.setPaneWidth(paneEleRef.current?.clientWidth);
          return;
        }
        paneEleRef.current.style.width = `${props.paneWidth}px`;
      }
    }, [paneEleRef, props.paneWidth, props.setPaneWidth]); //Run this effect on changing these state vars.
  
    return <div className={props.className} ref={paneEleRef}>{props.children}</div>;
};
export default SidePane;