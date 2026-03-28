import {useEffect} from "react";
import {FormProps} from "../../../../utils/constants";
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

  useEffect(() => {
    const run = async () => {
      if (!form.sampleId) {
        setSelectedSample(null);
        return;
      }
      const sample = await getSampleById(form.sampleId);
      setSelectedSample(sample);
    };
    run();
  }, [form.sampleId, getSampleById, setSelectedSample]);

  return {
    selectedSample,
    isLoadingSample,
  };
};
