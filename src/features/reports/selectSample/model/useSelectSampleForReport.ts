import {useEffect} from "react";
import {FormProps, getFormStringValue} from "../../../../utils/constants";
import {ReportFormFields} from "../../../../utils/enums";
import {
  selectGetSampleById,
  selectIsLoading,
  selectSelectedSample,
  selectSetSelectedSample,
  useSampleStore,
} from "../../../../entities/sample";

export const useSelectSampleForReport = (form: FormProps) => {
  const selectedSample = useSampleStore(selectSelectedSample);
  const isLoadingSample = useSampleStore(selectIsLoading);
  const getSampleById = useSampleStore(selectGetSampleById);
  const setSelectedSample = useSampleStore(selectSetSelectedSample);
  const sampleId = getFormStringValue(form, ReportFormFields.SAMPLE_ID);

  useEffect(() => {
    const run = async () => {
      if (!sampleId) {
        setSelectedSample(null);
        return;
      }
      const sample = await getSampleById(sampleId);
      setSelectedSample(sample);
    };
    run();
  }, [sampleId, getSampleById, setSelectedSample]);

  return {
    selectedSample,
    isLoadingSample,
  };
};
