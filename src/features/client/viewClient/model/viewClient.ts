import {
  selectGetClientById,
  selectSetSelectedClient,
  useClientStore,
} from "../../../../entities/client";
import {CLIENT_DETAILS_TITLE_TEXT} from "../../../../utils/constants";
import {useSideSection} from "../../../sideSection";

export const useViewClient = () => {
  const setSelectedClient = useClientStore(selectSetSelectedClient);
  const getClientById = useClientStore(selectGetClientById);

  const {onOpenSideSection} = useSideSection();

  const viewClient = async (clientId: string) => {
    const client = await getClientById(clientId);
    if (client) {
      setSelectedClient(client);
      onOpenSideSection(CLIENT_DETAILS_TITLE_TEXT, true);
    }
  };

  return {viewClient};
};
