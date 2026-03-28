import {selectSetIsSideSectionOpen, selectSideSectionTitle} from "./selectors";
import {useSideSectionStore} from "./store";

export const useSideSection = (
  setIsReadOnlyMode: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const setIsSideSectionOpen = useSideSectionStore(selectSetIsSideSectionOpen);
  const sideSectionTitle = useSideSectionStore(selectSideSectionTitle);

  const onCloseSideSection = () => {
    if (setIsSideSectionOpen) {
      setIsSideSectionOpen(false);
      setIsReadOnlyMode(true);
    }
  };

  return {onCloseSideSection, sideSectionTitle};
};
