import {Box} from "@mui/material";

import {Button, Spinner, Table, Typography} from "../../../shared/ui";
import {SideSection} from "../../../shared/ui/SideSection";
import {
  REPORTS_TITLE_CONFIG,
  REPORTS_TABLE_HEADER_LABELS,
  REPORT_CREATE_BUTTON_LABEL,
} from "../../../utils/constants";
import {
  SharedButtonColors,
  SharedButtonIcons,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../utils/enums";
import {ReportDetail} from "../../ReportsDetail";
import {ReportsContentStyles} from "./ReportsContentStyles";
import {useOpenSideSection} from "../model/useOpenSideSection";
import {useSamplesContentErrorNotifier} from "../model/useReportsContentErrorNotifier";
import {useLoadRepostsContentData} from "../model/useLoadReportsContentData";
import {ReportTableActionButtons} from "../../../features/reports/reportActions";
import {useReadOnlyMode} from "../../../features/readOnlyMode";

export const ReportsContent = (): React.ReactElement => {
  const {setIsReadOnlyMode} = useReadOnlyMode();

  const {
    rows,
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
  const {isSideSectionOpen, handleOpenSideSection} = useOpenSideSection();
  const {error} = useSamplesContentErrorNotifier();

  const openSideSection = () => {
    setIsReadOnlyMode(false);
    handleOpenSideSection();
  };

  if (error) return <Typography text={error} variant="h6" />;

  return isLoading ? (
    <Spinner />
  ) : (
    <Box>
      <Box sx={ReportsContentStyles.titleContentContainer}>
        <Typography {...REPORTS_TITLE_CONFIG} />
        <Box sx={ReportsContentStyles.titleContentActions}>
          <Button
            label={REPORT_CREATE_BUTTON_LABEL}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
            icon={SharedButtonIcons.CREATE}
            onClick={openSideSection}
          />
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
          <ReportTableActionButtons reportId={row.id ?? ""} />
        )}
      />
      <SideSection isOpen={isSideSectionOpen}>
        <ReportDetail />
      </SideSection>
    </Box>
  );
};
