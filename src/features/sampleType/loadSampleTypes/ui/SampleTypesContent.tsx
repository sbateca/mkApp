import {Box, Theme, useMediaQuery, useTheme} from "@mui/material";
import {Button, Spinner, Table, Typography} from "../../../../shared/ui";
import {useLoadSampleTypesData} from "../model/useLoadSampleTypesData";
import {SideSection} from "../../../../shared/ui/SideSection";
import {CommonContentStyles} from "../../../../shared/commonStyles";
import {
  CREATE_SAMPLE_TYPE_TITLE_TEXT,
  SAMPLE_TYPE_CREATE_BUTTON_LABEL,
  SAMPLE_TYPES_TABLE_HEADER_LABELS,
  SAMPLE_TYPES_TITLE_CONFIG,
} from "../../../../utils/constants";
import {
  SharedButtonColors,
  SharedButtonIcons,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../../utils/enums";
import {SampleTypeTableActionButtons} from "../../sampleTypeActions";
import {SampleTypeDetail} from "../../../../widgets/SampleTypeDetail";
import {
  selectSelectedSampleType,
  useSampleTypeStore,
} from "../../../../entities/sampleType";
import {useSideSection} from "../../../sideSection";

export const SampleTypesContent = () => {
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
  } = useLoadSampleTypesData();

  const theme = useTheme<Theme>();
  const isLessThanMediumScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const selectedSampleType = useSampleTypeStore(selectSelectedSampleType);

  const {isSideSectionOpen, onOpenSideSection, onCloseSideSection} =
    useSideSection();

  const openSideSection = () => {
    onOpenSideSection(CREATE_SAMPLE_TYPE_TITLE_TEXT, false);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <Box>
      <Box sx={CommonContentStyles.titleContentContainer}>
        <Typography {...SAMPLE_TYPES_TITLE_CONFIG} />
        <Box sx={CommonContentStyles.titleContentActions}>
          <Button
            label={SAMPLE_TYPE_CREATE_BUTTON_LABEL}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
            icon={SharedButtonIcons.CREATE}
            onClick={openSideSection}
          />
        </Box>
      </Box>
      <Table
        headerLabels={SAMPLE_TYPES_TABLE_HEADER_LABELS}
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
          <SampleTypeTableActionButtons sampleTypeId={row.id ?? ""} />
        )}
      />
      <SideSection isOpen={isSideSectionOpen}>
        <SampleTypeDetail
          handleCloseSideSection={onCloseSideSection}
          selectedSampleType={selectedSampleType}
          isLoading={isLoading}
          isLessThanMediumScreen={isLessThanMediumScreen}
        />
      </SideSection>
    </Box>
  );
};
