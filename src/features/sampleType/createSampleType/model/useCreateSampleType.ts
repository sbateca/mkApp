import {
  selectCreateSampleType,
  useSampleTypeStore,
} from "../../../../entities/sampleType";
import {FormProps} from "../../../../utils/constants";
import {formToSampleType} from "../../lib/sampleTypeMappers";

export const useCreateSampleType = (form: FormProps) => {
  const createSampleType = useSampleTypeStore(selectCreateSampleType);

  const handleCreateSampleType = async () => {
    await createSampleType(formToSampleType(form));
  };

  return {handleCreateSampleType};
};
