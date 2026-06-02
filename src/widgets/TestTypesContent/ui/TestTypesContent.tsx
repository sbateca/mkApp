import {Box, Theme, useMediaQuery, useTheme} from "@mui/material";
import {Button, Spinner, Table, Typography} from "../../../shared/ui";
import {SideSection} from "../../../shared/ui/SideSection";
import {CommonContentStyles} from "../../../shared/commonStyles";
import {
  CREATE_TEST_TYPE_TITLE_TEXT,
  TEST_TYPES_TABLE_HEADER_LABELS,
  TEST_TYPES_TITLE_CONFIG,
  TEST_TYPE_CREATE_BUTTON_LABEL,
} from "../../../utils/constants";
import {
  SharedButtonColors,
  SharedButtonIcons,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../utils/enums";
import {
  selectSelectedTestType,
  selectSetSelectedTestType,
  useTestTypeStore,
} from "../../../entities/testType";
import {useLoadTestTypesData} from "../../../features/testType/loadTestTypes/model/useLoadTestTypesData";
import {TestTypeTableActionButtons} from "../../../features/testType/testTypeActions";
import {TestTypeDetail} from "../../TestTypeDetail";
import {useSideSection} from "../../../features/sideSection";

export const TestTypesContent = () => {
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
  } = useLoadTestTypesData();

  const theme = useTheme<Theme>();
  const isLessThanMediumScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const selectedTestType = useTestTypeStore(selectSelectedTestType);
  const setSelectedTestType = useTestTypeStore(selectSetSelectedTestType);

  const {isSideSectionOpen, onCloseSideSection, onOpenSideSection} =
    useSideSection();

  const openSideSection = () => {
    setSelectedTestType(null);
    onOpenSideSection(CREATE_TEST_TYPE_TITLE_TEXT, false);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <Box>
      <Box sx={CommonContentStyles.titleContentContainer}>
        <Typography {...TEST_TYPES_TITLE_CONFIG} />
        <Box sx={CommonContentStyles.titleContentActions}>
          <Button
            label={TEST_TYPE_CREATE_BUTTON_LABEL}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
            icon={SharedButtonIcons.CREATE}
            onClick={openSideSection}
          />
        </Box>
      </Box>
      <Table
        headerLabels={TEST_TYPES_TABLE_HEADER_LABELS}
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
          <TestTypeTableActionButtons testTypeId={row.id ?? ""} />
        )}
      />
      <SideSection isOpen={isSideSectionOpen}>
        <TestTypeDetail
          handleCloseSideSection={onCloseSideSection}
          selectedTestType={selectedTestType}
          isLoading={isLoading}
          isLessThanMediumScreen={isLessThanMediumScreen}
        />
      </SideSection>
    </Box>
  );
};
