import {v4 as uuid4} from "uuid";
import {AnalysisMethod} from "../../../entities/analysisMethod";
import {FormProps} from "../../../utils/constants";
import {AnalysisMethodFormFields} from "../../../utils/enums";

export const analysisMethodToForm = (analysisMethod: AnalysisMethod) => ({
  [AnalysisMethodFormFields.NAME]: analysisMethod.name,
});

export const formToAnalysisMethod = (
  form: FormProps,
  analysisMethodId?: string,
): AnalysisMethod => ({
  id: analysisMethodId || uuid4(),
  name: form[AnalysisMethodFormFields.NAME] as string,
});
