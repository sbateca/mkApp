import {useReadOnlyMode} from "../../readOnlyMode";
import {selectSetIsSideSectionOpen, selectSideSectionTitle} from "./selectors";
import {useSideSectionStore} from "./store";

export const useSideSection = () => {
  const {setIsReadOnlyMode} = useReadOnlyMode();

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
