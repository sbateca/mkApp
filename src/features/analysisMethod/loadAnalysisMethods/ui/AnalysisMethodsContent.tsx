import {Box, Theme, useMediaQuery, useTheme} from "@mui/material";
import {Button, Spinner, Table, Typography} from "../../../../shared/ui";
import {SideSection} from "../../../../shared/ui/SideSection";
import {CommonContentStyles} from "../../../../shared/commonStyles";
import {
  ANALYSIS_METHOD_CREATE_BUTTON_LABEL,
  ANALYSIS_METHODS_TABLE_HEADER_LABELS,
  ANALYSIS_METHODS_TITLE_CONFIG,
  CREATE_ANALYSIS_METHOD_TITLE_TEXT,
} from "../../../../utils/constants";
import {
  SharedButtonColors,
  SharedButtonIcons,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../../utils/enums";
import {
  selectSelectedAnalysisMethod,
  selectSetSelectedAnalysisMethod,
  useAnalysisMethodsStore,
} from "../../../../entities/analysisMethod";
import {useLoadAnalysisMethodsData} from "../model/useLoadAnalysisMethodsData";
import {AnalysisMethodTableActionButtons} from "../../analysisMethodActions";
import {AnalysisMethodDetail} from "../../../../widgets/AnalysisMethodDetail";
import {useSideSection} from "../../../sideSection";

export const AnalysisMethodsContent = () => {
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
  } = useLoadAnalysisMethodsData();

  const theme = useTheme<Theme>();
  const isLessThanMediumScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const selectedAnalysisMethod = useAnalysisMethodsStore(
    selectSelectedAnalysisMethod,
  );
  const setSelectedAnalysisMethod = useAnalysisMethodsStore(
    selectSetSelectedAnalysisMethod,
  );

  const {isSideSectionOpen, onCloseSideSection, onOpenSideSection} =
    useSideSection();

  const openSideSection = () => {
    setSelectedAnalysisMethod(null);
    onOpenSideSection(CREATE_ANALYSIS_METHOD_TITLE_TEXT, false);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <Box>
      <Box sx={CommonContentStyles.titleContentContainer}>
        <Typography {...ANALYSIS_METHODS_TITLE_CONFIG} />
        <Box sx={CommonContentStyles.titleContentActions}>
          <Button
            label={ANALYSIS_METHOD_CREATE_BUTTON_LABEL}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
            icon={SharedButtonIcons.CREATE}
            onClick={openSideSection}
          />
        </Box>
      </Box>
      <Table
        headerLabels={ANALYSIS_METHODS_TABLE_HEADER_LABELS}
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
          <AnalysisMethodTableActionButtons analysisMethodId={row.id ?? ""} />
        )}
      />
      <SideSection isOpen={isSideSectionOpen}>
        <AnalysisMethodDetail
          handleCloseSideSection={onCloseSideSection}
          selectedAnalysisMethod={selectedAnalysisMethod}
          isLoading={isLoading}
          isLessThanMediumScreen={isLessThanMediumScreen}
        />
      </SideSection>
    </Box>
  );
};
