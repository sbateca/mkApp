import {useInterfaceTranslation} from "../../../shared/i18n/useInterfaceTranslation";
import AddOutlined from "@mui/icons-material/AddOutlined";
import {Box, Button, Typography as MuiTypography} from "@mui/material";

import {Spinner, Table, Typography} from "../../../shared/ui";
import {SideSection} from "../../../shared/ui/SideSection";
import {
  REPORTS_PAGE_NAME,
  REPORTS_TABLE_HEADER_LABELS,
  REPORT_CREATE_BUTTON_LABEL,
  CREATE_REPORT_TITLE_TEXT,
} from "../../../utils/constants";
import {ReportDetail} from "../../ReportsDetail";
import {ReportsContentStyles} from "./ReportsContentStyles";
import {useSamplesContentErrorNotifier} from "../model/useReportsContentErrorNotifier";
import {useLoadRepostsContentData} from "../model/useLoadReportsContentData";
import {ReportTableActionButtons} from "../../../features/reports/reportActions";
import {useReadOnlyMode} from "../../../features/readOnlyMode";
import {useSideSection} from "../../../features/sideSection";
import {
  selectReports,
  selectSetSelectedReport,
  useReportStore,
} from "../../../entities/report";

export const ReportsContent = (): React.ReactElement => {
  const {t} = useInterfaceTranslation();
  const {setIsReadOnlyMode} = useReadOnlyMode();

  const {
    rows,
    canCreate,
    isLoading,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSearch,
    orderBy,
    order,
    visibleRows,
    filteredRowsCount,
    searchValue,
  } = useLoadRepostsContentData();
  const {error} = useSamplesContentErrorNotifier();

  const {isSideSectionOpen, onOpenSideSection} = useSideSection();
  const reports = useReportStore(selectReports);
  const setSelectedReport = useReportStore(selectSetSelectedReport);

  const openSideSection = () => {
    if (!canCreate) return;
    setSelectedReport(null);
    setIsReadOnlyMode(false);
    onOpenSideSection(CREATE_REPORT_TITLE_TEXT, false);
  };

  if (error) return <Typography text={error} variant="h6" />;

  return isLoading ? (
    <Spinner />
  ) : (
    <Box>
      <Box sx={ReportsContentStyles.titleContentContainer}>
        <Box>
          <MuiTypography component="h1">{t(REPORTS_PAGE_NAME)}</MuiTypography>
          <MuiTypography color="text.secondary" variant="body2" sx={{mt: 0.5}}>
            {t("View and manage laboratory reports.")}
          </MuiTypography>
        </Box>
        <Box sx={ReportsContentStyles.titleContentActions}>
          <Button
            disabled={!canCreate}
            variant="contained"
            startIcon={<AddOutlined />}
            onClick={openSideSection}
            sx={{minHeight: 42, px: 2}}
          >
            {t(REPORT_CREATE_BUTTON_LABEL)}
          </Button>
        </Box>
      </Box>
      <Table
        headerLabels={REPORTS_TABLE_HEADER_LABELS}
        rows={rows}
        visibleRows={visibleRows}
        rowsPerPage={rowsPerPage}
        filteredRowsCount={filteredRowsCount}
        page={page}
        order={order}
        orderBy={orderBy}
        searchValue={searchValue}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleRequestSort={handleRequestSort}
        handleSearch={handleSearch}
        renderActions={(row) => (
          <ReportTableActionButtons
            reportId={row.id ?? ""}
            actions={reports?.find((report) => report.id === row.id)?.actions}
          />
        )}
      />
      <SideSection isOpen={isSideSectionOpen}>
        <ReportDetail canCreate={canCreate} />
      </SideSection>
    </Box>
  );
};
