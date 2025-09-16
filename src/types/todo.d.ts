export type Check = {
  userId: string;
  checked: boolean;
};

export type Todo = {
  _id: string;
  groupId: string;
  date: string;
  task: string;
  checks: Check[];
  createdAt: Date;
  updatedAt: Date;
};
