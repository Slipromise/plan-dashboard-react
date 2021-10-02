import Plan from "./Plan";
import Task from "./Task";

export default class User {
  id!: string;
  name!: string;
  email!: string;
  password!: string;
  avatar?: string;
  plans?: Plan[];
  task?: Task[];
}
