import {Box, Divider, SxProps} from "@mui/material";
import {SampleTypeForm} from "../../../features/sampleType/createSampleType";
import {Spinner} from "../../../shared/ui";
import {SampleTypeDetailHeader} from "./SampleTypeDetailHeader";
import {getBoxContainerProps} from "../../../shared/commonStyles";
import {SampleType} from "../../../entities/sampleType";

type SampleTypeDetailProps = {
  isReadOnlyMode: boolean;
  setIsReadOnlyMode: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseSideSection: () => void;
  sideSectionTitle: string;
  isLessThanMediumScreen: boolean;
  isLoading: boolean;
  selectedSampleType: SampleType | null;
};

export const SampleTypeDetail = ({
  isReadOnlyMode,
  setIsReadOnlyMode,
  handleCloseSideSection,
  sideSectionTitle,
  isLessThanMediumScreen,
  isLoading,
  selectedSampleType,
}: SampleTypeDetailProps) => {
  return (
    <Box sx={getBoxContainerProps(isLessThanMediumScreen) as SxProps}>
      <SampleTypeDetailHeader
        isReadOnlyMode={isReadOnlyMode}
        handleCloseSideSection={handleCloseSideSection}
        sideSectionTitle={sideSectionTitle}
        selectedSampleType={selectedSampleType}
        isLoading={isLoading}
        isLessThanMediumScreen={isLessThanMediumScreen}
      />
      <Divider />
      {isLoading ? (
        <Spinner />
      ) : (
        <SampleTypeForm
          isLessThanMediumScreen={isLessThanMediumScreen}
          isReadOnlyMode={isReadOnlyMode}
          setIsReadOnlyMode={setIsReadOnlyMode}
        />
      )}
    </Box>
  );
};
