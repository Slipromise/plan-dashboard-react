import Task from "./Task";
import User from "./User";

export default class Plan {
  id!: string;
  creator!: User;
  members!: User[];
  tasks?: Task[];
  isFavorite?: boolean;
  isCurrent?: boolean;
  description?: string;
  buckets!: string[];
}
