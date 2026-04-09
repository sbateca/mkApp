import {
  selectGetSampleById,
  selectSetSelectedSample,
  useSampleStore,
} from "../../../../entities/sample";
import {SAMPLE_DETAILS_TITLE_TEXT} from "../../../../utils/constants";
import {
  selectSetIsSideSectionOpen,
  selectSetSideSectionTitle,
  useSideSectionStore,
} from "../../../sideSection";

export const useViewSample = () => {
  const setSelectedSample = useSampleStore(selectSetSelectedSample);
  const getSampleById = useSampleStore(selectGetSampleById);

  const setIsSideSectionOpen = useSideSectionStore(selectSetIsSideSectionOpen);
  const setSideSectionTitle = useSideSectionStore(selectSetSideSectionTitle);

  const handleViewSample = async (sampleId: string) => {
    const sample = await getSampleById(sampleId);
    if (sample) {
      setSelectedSample(sample);
      setSideSectionTitle(SAMPLE_DETAILS_TITLE_TEXT);
      setIsSideSectionOpen(true);
    }
  };

  return {handleViewSample};
};
