import {useEffect} from "react";
import {selectError, useReportStore} from "../../../../entities/report";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";
import {SnackBarSeverity} from "../../../../utils/enums";

export const useReportActionsErrorNotifier = () => {
  const error = useReportStore(selectError);

  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  useEffect(() => {
    if (error) {
      showSnackBarMessage(error, SnackBarSeverity.ERROR);
    }
  }, [error, showSnackBarMessage]);
};
