import Swal from "sweetalert2";
import {
  selectDeleteReport,
  selectGetReports,
  useReportStore,
} from "../../../../entities/report";
import {
  REPORT_DELETE_CONFIRMATION_SUBTITLE,
  REPORT_DELETE_CONFIRMATION_TEXT,
  REPORT_DELETE_CONFIRMATION_TITLE,
  SAMPLE_SUCCESSFULLY_DELETED_TEXT,
} from "../../../../utils/constants";
import {SnackBarSeverity, SweetAlertIcon} from "../../../../utils/enums";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";

export const useDeleteReport = () => {
  const deleteReport = useReportStore(selectDeleteReport);
  const getReports = useReportStore(selectGetReports);

  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  const handleDelete = async (reportId: string) => {
    Swal.fire({
      title: REPORT_DELETE_CONFIRMATION_TITLE,
      text: REPORT_DELETE_CONFIRMATION_SUBTITLE,
      icon: SweetAlertIcon.WARNING,
      showCancelButton: true,
      confirmButtonColor: "#1976d2",
      cancelButtonColor: "#d33",
      confirmButtonText: REPORT_DELETE_CONFIRMATION_TEXT,
    }).then((result) => {
      if (result.isConfirmed) {
        const result = deleteReport(reportId);
        if (result !== null) {
          showSnackBarMessage(
            SAMPLE_SUCCESSFULLY_DELETED_TEXT,
            SnackBarSeverity.SUCCESS,
            getReports,
          );
        }
      }
    });
  };

  return {handleDelete};
};
