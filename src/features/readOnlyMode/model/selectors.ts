import {ReadOnlyModeStore} from "./types";

export const selectIsReadOnlyMode = (state: ReadOnlyModeStore) =>
  state.isReadOnlyMode;
export const selectSetIsReadOnlyMode = (state: ReadOnlyModeStore) =>
  state.setIsReadOnlyMode;
export const selectHandleSwitchReadOnlyMode = (state: ReadOnlyModeStore) =>
  state.handleSwitchReadOnlyMode;
