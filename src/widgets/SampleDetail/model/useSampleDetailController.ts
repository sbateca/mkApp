import {Sample} from "../../../entities/sample";
import {useCreateSample, useEditSample} from "../../../features/sample";
import {useLoadSampleDetailData} from "../../../features/sample/loadSampleDetailData/model/useLoadSampleDetailData";
import {useSideSection} from "../../../features/sideSection";
import {useSampleDetailForm} from "./useSampleDetailForm";

export type SampleDetailControllerProps = {
  selectedSample: Sample | null;
  setIsReadOnlyMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useSampleDetailController = ({
  selectedSample,
  setIsReadOnlyMode,
}: SampleDetailControllerProps) => {
  const sampleFormState = useSampleDetailForm(selectedSample);

  const sampleDetailData = useLoadSampleDetailData();

  const {sideSectionTitle, onCloseSideSection} =
    useSideSection(setIsReadOnlyMode);

  const {handleCreateSample} = useCreateSample(setIsReadOnlyMode);
  const {handleEditSample} = useEditSample(setIsReadOnlyMode);

  return {
    sampleDetailForm: sampleFormState,
    catalog: sampleDetailData,
    uiElements: {sideSectionTitle},
    actions: {
      onCloseSideSection,
      handleCreateSample,
      handleEditSample,
    },
  };
};
