import Swal from "sweetalert2";
import {
  selectDeleteAnalyte,
  selectGetAnalytes,
  useAnalyteStore,
} from "../../../../entities/analyte";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";
import {
  ANALYTE_DELETE_CONFIRMATION_SUBTITLE,
  ANALYTE_DELETE_CONFIRMATION_TEXT,
  ANALYTE_DELETE_CONFIRMATION_TITLE,
  ANALYTE_SUCCESSFULLY_DELETED_TEXT,
  SWEET_ALERT_PARAMS,
} from "../../../../utils/constants";
import {SnackBarSeverity, SweetAlertIcon} from "../../../../utils/enums";

export const useDeleteAnalyte = () => {
  const getAnalytes = useAnalyteStore(selectGetAnalytes);
  const deleteAnalyte = useAnalyteStore(selectDeleteAnalyte);
  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  const handleDelete = async (analyteId: string) => {
    Swal.fire({
      title: ANALYTE_DELETE_CONFIRMATION_TITLE,
      text: ANALYTE_DELETE_CONFIRMATION_SUBTITLE,
      icon: SweetAlertIcon.WARNING,
      showCancelButton: true,
      confirmButtonColor: SWEET_ALERT_PARAMS.CONFIRM_BUTTON_COLOR,
      cancelButtonColor: SWEET_ALERT_PARAMS.CANCEL_BUTTON_COLOR,
      confirmButtonText: ANALYTE_DELETE_CONFIRMATION_TEXT,
    }).then((result) => {
      if (result.isConfirmed) {
        const result = deleteAnalyte(analyteId);
        if (result !== null) {
          showSnackBarMessage(
            ANALYTE_SUCCESSFULLY_DELETED_TEXT,
            SnackBarSeverity.SUCCESS,
            getAnalytes,
          );
        }
      }
    });
  };

  return {handleDelete};
};
