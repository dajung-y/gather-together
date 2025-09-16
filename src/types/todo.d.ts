export type Check = {
  userId: string;
  userNickname: string;
  checked: boolean;
};

export type Todo = {
  _id: string;
  studyId: string;
  date: string;
  task: string;
  checks: Check[];
  createdAt: Date;
  updatedAt: Date;
};
