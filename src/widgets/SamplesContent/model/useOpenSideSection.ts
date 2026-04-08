import {
  selectSetSelectedSample,
  useSampleStore,
} from "../../../entities/sample";
import {
  selectIsSideSectionOpen,
  selectSetIsSideSectionOpen,
  selectSetSideSectionTitle,
  useSideSectionStore,
} from "../../../features/sideSection";
import {CREATE_SAMPLE_TITLE_TEXT} from "../../../utils/constants";

export const useOpenSideSection = () => {
  const setSelectedSample = useSampleStore(selectSetSelectedSample);

  const isSideSectionOpen = useSideSectionStore(selectIsSideSectionOpen);
  const setSideSectionTitle = useSideSectionStore(selectSetSideSectionTitle);
  const setIsSideSectionOpen = useSideSectionStore(selectSetIsSideSectionOpen);

  const handleOpenSideSection = () => {
    setSelectedSample(null);
    setSideSectionTitle(CREATE_SAMPLE_TITLE_TEXT);
    setIsSideSectionOpen(true);
  };

  return {handleOpenSideSection, isSideSectionOpen};
};
