import {
  selectGetReportById,
  selectSetSelectedReport,
  useReportStore,
} from "../../../../entities/report";
import {REPORT_DETAILS_TITLE_TEXT} from "../../../../utils/constants";
import {
  selectSetIsSideSectionOpen,
  selectSetSideSectionTitle,
  useSideSectionStore,
} from "../../../sideSection";

export const useViewReport = () => {
  const getReportById = useReportStore(selectGetReportById);
  const setSelectedReport = useReportStore(selectSetSelectedReport);

  const setIsSideSectionOpen = useSideSectionStore(selectSetIsSideSectionOpen);
  const setSideSectionTitle = useSideSectionStore(selectSetSideSectionTitle);

  const handleViewReport = async (reportId: string) => {
    const report = await getReportById(reportId);
    if (report) {
      setSelectedReport(report);
      setSideSectionTitle(REPORT_DETAILS_TITLE_TEXT);
      setIsSideSectionOpen(true);
    }
  };

  return {handleViewReport};
};
