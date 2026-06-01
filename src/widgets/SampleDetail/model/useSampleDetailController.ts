import {Sample} from "../../../entities/sample";
import {useCreateSample, useEditSample} from "../../../features/sample";
import {useLoadSampleDetailData} from "../../../features/sample/loadSampleDetailData/model/useLoadSampleDetailData";
import {useSideSection} from "../../../features/sideSection";
import {useSampleDetailForm} from "./useSampleDetailForm";

export type SampleDetailControllerProps = {
  selectedSample: Sample | null;
};

export const useSampleDetailController = ({
  selectedSample,
}: SampleDetailControllerProps) => {
  const sampleFormState = useSampleDetailForm(selectedSample);

  const sampleDetailData = useLoadSampleDetailData();

  const {sideSectionTitle, onCloseSideSection} = useSideSection();

  const {handleCreateSample} = useCreateSample();
  const {handleEditSample} = useEditSample();

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
