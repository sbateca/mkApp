import {
  selectEditAnalysisMethod,
  selectGetAnalysisMethods,
  useAnalysisMethodsStore,
} from "../../../../entities/analysisMethod";
import {
  ANALYSIS_METHOD_SUCCESSFULLY_UPDATED_TEXT,
  FormProps,
} from "../../../../utils/constants";
import {SnackBarSeverity} from "../../../../utils/enums";
import {useSideSection} from "../../../sideSection";
import {useSnackBarStore} from "../../../snackbar";
import {formToAnalysisMethod} from "../../lib/analysisMethodMappers";

export const useEditAnalysisMethod = (
  form: FormProps,
  analysisMethodId: string,
) => {
  const editAnalysisMethod = useAnalysisMethodsStore(selectEditAnalysisMethod);
  const getAnalysisMethods = useAnalysisMethodsStore(selectGetAnalysisMethods);

  const {onCloseSideSection} = useSideSection();
  const {showSnackBarMessage} = useSnackBarStore();

  const handleEditAnalysisMethod = async () => {
    const analysisMethod = formToAnalysisMethod(form, analysisMethodId);
    const updatedAnalysisMethod = await editAnalysisMethod(
      analysisMethod,
      analysisMethodId,
    );
    if (updatedAnalysisMethod !== null) {
      onCloseSideSection();
      showSnackBarMessage(
        ANALYSIS_METHOD_SUCCESSFULLY_UPDATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getAnalysisMethods,
      );
    }
    return updatedAnalysisMethod;
  };

  return {handleEditAnalysisMethod};
};
