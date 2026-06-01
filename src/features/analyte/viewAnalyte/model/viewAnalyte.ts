import {
  selectGetAnalyteById,
  selectSetSelectedAnalyte,
  useAnalyteStore,
} from "../../../../entities/analyte";
import {ANALYTE_DETAILS_TITLE_TEXT} from "../../../../utils/constants";
import {useSideSection} from "../../../sideSection";

export const useViewAnalyte = () => {
  const setSelectedAnalyte = useAnalyteStore(selectSetSelectedAnalyte);
  const getAnalyteById = useAnalyteStore(selectGetAnalyteById);

  const {onOpenSideSection} = useSideSection();

  const viewAnalyte = async (analyteId: string) => {
    const analyte = await getAnalyteById(analyteId);
    if (analyte) {
      setSelectedAnalyte(analyte);
      onOpenSideSection(ANALYTE_DETAILS_TITLE_TEXT, true);
    }
  };

  return {viewAnalyte};
};
