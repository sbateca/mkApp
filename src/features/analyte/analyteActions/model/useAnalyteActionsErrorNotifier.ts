import {useEffect} from "react";
import {selectError, useAnalyteStore} from "../../../../entities/analyte";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";
import {SnackBarSeverity} from "../../../../utils/enums";

export const useAnalyteActionsErrorNotifier = () => {
  const error = useAnalyteStore(selectError);
  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  useEffect(() => {
    if (error) {
      showSnackBarMessage(error, SnackBarSeverity.ERROR);
    }
  }, [error, showSnackBarMessage]);
};
