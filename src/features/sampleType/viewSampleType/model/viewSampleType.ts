import {useReadOnlyMode} from "../../../readOnlyMode";
import {
  selectGetSampleTypeById,
  selectSetSelectedSampleType,
  useSampleTypeStore,
} from "../../../../entities/sampleType";
import {SAMPLE_TYPE_DETAILS_TITLE_TEXT} from "../../../../utils/constants";
import {
  selectSetIsSideSectionOpen,
  selectSetSideSectionTitle,
  useSideSectionStore,
} from "../../../sideSection";

export const useViewSampleType = () => {
  const {setIsReadOnlyMode} = useReadOnlyMode();
  const setSelectedSampleType = useSampleTypeStore(selectSetSelectedSampleType);
  const getSampleTypeById = useSampleTypeStore(selectGetSampleTypeById);

  const setIsSideSectionOpen = useSideSectionStore(selectSetIsSideSectionOpen);
  const setSideSectionTitle = useSideSectionStore(selectSetSideSectionTitle);

  const viewSampleType = async (sampleTypeId: string) => {
    const sampleType = await getSampleTypeById(sampleTypeId);
    if (sampleType) {
      setIsReadOnlyMode(true);
      setSelectedSampleType(sampleType);
      setSideSectionTitle(SAMPLE_TYPE_DETAILS_TITLE_TEXT);
      setIsSideSectionOpen(true);
    }
  };

  return {viewSampleType};
};
