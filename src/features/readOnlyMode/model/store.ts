import {create} from "zustand";
import {ReadOnlyModeStore} from "./types";

export const useReadOnlyModeStore = create<ReadOnlyModeStore>((set) => ({
  isReadOnlyMode: false,
  setIsReadOnlyMode: (readOnlyMode) => set({isReadOnlyMode: readOnlyMode}),
  handleSwitchReadOnlyMode: () =>
    set((state) => ({isReadOnlyMode: !state.isReadOnlyMode})),
}));
