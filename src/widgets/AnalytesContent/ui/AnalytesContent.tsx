import {Box, Theme, useMediaQuery, useTheme} from "@mui/material";
import {Button, Spinner, Table, Typography} from "../../../shared/ui";
import {SideSection} from "../../../shared/ui/SideSection";
import {CommonContentStyles} from "../../../shared/commonStyles";
import {
  ANALYTE_CREATE_BUTTON_LABEL,
  ANALYTES_TABLE_HEADER_LABELS,
  ANALYTES_TITLE_CONFIG,
  CREATE_ANALYTE_TITLE_TEXT,
} from "../../../utils/constants";
import {
  SharedButtonColors,
  SharedButtonIcons,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../utils/enums";
import {
  selectSelectedAnaliye,
  selectSetSelectedAnalyte,
  useAnalyteStore,
} from "../../../entities/analyte";
import {useLoadAnalytesData} from "../../../features/analyte/loadAnalytes/model/useLoadAnalytesData";
import {AnalyteTableActionButtons} from "../../../features/analyte/analyteActions";
import {AnalyteDetail} from "../../AnalyteDetail";
import {useSideSection} from "../../../features/sideSection";

export const AnalytesContent = () => {
  const {
    rows,
    visibleRows,
    rowsPerPage,
    isLoading,
    filteredRowsCount,
    page,
    order,
    orderBy,
    searchValue,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSearch,
  } = useLoadAnalytesData();

  const theme = useTheme<Theme>();
  const isLessThanMediumScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const selectedAnalyte = useAnalyteStore(selectSelectedAnaliye);
  const setSelectedAnalyte = useAnalyteStore(selectSetSelectedAnalyte);

  const {isSideSectionOpen, onCloseSideSection, onOpenSideSection} =
    useSideSection();

  const openSideSection = () => {
    setSelectedAnalyte(null);
    onOpenSideSection(CREATE_ANALYTE_TITLE_TEXT, false);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <Box>
      <Box sx={CommonContentStyles.titleContentContainer}>
        <Typography {...ANALYTES_TITLE_CONFIG} />
        <Box sx={CommonContentStyles.titleContentActions}>
          <Button
            label={ANALYTE_CREATE_BUTTON_LABEL}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
            icon={SharedButtonIcons.CREATE}
            onClick={openSideSection}
          />
        </Box>
      </Box>
      <Table
        headerLabels={ANALYTES_TABLE_HEADER_LABELS}
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
          <AnalyteTableActionButtons analyteId={row.id ?? ""} />
        )}
      />
      <SideSection isOpen={isSideSectionOpen}>
        <AnalyteDetail
          handleCloseSideSection={onCloseSideSection}
          selectedAnalyte={selectedAnalyte}
          isLoading={isLoading}
          isLessThanMediumScreen={isLessThanMediumScreen}
        />
      </SideSection>
    </Box>
  );
};
