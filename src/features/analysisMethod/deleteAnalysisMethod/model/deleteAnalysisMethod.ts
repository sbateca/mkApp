import {useInterfaceTranslation} from "../../../../shared/i18n/useInterfaceTranslation";
import Swal from "sweetalert2";
import {
  selectDeleteAnalysisMethod,
  selectGetAnalysisMethods,
  useAnalysisMethodsStore,
} from "../../../../entities/analysisMethod";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";
import {
  ANALYSIS_METHOD_DELETE_CONFIRMATION_SUBTITLE,
  ANALYSIS_METHOD_DELETE_CONFIRMATION_TEXT,
  ANALYSIS_METHOD_DELETE_CONFIRMATION_TITLE,
  ANALYSIS_METHOD_SUCCESSFULLY_DELETED_TEXT,
  SWEET_ALERT_PARAMS,
} from "../../../../utils/constants";
import {SnackBarSeverity, SweetAlertIcon} from "../../../../utils/enums";

export const useDeleteAnalysisMethod = () => {
  const {t} = useInterfaceTranslation();
  const getAnalysisMethods = useAnalysisMethodsStore(selectGetAnalysisMethods);
  const deleteAnalysisMethod = useAnalysisMethodsStore(
    selectDeleteAnalysisMethod,
  );
  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  const handleDelete = async (analysisMethodId: string) => {
    Swal.fire({
      title: t(ANALYSIS_METHOD_DELETE_CONFIRMATION_TITLE),
      text: t(ANALYSIS_METHOD_DELETE_CONFIRMATION_SUBTITLE),
      icon: SweetAlertIcon.WARNING,
      showCancelButton: true,
      cancelButtonText: t("Cancel"),
      confirmButtonColor: SWEET_ALERT_PARAMS.CONFIRM_BUTTON_COLOR,
      cancelButtonColor: SWEET_ALERT_PARAMS.CANCEL_BUTTON_COLOR,
      confirmButtonText: t(ANALYSIS_METHOD_DELETE_CONFIRMATION_TEXT),
    }).then((result) => {
      if (result.isConfirmed) {
        const result = deleteAnalysisMethod(analysisMethodId);
        if (result !== null) {
          showSnackBarMessage(
            ANALYSIS_METHOD_SUCCESSFULLY_DELETED_TEXT,
            SnackBarSeverity.SUCCESS,
            getAnalysisMethods,
          );
        }
      }
    });
  };

  return {handleDelete};
};
