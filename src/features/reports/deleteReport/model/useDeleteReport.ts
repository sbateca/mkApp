import {useInterfaceTranslation} from "../../../../shared/i18n/useInterfaceTranslation";
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
  SWEET_ALERT_PARAMS,
} from "../../../../utils/constants";
import {SnackBarSeverity, SweetAlertIcon} from "../../../../utils/enums";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";

export const useDeleteReport = () => {
  const {t} = useInterfaceTranslation();
  const deleteReport = useReportStore(selectDeleteReport);
  const getReports = useReportStore(selectGetReports);

  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  const handleDelete = async (reportId: string) => {
    Swal.fire({
      title: t(REPORT_DELETE_CONFIRMATION_TITLE),
      text: t(REPORT_DELETE_CONFIRMATION_SUBTITLE),
      icon: SweetAlertIcon.WARNING,
      showCancelButton: true,
      cancelButtonText: t("Cancel"),
      confirmButtonColor: SWEET_ALERT_PARAMS.CONFIRM_BUTTON_COLOR,
      cancelButtonColor: SWEET_ALERT_PARAMS.CANCEL_BUTTON_COLOR,
      confirmButtonText: t(REPORT_DELETE_CONFIRMATION_TEXT),
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
