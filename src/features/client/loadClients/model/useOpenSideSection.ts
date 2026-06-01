import {
  selectSetSelectedClient,
  useClientStore,
} from "../../../../entities/client";
import {CREATE_CLIENT_TITLE_TEXT} from "../../../../utils/constants";
import {
  selectIsSideSectionOpen,
  selectSetIsSideSectionOpen,
  selectSetSideSectionTitle,
  useSideSectionStore,
} from "../../../sideSection";

export const useOpenSideSection = () => {
  const setSelectedClient = useClientStore(selectSetSelectedClient);

  const isSideSectionOpen = useSideSectionStore(selectIsSideSectionOpen);
  const setSideSectionTitle = useSideSectionStore(selectSetSideSectionTitle);
  const setIsSideSectionOpen = useSideSectionStore(selectSetIsSideSectionOpen);

  const handleOpenSideSection = () => {
    setSelectedClient(null);
    setSideSectionTitle(CREATE_CLIENT_TITLE_TEXT);
    setIsSideSectionOpen(true);
  };

  const handleCloseSideSection = () => {
    setSelectedClient(null);
    setSideSectionTitle("");
    setIsSideSectionOpen(false);
  };

  return {handleOpenSideSection, handleCloseSideSection, isSideSectionOpen};
};
