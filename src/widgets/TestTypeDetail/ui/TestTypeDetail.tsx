import {Box, Divider, SxProps} from "@mui/material";
import {Spinner} from "../../../shared/ui";
import {getBoxContainerProps} from "../../../shared/commonStyles";
import {TestType} from "../../../entities/testType";
import {TestTypeForm} from "../../../features/testType/createTestType";
import {TestTypeDetailHeader} from "./TestTypeDetailHeader";

type TestTypeDetailProps = {
  handleCloseSideSection: () => void;
  isLessThanMediumScreen: boolean;
  isLoading: boolean;
  selectedTestType: TestType | null;
};

export const TestTypeDetail = ({
  handleCloseSideSection,
  isLessThanMediumScreen,
  isLoading,
  selectedTestType,
}: TestTypeDetailProps) => {
  return (
    <Box sx={getBoxContainerProps(isLessThanMediumScreen) as SxProps}>
      <TestTypeDetailHeader
        handleCloseSideSection={handleCloseSideSection}
        selectedTestType={selectedTestType}
        isLoading={isLoading}
      />
      <Divider />
      {isLoading ? (
        <Spinner />
      ) : (
        <TestTypeForm isLessThanMediumScreen={isLessThanMediumScreen} />
      )}
    </Box>
  );
};
