import {Box} from "@mui/material";
import {Spinner} from "../../../../shared/ui";
import {
  selectIsLoadingAnalysisMethods,
  useAnalysisMethodsStore,
} from "../../../../entities/analysisMethod";
import {
  DeleteAnalysisMethodButton,
  useDeleteAnalysisMethod,
} from "../../deleteAnalysisMethod";
import {
  useViewAnalysisMethod,
  ViewAnalysisMethodButton,
} from "../../viewAnalysisMethod";
import {useAnalysisMethodActionsErrorNotifier} from "../model/useAnalysisMethodActionsErrorNotifier";

type AnalysisMethodTableActionButtonsProps = {
  analysisMethodId: string;
};

export const AnalysisMethodTableActionButtons = ({
  analysisMethodId,
}: AnalysisMethodTableActionButtonsProps): React.ReactElement => {
  const isLoading = useAnalysisMethodsStore(selectIsLoadingAnalysisMethods);

  const {viewAnalysisMethod} = useViewAnalysisMethod();
  const {handleDelete} = useDeleteAnalysisMethod();
  useAnalysisMethodActionsErrorNotifier();

  return (
    <Box>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ViewAnalysisMethodButton
            onClick={() => viewAnalysisMethod(analysisMethodId)}
          />
          <DeleteAnalysisMethodButton
            onClick={() => handleDelete(analysisMethodId)}
          />
        </>
      )}
    </Box>
  );
};
