import {
  selectEditClient,
  selectGetClients,
  useClientStore,
} from "../../../../entities/client";
import {
  CLIENT_SUCCESSFULLY_UPDATED_TEXT,
  FormProps,
} from "../../../../utils/constants";
import {SnackBarSeverity} from "../../../../utils/enums";
import {useSideSection} from "../../../sideSection";
import {useSnackBarStore} from "../../../snackbar";
import {formToClient} from "../../lib/clientMappers";

export const useEditClient = (form: FormProps, clientId: string) => {
  const editClient = useClientStore(selectEditClient);
  const getClients = useClientStore(selectGetClients);

  const {onCloseSideSection} = useSideSection();
  const {showSnackBarMessage} = useSnackBarStore();

  const handleEditClient = async () => {
    const client = formToClient(form, clientId);
    const updatedClient = await editClient(client, clientId);
    if (updatedClient !== null) {
      onCloseSideSection();
      showSnackBarMessage(
        CLIENT_SUCCESSFULLY_UPDATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getClients,
      );
    }
    return updatedClient;
  };

  return {handleEditClient};
};
