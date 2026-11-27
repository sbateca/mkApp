import {
  selectGetSampleById,
  selectSetSelectedSample,
  useSampleStore,
} from "../../../../entities/sample";
import {SAMPLE_DETAILS_TITLE_TEXT} from "../../../../utils/constants";
import {useSideSection} from "../../../sideSection";

export const useViewSample = () => {
  const setSelectedSample = useSampleStore(selectSetSelectedSample);
  const getSampleById = useSampleStore(selectGetSampleById);

  const {onOpenSideSection} = useSideSection();

  const handleViewSample = async (sampleId: string) => {
    const sample = await getSampleById(sampleId);
    if (sample) {
      setSelectedSample(sample);
      onOpenSideSection(SAMPLE_DETAILS_TITLE_TEXT, true);
    }
  };

  return {handleViewSample};
};
