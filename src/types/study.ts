import { ObjectId } from "mongodb";
import { Notice } from "./notice";

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
    attendance?: {
      present: number;   // 출석
      late: number;      // 지각
      absent: number;    // 결석
    };
  }[];
  applicants: {
    userId: string;
    nickname: string;
    introduction: string;
    status: "pending" | "approved" | "rejected" | "canceled";
    createdAt: Date;
  }[];
  mainNotice?: Notice;
}

export interface StudyData extends Study {
  description: string;
  weekdays: string[];
  createdAt: Date;
  updatedAt?: Date;
}
