import {
  selectCreateAnalysisMethod,
  selectGetAnalysisMethods,
  useAnalysisMethodsStore,
} from "../../../../entities/analysisMethod";
import {
  ANALYSIS_METHOD_SUCCESSFULLY_CREATED_TEXT,
  FormProps,
} from "../../../../utils/constants";
import {SnackBarSeverity} from "../../../../utils/enums";
import {useSideSection} from "../../../sideSection";
import {useSnackBarStore} from "../../../snackbar";
import {formToAnalysisMethod} from "../../lib/analysisMethodMappers";

export const useCreateAnalysisMethod = (form: FormProps) => {
  const createAnalysisMethod = useAnalysisMethodsStore(
    selectCreateAnalysisMethod,
  );
  const getAnalysisMethods = useAnalysisMethodsStore(selectGetAnalysisMethods);

  const {onCloseSideSection} = useSideSection();
  const {showSnackBarMessage} = useSnackBarStore();

  const handleCreateAnalysisMethod = async () => {
    const newAnalysisMethod = await createAnalysisMethod(
      formToAnalysisMethod(form),
    );
    if (newAnalysisMethod !== null) {
      onCloseSideSection();
      showSnackBarMessage(
        ANALYSIS_METHOD_SUCCESSFULLY_CREATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getAnalysisMethods,
      );
    }
    return newAnalysisMethod;
  };

  return {handleCreateAnalysisMethod};
};
