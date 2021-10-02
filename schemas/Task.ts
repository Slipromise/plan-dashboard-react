import { TaskStatus } from "../definitions/common";
import User from "./User";

export default class Task {
  id!: string;
  title!: string;
  bucket?: string;
  description?: string;
  participators?: User[];
  startDate?: string;
  endDate?: string;
  comments?: Comment[];
  status!: TaskStatus;
}
