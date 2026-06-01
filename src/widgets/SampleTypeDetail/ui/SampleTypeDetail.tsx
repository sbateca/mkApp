import {Box, Divider, SxProps} from "@mui/material";
import {SampleTypeForm} from "../../../features/sampleType/createSampleType";
import {Spinner} from "../../../shared/ui";
import {SampleTypeDetailHeader} from "./SampleTypeDetailHeader";
import {getBoxContainerProps} from "../../../shared/commonStyles";
import {SampleType} from "../../../entities/sampleType";

type SampleTypeDetailProps = {
  handleCloseSideSection: () => void;
  isLessThanMediumScreen: boolean;
  isLoading: boolean;
  selectedSampleType: SampleType | null;
};

export const SampleTypeDetail = ({
  handleCloseSideSection,
  isLessThanMediumScreen,
  isLoading,
  selectedSampleType,
}: SampleTypeDetailProps) => {
  return (
    <Box sx={getBoxContainerProps(isLessThanMediumScreen) as SxProps}>
      <SampleTypeDetailHeader
        handleCloseSideSection={handleCloseSideSection}
        selectedSampleType={selectedSampleType}
        isLoading={isLoading}
        isLessThanMediumScreen={isLessThanMediumScreen}
      />
      <Divider />
      {isLoading ? (
        <Spinner />
      ) : (
        <SampleTypeForm isLessThanMediumScreen={isLessThanMediumScreen} />
      )}
    </Box>
  );
};
