import {Box, Theme, useMediaQuery, useTheme} from "@mui/material";
import {Button, Spinner, Table, Typography} from "../../../../shared/ui";
import {useLoadSampleTypesData} from "../model/useLoadSampleTypesData";
import {SideSection} from "../../../../shared/ui/SideSection";
import {useOpenSideSection} from "../model/useOpenSideSection";
import {CommonContentStyles} from "../../../../shared/commonStyles";
import {
  SAMPLE_TYPE_CREATE_BUTTON_LABEL,
  SAMPLE_TYPES_TABLE_HEADER_LABELS,
  SAMPLE_TYPES_TITLE_CONFIG,
  SAMPLES_TYPE_PAGE_DETAIL_TITLE,
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
import {useReadOnlyMode} from "../../../readOnlyMode";

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

  const {setIsReadOnlyMode} = useReadOnlyMode();
  const {isSideSectionOpen, handleOpenSideSection, handleCloseSideSection} =
    useOpenSideSection();

  const openSideSection = () => {
    setIsReadOnlyMode(false);
    handleOpenSideSection();
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
          handleCloseSideSection={handleCloseSideSection}
          sideSectionTitle={SAMPLES_TYPE_PAGE_DETAIL_TITLE}
          selectedSampleType={selectedSampleType}
          isLoading={isLoading}
          isLessThanMediumScreen={isLessThanMediumScreen}
        />
      </SideSection>
    </Box>
  );
};
