import {
  selectSetSelectedSampleType,
  useSampleTypeStore,
} from "../../../../entities/sampleType";
import {CREATE_SAMPLE_TYPE_TITLE_TEXT} from "../../../../utils/constants";
import {
  selectIsSideSectionOpen,
  selectSetIsSideSectionOpen,
  selectSetSideSectionTitle,
  useSideSectionStore,
} from "../../../sideSection";

export const useOpenSideSection = () => {
  const setSelectedSampleType = useSampleTypeStore(selectSetSelectedSampleType);

  const isSideSectionOpen = useSideSectionStore(selectIsSideSectionOpen);
  const setSideSectionTitle = useSideSectionStore(selectSetSideSectionTitle);
  const setIsSideSectionOpen = useSideSectionStore(selectSetIsSideSectionOpen);

  const handleOpenSideSection = () => {
    setSelectedSampleType(null);
    setSideSectionTitle(CREATE_SAMPLE_TYPE_TITLE_TEXT);
    setIsSideSectionOpen(true);
  };

  const handleCloseSideSection = () => {
    setSelectedSampleType(null);
    setSideSectionTitle("");
    setIsSideSectionOpen(false);
  };

  return {handleOpenSideSection, handleCloseSideSection, isSideSectionOpen};
};
