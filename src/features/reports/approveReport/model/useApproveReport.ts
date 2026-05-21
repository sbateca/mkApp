import {
  selectApproveReport,
  selectSelectedReport,
  selectSetSelectedReport,
  useReportStore,
} from "../../../../entities/report";
import {REPORT_SUCCESSFULLY_APPROVED_TEXT} from "../../../../utils/constants";
import {ReportStatus, SnackBarSeverity} from "../../../../utils/enums";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";

export const useApproveReport = () => {
  const approveReport = useReportStore(selectApproveReport);
  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);
  const setSelectedReport = useReportStore(selectSetSelectedReport);
  const selectedReport = useReportStore(selectSelectedReport);

  const handleApproveReport = async (reportId: string) => {
    const status = await approveReport(reportId);

    if (status !== ReportStatus.APPROVED) return;

    if (selectedReport?.id === reportId) {
      setSelectedReport({
        ...selectedReport,
        status,
      });
    }

    showSnackBarMessage(
      REPORT_SUCCESSFULLY_APPROVED_TEXT,
      SnackBarSeverity.SUCCESS,
    );
  };

  return {handleApproveReport};
};
