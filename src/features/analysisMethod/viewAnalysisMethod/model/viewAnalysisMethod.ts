import {
  selectGetAnalysisMethodsById,
  selectSetSelectedAnalysisMethod,
  useAnalysisMethodsStore,
} from "../../../../entities/analysisMethod";
import {ANALYSIS_METHOD_DETAILS_TITLE_TEXT} from "../../../../utils/constants";
import {useSideSection} from "../../../sideSection";

export const useViewAnalysisMethod = () => {
  const setSelectedAnalysisMethod = useAnalysisMethodsStore(
    selectSetSelectedAnalysisMethod,
  );
  const getAnalysisMethodById = useAnalysisMethodsStore(
    selectGetAnalysisMethodsById,
  );

  const {onOpenSideSection} = useSideSection();

  const viewAnalysisMethod = async (analysisMethodId: string) => {
    const analysisMethod = await getAnalysisMethodById(analysisMethodId);
    if (analysisMethod) {
      setSelectedAnalysisMethod(analysisMethod);
      onOpenSideSection(ANALYSIS_METHOD_DETAILS_TITLE_TEXT, true);
    }
  };

  return {viewAnalysisMethod};
};
