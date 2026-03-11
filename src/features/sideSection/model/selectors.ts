import {SideSectionStore} from "./types";

export const selectIsSideSectionOpen = (store: SideSectionStore) =>
  store.isSideSectionOpen;
export const selectSideSectionTitle = (store: SideSectionStore) =>
  store.sideSectionTitle;
export const selectSetIsSideSectionOpen = (store: SideSectionStore) =>
  store.setIsSideSectionOpen;
export const selectSetSideSectionTitle = (store: SideSectionStore) =>
  store.setSideSectionTitle;
