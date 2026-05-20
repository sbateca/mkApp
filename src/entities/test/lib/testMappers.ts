import {AxiosResponse} from "axios";
import {v4 as uuidv4} from "uuid";

import {Test} from "../model/Test";
import {
  getInvalidDataErrorMessage,
  RESPONSE_DATA_NOT_VALID_ERROR,
} from "../../../utils/constants";
import {Analyte} from "../../analyte/model/Analyte";
import {AnalysisMethod} from "../../analysisMethod/model/AnalysisMethod";
import {Criteria} from "../../criteria";
import {TestType} from "../../testType";
import {filterModelsById} from "../../../utils/model";

export const axiosResponseToTests = (
  response: AxiosResponse<unknown>,
): Test[] => {
  if (Array.isArray(response.data)) {
    return response.data
      .map((test: unknown) => {
        if (isValidTest(test)) {
          return test as Test;
        } else {
          throw new Error(getInvalidDataErrorMessage("test type"));
        }
      })
      .filter((test): test is Test => test !== null);
  } else {
    throw new Error(RESPONSE_DATA_NOT_VALID_ERROR);
  }
};

const isValidTest = (test: unknown): test is Test => {
  if (typeof test === "object" && test !== null) {
    const testObject = test as Record<string, unknown>;
    return (
      typeof testObject.id === "string" &&
      typeof testObject.result === "string" &&
      typeof testObject.sampleId === "string" &&
      typeof testObject.testType === "object" &&
      typeof testObject.analyte === "object" &&
      typeof testObject.analysisMethod === "object" &&
      typeof testObject.criteria === "object"
    );
  }
  return false;
};

export const testFormToTest = (
  form: Record<string, string>,
  testId: string,
  result: string,
  testTypes: TestType[],
  analytes: Analyte[],
  analysisMethods: AnalysisMethod[],
  criterias: Criteria[],
): Test => {
  const testypeFiltered = filterModelsById(testTypes, form.testTypeId);
  const analyteFiltered = filterModelsById(analytes, form.analyteId);
  const analysisMethodFiltered = filterModelsById(
    analysisMethods,
    form.analysisMethodId,
  );
  const criteriaFiltered = filterModelsById(criterias, form.criteriaId);
  const sampleId = form.sampleId || "";

  return {
    id: testId || uuidv4(),
    testType: testypeFiltered,
    sampleId: sampleId,
    analyte: analyteFiltered,
    analysisMethod: analysisMethodFiltered,
    criteria: criteriaFiltered,
    result: result,
  };
};

export const testToTestForm = (test: Test): Record<string, string> => {
  return {
    id: test.id,
    testTypeId: test.testType.id,
    sampleId: test.sampleId,
    analyteId: test.analyte.id,
    analysisMethodId: test.analysisMethod.id,
    criteriaId: test.criteria.id,
    result: test.result,
  };
};
