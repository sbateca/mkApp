import {
  selectSetSelectedReport,
  useReportStore,
} from "../../../entities/report";
import {
  selectIsSideSectionOpen,
  selectSetIsSideSectionOpen,
  selectSetSideSectionTitle,
  useSideSectionStore,
} from "../../../features/sideSection";
import {CREATE_REPORT_TITLE_TEXT} from "../../../utils/constants";

export const useOpenSideSection = () => {
  const isSideSectionOpen = useSideSectionStore(selectIsSideSectionOpen);
  const setIsSideSectionOpen = useSideSectionStore(selectSetIsSideSectionOpen);
  const setSideSectionTitle = useSideSectionStore(selectSetSideSectionTitle);

  const setSelectedReport = useReportStore(selectSetSelectedReport);

  const handleOpenSideSection = () => {
    setSelectedReport(null);
    setSideSectionTitle(CREATE_REPORT_TITLE_TEXT);
    setIsSideSectionOpen(true);
  };

  return {isSideSectionOpen, handleOpenSideSection};
};
