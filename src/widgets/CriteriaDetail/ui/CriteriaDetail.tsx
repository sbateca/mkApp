import {Box, Divider, SxProps} from "@mui/material";
import {Spinner} from "../../../shared/ui";
import {getBoxContainerProps} from "../../../shared/commonStyles";
import {Criteria} from "../../../entities/criteria";
import {CriteriaForm} from "../../../features/criteria/createCriteria";
import {CriteriaDetailHeader} from "./CriteriaDetailHeader";

type CriteriaDetailProps = {
  handleCloseSideSection: () => void;
  isLessThanMediumScreen: boolean;
  isLoading: boolean;
  selectedCriteria: Criteria | null;
};

export const CriteriaDetail = ({
  handleCloseSideSection,
  isLessThanMediumScreen,
  isLoading,
  selectedCriteria,
}: CriteriaDetailProps) => {
  return (
    <Box sx={getBoxContainerProps(isLessThanMediumScreen) as SxProps}>
      <CriteriaDetailHeader
        handleCloseSideSection={handleCloseSideSection}
        selectedCriteria={selectedCriteria}
        isLoading={isLoading}
      />
      <Divider />
      {isLoading ? (
        <Spinner />
      ) : (
        <CriteriaForm isLessThanMediumScreen={isLessThanMediumScreen} />
      )}
    </Box>
  );
};
