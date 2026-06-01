import {Box, Divider, SxProps} from "@mui/material";
import {Spinner} from "../../../shared/ui";
import {getBoxContainerProps} from "../../../shared/commonStyles";
import {Client} from "../../../entities/client";
import {ClientForm} from "../../../features/client/createClient";
import {ClientDetailHeader} from "./ClientDetailHeader";

type ClientDetailProps = {
  handleCloseSideSection: () => void;
  sideSectionTitle: string;
  isLessThanMediumScreen: boolean;
  isLoading: boolean;
  selectedClient: Client | null;
};

export const ClientDetail = ({
  handleCloseSideSection,
  sideSectionTitle,
  isLessThanMediumScreen,
  isLoading,
  selectedClient,
}: ClientDetailProps) => {
  return (
    <Box sx={getBoxContainerProps(isLessThanMediumScreen) as SxProps}>
      <ClientDetailHeader
        handleCloseSideSection={handleCloseSideSection}
        sideSectionTitle={sideSectionTitle}
        selectedClient={selectedClient}
        isLoading={isLoading}
      />
      <Divider />
      {isLoading ? (
        <Spinner />
      ) : (
        <ClientForm isLessThanMediumScreen={isLessThanMediumScreen} />
      )}
    </Box>
  );
};
