import {create} from "zustand";

interface SideSectionStore {
  isSideSectionOpen: boolean;
  sideSectionTitle: string;
  setIsSideSectionOpen: (isOpen: boolean) => void;
  setSideSectionTitle: (title: string) => void;
}

const useSideSectionStore = create<SideSectionStore>((set) => ({
  isSideSectionOpen: false,
  sideSectionTitle: "",
  setIsSideSectionOpen: (isOpen: boolean) => set({isSideSectionOpen: isOpen}),
  setSideSectionTitle: (title: string) => set({sideSectionTitle: title}),
}));

export default useSideSectionStore;
