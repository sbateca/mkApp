import {Box, Divider, SxProps} from "@mui/material";
import {Spinner} from "../../../shared/ui";
import {getBoxContainerProps} from "../../../shared/commonStyles";
import {Analyte} from "../../../entities/analyte";
import {AnalyteForm} from "../../../features/analyte/createAnalyte";
import {AnalyteDetailHeader} from "./AnalyteDetailHeader";

type AnalyteDetailProps = {
  handleCloseSideSection: () => void;
  isLessThanMediumScreen: boolean;
  isLoading: boolean;
  selectedAnalyte: Analyte | null;
};

export const AnalyteDetail = ({
  handleCloseSideSection,
  isLessThanMediumScreen,
  isLoading,
  selectedAnalyte,
}: AnalyteDetailProps) => {
  return (
    <Box sx={getBoxContainerProps(isLessThanMediumScreen) as SxProps}>
      <AnalyteDetailHeader
        handleCloseSideSection={handleCloseSideSection}
        selectedAnalyte={selectedAnalyte}
        isLoading={isLoading}
      />
      <Divider />
      {isLoading ? (
        <Spinner />
      ) : (
        <AnalyteForm isLessThanMediumScreen={isLessThanMediumScreen} />
      )}
    </Box>
  );
};
