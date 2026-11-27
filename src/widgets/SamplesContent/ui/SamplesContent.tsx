import {useWorkspacePermissions} from "../../../entities/auth/model/workspacePermissions";
import {Box} from "@mui/material";

import {Button, Spinner, Table, Typography} from "../../../shared/ui";
import {SideSection} from "../../../shared/ui/SideSection/SideSection";
import {
  SharedButtonColors,
  SharedButtonIcons,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../utils/enums";
import {
  CREATE_SAMPLE_TITLE_TEXT,
  SAMPLES_CREATE_BUTTON_LABEL,
  SAMPLES_TABLE_HEADER_LABELS,
  SAMPLES_TITLE_CONFIG,
} from "../../../utils/constants";
import {
  selectSetSelectedSample,
  useSampleStore,
} from "../../../entities/sample";
import {SampleDetail} from "../../SampleDetail";
import {SampleContentStyles} from "./SamplesContentStyles";
import {useLoadSamplesContentData} from "../model/useLoadSamplesContentData";
import {useSamplesContentErrorNotifier} from "../model/useSamplesContentErrorNotifier";
import {SampleTableActionButtons} from "../../../features/sample/TableActionButtons";
import {useSideSection} from "../../../features/sideSection";

export const SamplesContent = (): React.ReactElement => {
  const {canCreateSample: canCreate} = useWorkspacePermissions();
  const {
    rows,
    isLoading,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    orderBy,
    order,
    handleSearch,
    visibleRows,
    filteredRowsCount,
    searchValue,
  } = useLoadSamplesContentData();
  const {isSideSectionOpen, onOpenSideSection} = useSideSection();
  const setSelectedSample = useSampleStore(selectSetSelectedSample);
  useSamplesContentErrorNotifier();

  const openSideSection = () => {
    if (!canCreate) return;
    setSelectedSample(null);
    onOpenSideSection(CREATE_SAMPLE_TITLE_TEXT, false);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <Box>
      <Box sx={SampleContentStyles.titleContentContainer}>
        <Typography {...SAMPLES_TITLE_CONFIG} />
        <Box sx={SampleContentStyles.titleContentActions}>
          {canCreate && (
            <Button
              label={SAMPLES_CREATE_BUTTON_LABEL}
              variant={SharedButtonVariants.OUTLINED}
              size={SharedButtonSizes.SMALL}
              color={SharedButtonColors.PRIMARY}
              icon={SharedButtonIcons.CREATE}
              onClick={openSideSection}
            />
          )}
        </Box>
      </Box>
      <Table
        headerLabels={SAMPLES_TABLE_HEADER_LABELS}
        rows={rows}
        rowsPerPage={rowsPerPage}
        page={page}
        order={order}
        searchValue={searchValue}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleRequestSort={handleRequestSort}
        orderBy={orderBy}
        handleSearch={handleSearch}
        visibleRows={visibleRows}
        filteredRowsCount={filteredRowsCount}
        renderActions={(row) => (
          <SampleTableActionButtons sampleId={row.id ?? ""} />
        )}
      />
      <SideSection isOpen={isSideSectionOpen}>
        <SampleDetail />
      </SideSection>
    </Box>
  );
};
