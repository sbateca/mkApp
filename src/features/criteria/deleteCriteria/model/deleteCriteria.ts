import Swal from "sweetalert2";
import {
  selectDeleteCriteria,
  selectGetCriterias,
  useCriteriaStore,
} from "../../../../entities/criteria";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";
import {
  CRITERIA_DELETE_CONFIRMATION_SUBTITLE,
  CRITERIA_DELETE_CONFIRMATION_TEXT,
  CRITERIA_DELETE_CONFIRMATION_TITLE,
  CRITERIA_SUCCESSFULLY_DELETED_TEXT,
  SWEET_ALERT_PARAMS,
} from "../../../../utils/constants";
import {SnackBarSeverity, SweetAlertIcon} from "../../../../utils/enums";

export const useDeleteCriteria = () => {
  const getCriterias = useCriteriaStore(selectGetCriterias);
  const deleteCriteria = useCriteriaStore(selectDeleteCriteria);
  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  const handleDelete = async (criteriaId: string) => {
    Swal.fire({
      title: CRITERIA_DELETE_CONFIRMATION_TITLE,
      text: CRITERIA_DELETE_CONFIRMATION_SUBTITLE,
      icon: SweetAlertIcon.WARNING,
      showCancelButton: true,
      confirmButtonColor: SWEET_ALERT_PARAMS.CONFIRM_BUTTON_COLOR,
      cancelButtonColor: SWEET_ALERT_PARAMS.CANCEL_BUTTON_COLOR,
      confirmButtonText: CRITERIA_DELETE_CONFIRMATION_TEXT,
    }).then((result) => {
      if (result.isConfirmed) {
        const result = deleteCriteria(criteriaId);
        if (result !== null) {
          showSnackBarMessage(
            CRITERIA_SUCCESSFULLY_DELETED_TEXT,
            SnackBarSeverity.SUCCESS,
            getCriterias,
          );
        }
      }
    });
  };

  return {handleDelete};
};
