import { StudyData } from "@/types/study";
import { create } from "zustand";

type StudySidebarStore = {
  studyTitle: string;
  isLeader: boolean;

  setStudyTitle: (title: string) => void;
  setIsLeader: (bool: boolean) => void;
}

export const useStudySidebarStore = create<StudySidebarStore>((set) => ({
  studyTitle: "Study Room",
  isLeader: false,

  setStudyTitle: (title) => set({ studyTitle: title }),
  setIsLeader: (bool) => set({ isLeader: bool }),
}));