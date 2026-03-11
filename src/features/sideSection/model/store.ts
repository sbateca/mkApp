import {create} from "zustand";
import {SideSectionStore} from "./types";

export const useSideSectionStore = create<SideSectionStore>((set) => ({
  isSideSectionOpen: false,
  sideSectionTitle: "",
  setIsSideSectionOpen: (isOpen: boolean) => set({isSideSectionOpen: isOpen}),
  setSideSectionTitle: (title: string) => set({sideSectionTitle: title}),
}));
