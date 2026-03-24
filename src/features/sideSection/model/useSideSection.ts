import {selectSetIsSideSectionOpen} from "./selectors";
import {useSideSectionStore} from "./store";

export const useSideSection = (
  setIsReadOnlyMode: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const setIsSideSectionOpen = useSideSectionStore(selectSetIsSideSectionOpen);

  const handleCloseSideSection = () => {
    if (setIsSideSectionOpen) {
      setIsSideSectionOpen(false);
      setIsReadOnlyMode(true);
    }
  };

  return {handleCloseSideSection};
};
