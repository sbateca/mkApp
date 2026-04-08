import {useEffect} from "react";
import {
  selectError,
  selectGetReports,
  useReportStore,
} from "../../../entities/report";
import {
  selectShowSnackBarMessage,
  useSnackBarStore,
} from "../../../features/snackbar";
import {SnackBarSeverity} from "../../../utils/enums";

export const useSamplesContentErrorNotifier = () => {
  const getReports = useReportStore(selectGetReports);
  const error = useReportStore(selectError);
  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  useEffect(() => {
    if (error) {
      showSnackBarMessage(error, SnackBarSeverity.ERROR, getReports);
    }
  }, [error, getReports, showSnackBarMessage]);

  return {error};
};
