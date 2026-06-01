import {v4 as uuid4} from "uuid";
import {Analyte} from "../../../entities/analyte";
import {TestType} from "../../../entities/testType";
import {FormProps} from "../../../utils/constants";
import {AnalyteFormFields} from "../../../utils/enums";
import {findModelById} from "../../../utils/model";

export const analyteToForm = (analyte: Analyte) => ({
  [AnalyteFormFields.NAME]: analyte.name,
  [AnalyteFormFields.TEST_TYPE]: analyte.testType.id,
});

export const formToAnalyte = (
  form: FormProps,
  testTypes: TestType[] | null,
  analyteId?: string,
): Analyte => {
  const testTypeId = form[AnalyteFormFields.TEST_TYPE] as string;
  const testType = findModelById(testTypeId, testTypes) || {
    id: testTypeId,
    name: "",
  };

  return {
    id: analyteId || uuid4(),
    name: form[AnalyteFormFields.NAME] as string,
    testType,
  };
};
