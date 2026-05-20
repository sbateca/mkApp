import {AxiosResponse} from "axios";
import {v4 as uuidv4} from "uuid";

import {TestType} from "../model/TestType";
import {
  getInvalidDataErrorMessage,
  RESPONSE_DATA_NOT_VALID_ERROR,
} from "../../../utils/constants";

export const axiosResponseToTestypes = (
  response: AxiosResponse<unknown>,
): TestType[] => {
  if (Array.isArray(response.data)) {
    return response.data
      .map((testType: unknown) => {
        if (isValidTestType(testType)) {
          return testType as TestType;
        } else {
          throw new Error(getInvalidDataErrorMessage("test type"));
        }
      })
      .filter((testType): testType is TestType => testType !== null);
  } else {
    throw new Error(RESPONSE_DATA_NOT_VALID_ERROR);
  }
};

const isValidTestType = (testType: unknown): testType is TestType => {
  if (typeof testType === "object" && testType !== null) {
    const testTypeObj = testType as Record<string, unknown>;
    return (
      typeof testTypeObj.id === "string" && typeof testTypeObj.name === "string"
    );
  }
  return false;
};

export const testTypeFormToTestType = (
  form: Record<string, unknown>,
  testTypeId: string,
): TestType => {
  return {
    id: testTypeId || uuidv4(),
    name: form.name as string,
  };
};

export const testTypeToTestTypeForm = (
  testType: TestType,
): Record<string, string> => {
  return {
    id: testType.id,
    name: testType.name,
  };
};
