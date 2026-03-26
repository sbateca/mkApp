import {useEffect} from "react";
import {
  selectShowSnackBarMessage,
  useSnackBarStore,
} from "../../../features/snackbar";
import {SnackBarSeverity} from "../../../utils/enums";

export const useReportErrorNotifier = (error: string | null) => {
  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  useEffect(() => {
    if (error) {
      showSnackBarMessage(error, SnackBarSeverity.ERROR);
    }
  }, [error, showSnackBarMessage]);
};
