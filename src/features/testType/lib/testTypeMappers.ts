import {v4 as uuid4} from "uuid";
import {TestType} from "../../../entities/testType";
import {FormProps} from "../../../utils/constants";
import {TestTypeFormFields} from "../../../utils/enums";

export const testTypeToForm = (testType: TestType) => ({
  [TestTypeFormFields.NAME]: testType.name,
});

export const formToTestType = (
  form: FormProps,
  testTypeId?: string,
): TestType => ({
  id: testTypeId || uuid4(),
  name: form[TestTypeFormFields.NAME] as string,
});
