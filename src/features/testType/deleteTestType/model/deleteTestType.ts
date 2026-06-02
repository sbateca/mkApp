import Swal from "sweetalert2";
import {
  selectDeleteTestType,
  selectGetTestTypes,
  useTestTypeStore,
} from "../../../../entities/testType";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";
import {
  SWEET_ALERT_PARAMS,
  TEST_TYPE_DELETE_CONFIRMATION_SUBTITLE,
  TEST_TYPE_DELETE_CONFIRMATION_TEXT,
  TEST_TYPE_DELETE_CONFIRMATION_TITLE,
  TEST_TYPE_SUCCESSFULLY_DELETED_TEXT,
} from "../../../../utils/constants";
import {SnackBarSeverity, SweetAlertIcon} from "../../../../utils/enums";

export const useDeleteTestType = () => {
  const getTestTypes = useTestTypeStore(selectGetTestTypes);
  const deleteTestType = useTestTypeStore(selectDeleteTestType);
  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  const handleDelete = async (testTypeId: string) => {
    Swal.fire({
      title: TEST_TYPE_DELETE_CONFIRMATION_TITLE,
      text: TEST_TYPE_DELETE_CONFIRMATION_SUBTITLE,
      icon: SweetAlertIcon.WARNING,
      showCancelButton: true,
      confirmButtonColor: SWEET_ALERT_PARAMS.CONFIRM_BUTTON_COLOR,
      cancelButtonColor: SWEET_ALERT_PARAMS.CANCEL_BUTTON_COLOR,
      confirmButtonText: TEST_TYPE_DELETE_CONFIRMATION_TEXT,
    }).then((result) => {
      if (result.isConfirmed) {
        const result = deleteTestType(testTypeId);
        if (result !== null) {
          showSnackBarMessage(
            TEST_TYPE_SUCCESSFULLY_DELETED_TEXT,
            SnackBarSeverity.SUCCESS,
            getTestTypes,
          );
        }
      }
    });
  };

  return {handleDelete};
};
