import User from "./User";

export default class Comment {
  id!: string;
  date!: string;
  context!: string;
  creator!: User;
  isActivity?: boolean;
}
