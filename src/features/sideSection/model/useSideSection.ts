import {useReadOnlyMode} from "../../readOnlyMode";
import {
  selectIsSideSectionOpen,
  selectSetIsSideSectionOpen,
  selectSetSideSectionTitle,
  selectSideSectionTitle,
} from "./selectors";
import {useSideSectionStore} from "./store";

export const useSideSection = () => {
  const {setIsReadOnlyMode} = useReadOnlyMode();

  const isSideSectionOpen = useSideSectionStore(selectIsSideSectionOpen);
  const sideSectionTitle = useSideSectionStore(selectSideSectionTitle);
  const setIsSideSectionOpen = useSideSectionStore(selectSetIsSideSectionOpen);
  const setSideSectionTitle = useSideSectionStore(selectSetSideSectionTitle);

  const onCloseSideSection = () => {
    if (setIsSideSectionOpen) {
      setIsSideSectionOpen(false);
      setIsReadOnlyMode(true);
    }
  };

  const onOpenSideSection = (title: string, isReadOnlyMode: boolean) => {
    if (setIsSideSectionOpen && setSideSectionTitle) {
      setSideSectionTitle(title);
      setIsSideSectionOpen(true);
      setIsReadOnlyMode(isReadOnlyMode);
    }
  };

  return {
    isSideSectionOpen,
    sideSectionTitle,
    onCloseSideSection,
    onOpenSideSection,
  };
};
