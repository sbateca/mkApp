import {
  selectCreateClient,
  selectGetClients,
  useClientStore,
} from "../../../../entities/client";
import {
  CLIENT_SUCCESSFULLY_CREATED_TEXT,
  FormProps,
} from "../../../../utils/constants";
import {SnackBarSeverity} from "../../../../utils/enums";
import {useSideSection} from "../../../sideSection";
import {useSnackBarStore} from "../../../snackbar";
import {formToClientRequest} from "../../lib/clientMappers";

export const useCreateClient = (form: FormProps) => {
  const createClient = useClientStore(selectCreateClient);
  const getClients = useClientStore(selectGetClients);

  const {onCloseSideSection} = useSideSection();
  const {showSnackBarMessage} = useSnackBarStore();

  const handleCreateClient = async () => {
    const newClient = await createClient(formToClientRequest(form));
    if (newClient !== null) {
      onCloseSideSection();
      showSnackBarMessage(
        CLIENT_SUCCESSFULLY_CREATED_TEXT,
        SnackBarSeverity.SUCCESS,
        getClients,
      );
    }
    return newClient;
  };

  return {handleCreateClient};
};
