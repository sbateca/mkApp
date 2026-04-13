import {AxiosResponse} from "axios";

import {SampleType} from "../model/SampleType";
import {
  RESPONSE_DATA_NOT_VALID_ERROR,
  getInvalidDataErrorMessage,
} from "../../../utils/constants";

export const axiosResponseToSampleType = (
  response: AxiosResponse<unknown>,
): SampleType[] => {
  return getSampleTypesFromData(response.data);
};

const getSampleTypesFromData = (data: unknown): SampleType[] => {
  if (data instanceof Array) {
    return data
      .map((sampleType: unknown) => {
        if (isValidSampleType(sampleType)) {
          return sampleType as SampleType;
        } else {
          throw new Error(getInvalidDataErrorMessage("sampleType"));
        }
      })
      .filter((sampleType): sampleType is SampleType => sampleType !== null);
  } else if (data instanceof Object) {
    return [data as SampleType];
  } else {
    throw new Error(RESPONSE_DATA_NOT_VALID_ERROR);
  }
};

const isValidSampleType = (sampleType: unknown): sampleType is SampleType => {
  if (typeof sampleType === "object" && sampleType !== null) {
    const sampleTypeObj = sampleType as Record<string, unknown>;
    return (
      typeof sampleTypeObj.id === "string" &&
      typeof sampleTypeObj.name === "string"
    );
  }
  return false;
};
