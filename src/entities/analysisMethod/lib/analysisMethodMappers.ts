import {AxiosResponse} from "axios";
import {
  RESPONSE_DATA_NOT_VALID_ERROR,
  getInvalidDataErrorMessage,
} from "../../../utils/constants";
import {AnalysisMethod} from "../model/AnalysisMethod";

export const axiosResponseToAnalysisMethods = (
  response: AxiosResponse<unknown>,
): AnalysisMethod[] => {
  return getAnalysisMethodFromData(response.data);
};

const getAnalysisMethodFromData = (data: unknown): AnalysisMethod[] => {
  if (data instanceof Array) {
    return data
      .map((analysisMethod: unknown) => {
        if (isValidAnalysisMethod(analysisMethod)) {
          return analysisMethod as AnalysisMethod;
        } else {
          throw new Error(getInvalidDataErrorMessage("analysisMethod"));
        }
      })
      .filter(
        (analysisMethod): analysisMethod is AnalysisMethod =>
          analysisMethod !== null,
      );
  } else if (data instanceof Object) {
    return [data as AnalysisMethod];
  } else {
    throw new Error(RESPONSE_DATA_NOT_VALID_ERROR);
  }
};

const isValidAnalysisMethod = (
  analysisMethod: unknown,
): analysisMethod is AnalysisMethod => {
  if (typeof analysisMethod === "object" && analysisMethod !== null) {
    const analysisMethodObj = analysisMethod as Record<string, unknown>;
    return (
      typeof analysisMethodObj.id === "string" &&
      typeof analysisMethodObj.name === "string"
    );
  }
  return false;
};
