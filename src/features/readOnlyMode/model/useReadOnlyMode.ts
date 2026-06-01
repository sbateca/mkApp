import {
  selectHandleSwitchReadOnlyMode,
  selectIsReadOnlyMode,
  selectSetIsReadOnlyMode,
} from "./selectors";
import {useReadOnlyModeStore} from "./store";

export const useReadOnlyMode = () => {
  const isReadOnlyMode = useReadOnlyModeStore(selectIsReadOnlyMode);
  const setIsReadOnlyMode = useReadOnlyModeStore(selectSetIsReadOnlyMode);
  const handleSwitchReadOnlyMode = useReadOnlyModeStore(
    selectHandleSwitchReadOnlyMode,
  );

  return {isReadOnlyMode, setIsReadOnlyMode, handleSwitchReadOnlyMode};
};
