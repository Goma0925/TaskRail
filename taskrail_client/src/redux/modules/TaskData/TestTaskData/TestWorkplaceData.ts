import TaskParent from "../../../../models/TaskParent";
import Workspace from "../../../../models/Workspace";
import TaskParentFactory from "./TaskParentFactory";

var workspace:Workspace = new Workspace("My first workspace", "TEST_WORKPACE_ID");

const taskParent1 = TaskParentFactory.create("Paper1");
workspace.addTaskParent(taskParent1);

const taskParent2 = TaskParentFactory.create("Project1");
workspace.addTaskParent(taskParent2);

export default workspace;