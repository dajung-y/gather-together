import { StudyData } from "@/types/study";
import { create } from "zustand";

type StudyStore = {
  studyData: StudyData | null;

  setStudyData: (data: StudyData) => void;
}

export const useStudyStore = create<StudyStore>((set) => ({
  studyData: null,

  setStudyData: (data) => set({ studyData: data }),
}));