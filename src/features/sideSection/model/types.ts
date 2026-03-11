export type SideSectionStore = {
  isSideSectionOpen: boolean;
  sideSectionTitle: string;
  setIsSideSectionOpen: (isOpen: boolean) => void;
  setSideSectionTitle: (title: string) => void;
};
