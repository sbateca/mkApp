import {Box, Divider, SxProps} from "@mui/material";
import {Spinner} from "../../../shared/ui";
import {getBoxContainerProps} from "../../../shared/commonStyles";
import {AnalysisMethod} from "../../../entities/analysisMethod";
import {AnalysisMethodForm} from "../../../features/analysisMethod/createAnalysisMethod";
import {AnalysisMethodDetailHeader} from "./AnalysisMethodDetailHeader";

type AnalysisMethodDetailProps = {
  handleCloseSideSection: () => void;
  isLessThanMediumScreen: boolean;
  isLoading: boolean;
  selectedAnalysisMethod: AnalysisMethod | null;
};

export const AnalysisMethodDetail = ({
  handleCloseSideSection,
  isLessThanMediumScreen,
  isLoading,
  selectedAnalysisMethod,
}: AnalysisMethodDetailProps) => {
  return (
    <Box sx={getBoxContainerProps(isLessThanMediumScreen) as SxProps}>
      <AnalysisMethodDetailHeader
        handleCloseSideSection={handleCloseSideSection}
        selectedAnalysisMethod={selectedAnalysisMethod}
        isLoading={isLoading}
      />
      <Divider />
      {isLoading ? (
        <Spinner />
      ) : (
        <AnalysisMethodForm isLessThanMediumScreen={isLessThanMediumScreen} />
      )}
    </Box>
  );
};
