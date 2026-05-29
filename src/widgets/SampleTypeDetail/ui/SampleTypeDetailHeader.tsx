import {Chip, Stack} from "@mui/material";
import {Button, Typography} from "../../../shared/ui";
import {
  SharedButtonColors,
  SharedButtonCommonLabels,
  SharedButtonSizes,
  SharedButtonVariants,
  SharedChipColors,
  SharedChipSizes,
  SharedTypographyAlign,
  SharedTypographyColors,
  SharedTypographyVariants,
} from "../../../utils/enums";
import {SampleType} from "../../../entities/sampleType";
import {CommonDetailStyles} from "../../../utils/constants";

export type HeaderProps = {
  isReadOnlyMode: boolean;
  handleCloseSideSection: () => void;
  sideSectionTitle: string;
  selectedSampleType: SampleType | null;
  isLoading: boolean;
  isLessThanMediumScreen: boolean;
};

export const SampleTypeDetailHeader = ({
  isReadOnlyMode,
  handleCloseSideSection,
  sideSectionTitle,
  selectedSampleType,
  isLoading,
}: HeaderProps): React.ReactElement => {
  const getEditModeChip = (): React.ReactNode => {
    if (selectedSampleType) {
      return (
        <Stack direction={"row"} spacing={1} sx={{marginLeft: "10px"}}>
          <Typography
            text={"Edit mode"}
            variant={SharedTypographyVariants.CAPTION}
            align={SharedTypographyAlign.LEFT}
            color={SharedTypographyColors.TEXT_SECONDARY}
            padding="0 0 5px 0"
            sx={{alignSelf: "center"}}
          />
          {isReadOnlyMode ? (
            <Chip
              label="OFF"
              size={SharedChipSizes.SMALL}
              color={SharedChipColors.DEFAULT}
            />
          ) : (
            <Chip
              label="ON"
              size={SharedChipSizes.SMALL}
              color={SharedChipColors.SUCCESS}
            />
          )}
        </Stack>
      );
    }
    return null;
  };

  return (
    <Stack direction="row">
      <Stack direction={"row"}>
        <Typography
          text={sideSectionTitle}
          variant={SharedTypographyVariants.H6}
          align={SharedTypographyAlign.LEFT}
          color={SharedTypographyColors.PRIMARY}
          padding="0 0 5px 0"
        />
        {getEditModeChip()}
      </Stack>
      <Button
        disabled={isLoading}
        label={SharedButtonCommonLabels.CLOSE}
        variant={SharedButtonVariants.OUTLINED}
        size={SharedButtonSizes.SMALL}
        color={SharedButtonColors.ERROR}
        icon="close"
        onClick={handleCloseSideSection}
        sx={CommonDetailStyles.closeButton}
      />
    </Stack>
  );
};
