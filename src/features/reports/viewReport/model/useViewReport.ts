import {
  selectGetReportById,
  selectSetSelectedReport,
  useReportStore,
} from "../../../../entities/report";
import {REPORT_DETAILS_TITLE_TEXT} from "../../../../utils/constants";
import {useSideSection} from "../../../sideSection";

export const useViewReport = () => {
  const getReportById = useReportStore(selectGetReportById);
  const setSelectedReport = useReportStore(selectSetSelectedReport);

  const {onOpenSideSection} = useSideSection();

  const handleViewReport = async (reportId: string) => {
    const report = await getReportById(reportId);
    if (report) {
      setSelectedReport(report);
      onOpenSideSection(REPORT_DETAILS_TITLE_TEXT, true);
    }
  };

  return {handleViewReport};
};
