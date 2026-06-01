import {
  selectGetClientById,
  selectSetSelectedClient,
  useClientStore,
} from "../../../../entities/client";
import {CLIENT_DETAILS_TITLE_TEXT} from "../../../../utils/constants";
import {
  selectSetIsSideSectionOpen,
  selectSetSideSectionTitle,
  useSideSectionStore,
} from "../../../sideSection";
import {useReadOnlyMode} from "../../../readOnlyMode";

export const useViewClient = () => {
  const setSelectedClient = useClientStore(selectSetSelectedClient);
  const getClientById = useClientStore(selectGetClientById);

  const setIsSideSectionOpen = useSideSectionStore(selectSetIsSideSectionOpen);
  const setSideSectionTitle = useSideSectionStore(selectSetSideSectionTitle);
  const {setIsReadOnlyMode} = useReadOnlyMode();

  const viewClient = async (clientId: string) => {
    const client = await getClientById(clientId);
    if (client) {
      setSelectedClient(client);
      setSideSectionTitle(CLIENT_DETAILS_TITLE_TEXT);
      setIsReadOnlyMode(true);
      setIsSideSectionOpen(true);
    }
  };

  return {viewClient};
};
