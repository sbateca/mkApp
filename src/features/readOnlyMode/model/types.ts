export type ReadOnlyModeStore = {
  isReadOnlyMode: boolean;
  setIsReadOnlyMode: (readOnlyMode: boolean) => void;
  handleSwitchReadOnlyMode: () => void;
};
