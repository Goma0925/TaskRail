/** Depending how components are exported in original file,
 * we can have an index file which tracks all our components
 * and allows for easy importing of any component into others.
 * I used export default on components. 
 * Remedy as needed.
 **/ 
export { default as SideInfoBar } from './SideInfoBar';
export { default as NavBar } from "./NavBar/NavBar";
export { default as Layout } from "./Layout/Layout";
export { default as SideMenu } from "./SideMenu/SideMenu";