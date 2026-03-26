import {selectSetIsSideSectionOpen} from "./selectors";
import {useSideSectionStore} from "./store";

export const useSideSection = (
  setIsReadOnlyMode: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const setIsSideSectionOpen = useSideSectionStore(selectSetIsSideSectionOpen);

  const onCloseSideSection = () => {
    if (setIsSideSectionOpen) {
      setIsSideSectionOpen(false);
      setIsReadOnlyMode(true);
    }
  };

  return {onCloseSideSection};
};
