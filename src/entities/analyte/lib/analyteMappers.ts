import {AxiosResponse} from "axios";

import {
  RESPONSE_DATA_NOT_VALID_ERROR,
  getInvalidDataErrorMessage,
} from "../../../utils/constants";
import {Analyte} from "../model/Analyte";

export const axiosResponseToAnalyte = (
  response: AxiosResponse<unknown>,
): Analyte[] => {
  return getAnalyteFromData(response.data);
};

const getAnalyteFromData = (data: unknown): Analyte[] => {
  if (data instanceof Array) {
    return data
      .map((analyte: unknown) => {
        if (isValidAnalyte(analyte)) {
          return analyte as Analyte;
        } else {
          throw new Error(getInvalidDataErrorMessage("analyte"));
        }
      })
      .filter((analyte): analyte is Analyte => analyte !== null);
  } else if (data instanceof Object) {
    return [data as Analyte];
  } else {
    throw new Error(RESPONSE_DATA_NOT_VALID_ERROR);
  }
};

const isValidAnalyte = (analyte: unknown): analyte is Analyte => {
  if (typeof analyte === "object" && analyte !== null) {
    const analyteObj = analyte as Record<string, unknown>;
    return (
      typeof analyteObj.id === "string" && typeof analyteObj.name === "string"
    );
  }
  return false;
};
