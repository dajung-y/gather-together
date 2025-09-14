import { ObjectId } from "mongodb";

export interface Study {
  _id: string | ObjectId;
  studyName: string;
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime?: string;
  capacity: number;
  currentMembers: number;
  category: string;
  isRecruiting: boolean;
  creator?: {
    userId: string;
    nickname: string;
    email: string;
  };
  members?: {
    userId: string;
    nickname: string;
    role: string;
    joinedAt: Date;
  }[];
  applicants: {
    userId: string;
    nickname: string;
    introduction: string;
    status: "pending" | "approved" | "rejected" | "canceled";
    createdAt: Date;
  }[];
}