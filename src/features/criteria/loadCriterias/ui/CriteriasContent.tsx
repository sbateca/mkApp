import {Box, Theme, useMediaQuery, useTheme} from "@mui/material";
import {Button, Spinner, Table, Typography} from "../../../../shared/ui";
import {SideSection} from "../../../../shared/ui/SideSection";
import {CommonContentStyles} from "../../../../shared/commonStyles";
import {
  CREATE_CRITERIA_TITLE_TEXT,
  CRITERIA_CREATE_BUTTON_LABEL,
  CRITERIA_TABLE_HEADER_LABELS,
  CRITERIA_TITLE_CONFIG,
} from "../../../../utils/constants";
import {
  SharedButtonColors,
  SharedButtonIcons,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../../utils/enums";
import {
  selectSelectedCriteria,
  selectSetSelectedCriteria,
  useCriteriaStore,
} from "../../../../entities/criteria";
import {useLoadCriteriasData} from "../model/useLoadCriteriasData";
import {CriteriaTableActionButtons} from "../../criteriaActions";
import {CriteriaDetail} from "../../../../widgets/CriteriaDetail";
import {useSideSection} from "../../../sideSection";

export const CriteriasContent = () => {
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
  } = useLoadCriteriasData();

  const theme = useTheme<Theme>();
  const isLessThanMediumScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const selectedCriteria = useCriteriaStore(selectSelectedCriteria);
  const setSelectedCriteria = useCriteriaStore(selectSetSelectedCriteria);

  const {isSideSectionOpen, onCloseSideSection, onOpenSideSection} =
    useSideSection();

  const openSideSection = () => {
    setSelectedCriteria(null);
    onOpenSideSection(CREATE_CRITERIA_TITLE_TEXT, false);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <Box>
      <Box sx={CommonContentStyles.titleContentContainer}>
        <Typography {...CRITERIA_TITLE_CONFIG} />
        <Box sx={CommonContentStyles.titleContentActions}>
          <Button
            label={CRITERIA_CREATE_BUTTON_LABEL}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
            icon={SharedButtonIcons.CREATE}
            onClick={openSideSection}
          />
        </Box>
      </Box>
      <Table
        headerLabels={CRITERIA_TABLE_HEADER_LABELS}
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
          <CriteriaTableActionButtons criteriaId={row.id ?? ""} />
        )}
      />
      <SideSection isOpen={isSideSectionOpen}>
        <CriteriaDetail
          handleCloseSideSection={onCloseSideSection}
          selectedCriteria={selectedCriteria}
          isLoading={isLoading}
          isLessThanMediumScreen={isLessThanMediumScreen}
        />
      </SideSection>
    </Box>
  );
};
