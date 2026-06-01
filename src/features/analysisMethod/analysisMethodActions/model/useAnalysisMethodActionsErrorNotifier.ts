import {useEffect} from "react";
import {
  selectError,
  useAnalysisMethodsStore,
} from "../../../../entities/analysisMethod";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";
import {SnackBarSeverity} from "../../../../utils/enums";

export const useAnalysisMethodActionsErrorNotifier = () => {
  const error = useAnalysisMethodsStore(selectError);
  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  useEffect(() => {
    if (error) {
      showSnackBarMessage(error, SnackBarSeverity.ERROR);
    }
  }, [error, showSnackBarMessage]);
};
