import {Box, Theme, useMediaQuery, useTheme} from "@mui/material";
import {Button, Spinner, Table, Typography} from "../../../../shared/ui";
import {SideSection} from "../../../../shared/ui/SideSection";
import {CommonContentStyles} from "../../../../shared/commonStyles";
import {
  CLIENT_CREATE_BUTTON_LABEL,
  CLIENTS_TABLE_HEADER_LABELS,
  CLIENTS_TITLE_CONFIG,
  CREATE_CLIENT_TITLE_TEXT,
} from "../../../../utils/constants";
import {
  SharedButtonColors,
  SharedButtonIcons,
  SharedButtonSizes,
  SharedButtonVariants,
} from "../../../../utils/enums";
import {
  selectSelectedClient,
  selectSetSelectedClient,
  useClientStore,
} from "../../../../entities/client";
import {useLoadClientsData} from "../model/useLoadClientsData";
import {ClientTableActionButtons} from "../../clientActions";
import {ClientDetail} from "../../../../widgets/ClientDetail";
import {useSideSection} from "../../../sideSection";

export const ClientsContent = () => {
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
  } = useLoadClientsData();

  const theme = useTheme<Theme>();
  const isLessThanMediumScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const selectedClient = useClientStore(selectSelectedClient);
  const setSelectedClient = useClientStore(selectSetSelectedClient);

  const {isSideSectionOpen, onCloseSideSection, onOpenSideSection} =
    useSideSection();

  const openSideSection = () => {
    setSelectedClient(null);
    onOpenSideSection(CREATE_CLIENT_TITLE_TEXT, false);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <Box>
      <Box sx={CommonContentStyles.titleContentContainer}>
        <Typography {...CLIENTS_TITLE_CONFIG} />
        <Box sx={CommonContentStyles.titleContentActions}>
          <Button
            label={CLIENT_CREATE_BUTTON_LABEL}
            variant={SharedButtonVariants.OUTLINED}
            size={SharedButtonSizes.SMALL}
            color={SharedButtonColors.PRIMARY}
            icon={SharedButtonIcons.CREATE}
            onClick={openSideSection}
          />
        </Box>
      </Box>
      <Table
        headerLabels={CLIENTS_TABLE_HEADER_LABELS}
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
          <ClientTableActionButtons clientId={row.id ?? ""} />
        )}
      />
      <SideSection isOpen={isSideSectionOpen}>
        <ClientDetail
          handleCloseSideSection={onCloseSideSection}
          selectedClient={selectedClient}
          isLoading={isLoading}
          isLessThanMediumScreen={isLessThanMediumScreen}
        />
      </SideSection>
    </Box>
  );
};
