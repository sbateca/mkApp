import {AxiosResponse} from "axios";

import {Criteria} from "../model/Criteria";
import {
  RESPONSE_DATA_NOT_VALID_ERROR,
  getInvalidDataErrorMessage,
} from "../../../utils/constants";

export const axiosResponseToCriteria = (
  response: AxiosResponse<unknown>,
): Criteria[] => {
  return getCriteriasFromData(response.data);
};

const getCriteriasFromData = (data: unknown): Criteria[] => {
  if (data instanceof Array) {
    return data
      .map((criteria: unknown) => {
        if (isValidCriteria(criteria)) {
          return criteria as Criteria;
        } else {
          throw new Error(getInvalidDataErrorMessage("criteria"));
        }
      })
      .filter((criteria): criteria is Criteria => criteria !== null);
  } else if (data instanceof Object) {
    return [data as Criteria];
  } else {
    throw new Error(RESPONSE_DATA_NOT_VALID_ERROR);
  }
};

const isValidCriteria = (criteria: unknown): criteria is Criteria => {
  if (typeof criteria === "object" && criteria !== null) {
    const criteriaObj = criteria as Record<string, unknown>;
    return (
      typeof criteriaObj.id === "string" && typeof criteriaObj.name === "string"
    );
  }
  return false;
};
