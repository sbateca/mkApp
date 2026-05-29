import {v4 as uuid4} from "uuid";
import {SampleType} from "../../../entities/sampleType";
import {FormProps} from "../../../utils/constants";

export const sampleTypeToForm = (sampleType: SampleType) => {
  return {
    name: sampleType.name,
  };
};

export const formToSampleType = (
  form: FormProps,
  sampleTypeId?: string,
): SampleType => {
  return {
    id: sampleTypeId || uuid4(),
    name: form.name as string,
  };
};
