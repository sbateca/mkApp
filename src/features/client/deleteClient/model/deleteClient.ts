import Swal from "sweetalert2";
import {
  selectDeleteClient,
  selectGetClients,
  useClientStore,
} from "../../../../entities/client";
import {selectShowSnackBarMessage, useSnackBarStore} from "../../../snackbar";
import {
  CLIENT_DELETE_CONFIRMATION_SUBTITLE,
  CLIENT_DELETE_CONFIRMATION_TEXT,
  CLIENT_DELETE_CONFIRMATION_TITLE,
  CLIENT_SUCCESSFULLY_DELETED_TEXT,
  SWEET_ALERT_PARAMS,
} from "../../../../utils/constants";
import {SnackBarSeverity, SweetAlertIcon} from "../../../../utils/enums";

export const useDeleteClient = () => {
  const getClients = useClientStore(selectGetClients);
  const deleteClient = useClientStore(selectDeleteClient);
  const showSnackBarMessage = useSnackBarStore(selectShowSnackBarMessage);

  const handleDelete = async (clientId: string) => {
    Swal.fire({
      title: CLIENT_DELETE_CONFIRMATION_TITLE,
      text: CLIENT_DELETE_CONFIRMATION_SUBTITLE,
      icon: SweetAlertIcon.WARNING,
      showCancelButton: true,
      confirmButtonColor: SWEET_ALERT_PARAMS.CONFIRM_BUTTON_COLOR,
      cancelButtonColor: SWEET_ALERT_PARAMS.CANCEL_BUTTON_COLOR,
      confirmButtonText: CLIENT_DELETE_CONFIRMATION_TEXT,
    }).then((result) => {
      if (result.isConfirmed) {
        const result = deleteClient(clientId);
        if (result !== null) {
          showSnackBarMessage(
            CLIENT_SUCCESSFULLY_DELETED_TEXT,
            SnackBarSeverity.SUCCESS,
            getClients,
          );
        }
      }
    });
  };

  return {handleDelete};
};
